from fastapi import FastAPI, WebSocket, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import serial
import json
import threading
from fastapi.middleware.cors import CORSMiddleware
from database import db_habdler

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
global_db_handler = db_habdler()

# Global variables for temperature and RFID
rfid_global = "33 af 1b 12"  # Set your expected RFID here
temperature_value = None

# Initialize serial connection to Arduino
arduino = serial.Serial('COM3', 9600, timeout=1)  # Replace 'COM3' with your Arduino port

# List to hold active WebSocket connections
websockets: List[WebSocket] = []

# Function to broadcast data to all WebSocket clients
async def broadcast_temperature():
    global temperature_value
    for websocket in websockets:
        await websocket.send_text(json.dumps({"type": "temperature", "value": temperature_value}))

# Function to handle serial data reading from Arduino
import asyncio
loop = asyncio.get_event_loop()
def read_from_arduino():
    global temperature_value
    while True:
        if arduino.in_waiting > 0:
            # Read the JSON data from Arduino
            message = arduino.readline().decode().strip()
            print(f"Message received from Arduino: {message}")
            try:
                data = json.loads(message)
                # Check if it's temperature or RFID
                if "temperature" in data:
                    temperature_value = data["temperature"]
                    # Send temperature value to WebSocket clients
                    if websockets:
                        asyncio.run_coroutine_threadsafe(broadcast_temperature(), loop)

                elif "rfidEntrada" in data:
                    print(f"RFID received: {data['rfidEntrada']}")
                    rfid_value = data["rfidEntrada"]
                    text_rfid = str(rfid_value)
                    #delete all spaces from the string
                    text_rfid = text_rfid.replace(" ","")
                    print(f"RFID received: {text_rfid}")
                    flag = global_db_handler.entrance(text_rfid)
                    # Check if RFID matches the global variable
                    response = "entradaRFIDtrue" if flag else "entradaRFIDfalse"
                    # Send response to Arduino
                    arduino.write(response.encode())
                elif "rfidSalida" in data:
                    print(f"RFID received: {data['rfidSalida']}")
                    rfid_value = data["rfidSalida"]
                    text_rfid = str(rfid_value)
                    #delete all spaces from the string
                    text_rfid = text_rfid.replace(" ","")
                    print(f"RFID received: {text_rfid}")
                    flag = global_db_handler.exit(text_rfid)
                    # Check if RFID matches the global variable
                    response = "salidaRFIDtrue" if flag else "salidaRFIDfalse"
                    # Send response to Arduino
                    arduino.write(response.encode())
                elif "rfidBoton" in data:
                    print(f"RFID received: {data['rfidBoton']}")
                    rfid_value = data["rfidBoton"]
                    text_rfid = str(rfid_value)
                    #delete all spaces from the string
                    text_rfid = text_rfid.replace(" ","")
                    print(f"RFID received: {text_rfid}")
                    global_db_handler.entra_invitado()
                    flag = True
                    # Check if RFID matches the global variable
                    response = "salidarfidBotontrue" if flag else "salidarfidBotonfalse"
                    # Send response to Arduino
                    arduino.write(response.encode())
                elif "rfidCoin" in data:
                    
                    global_db_handler.sale_invitado()
                    flag = True
                    # Check if RFID matches the global variable
                    response = "salidaRFIDcointrue" if flag else "salidaRFIDcoinfalse"
                    # Send response to Arduino
                    arduino.write(response.encode())

            except json.JSONDecodeError:
                print("Invalid JSON received from Arduino")

# Start the serial communication thread
threading.Thread(target=read_from_arduino, daemon=True).start()

# WebSocket endpoint to handle connections
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websockets.append(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keep the connection alive
    except:
        websockets.remove(websocket)


# Pydantic models for request validation
class UserInput(BaseModel):
    uid: str
    nombre: str
    apellido: str
    id: str
    model: str


class LoginInput(BaseModel):
    name: str
    password: str


# Example GET endpoint to get users from the database
@app.get("/get_users")
def get_users():
    users = global_db_handler.get_all_users()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users


# POST endpoint for user login
@app.post("/login")
def login(input: LoginInput):
    success = global_db_handler.login(input.name, input.password)
    if not success:
        raise HTTPException(status_code=401, detail="Login failed")
    return {"message": "Login successful"}


# POST endpoint to add a new user
@app.post("/add_user")
def add_user(input: UserInput):
    success = global_db_handler.add_new_user(input.dict())
    if not success:
        raise HTTPException(status_code=400, detail="User creation failed")
    return {"message": "User created successfully"}

@app.get("/get_history/{rfid}")
def get_history(rfid: str):
    history = global_db_handler.get_history_from_single_user(rfid)
    print(history)
    if not history:
        raise HTTPException(status_code=404, detail="No history found")
    return history

@app.get("/get_user/{rfid}")
def get_user(rfid: str):
    user = global_db_handler.get_single_user(rfid)
    print(user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/set_balance/{rfid}/{new_balance}")
def set_balance(rfid: str, new_balance: int):
    success = global_db_handler.set_new_balance(rfid, new_balance)
    if not success:
        raise HTTPException(status_code=400, detail="Balance update failed")
    return {"message": "Balance updated successfully"}

#just a get server status
@app.get("/status")
def status():
    return {"status": "OK"}

#get parking status
@app.get("/parking_status")
def parking_status():
    return {"status": global_db_handler.get_parking_stats()}