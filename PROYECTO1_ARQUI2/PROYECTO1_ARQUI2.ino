#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>
#include <ArduinoJson.h>


// RFID Configuration
#define RST_PIN         9           // Configurable, see typical pin layout above
#define SS_PIN          53          // Configurable, see typical pin layout above

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance

// LCD and Servo Configuration
LiquidCrystal_I2C lcd(0x27, 16, 2); // Set the LCD I2C address to 0x27 for a 16 chars and 2 line display
Servo myservo;                      // Create servo object
const int servoPin = 10;            // Pin connected to the servo's control line

// Pins for Buttons and Sensors
const int photoResistorPin = A0;    // Pin connected to the photoresistor
const int buttonPin = 2;            // Button to open the gate
const int closeSwitchPin1 = 3;      // Switch 1 to close the gate (Entry)
const int closeSwitchPin2 = 18;     // Switch 2 to close the gate (Exit)
const int encoderPin = 19;          // Pin connected to the D output of the optical encoder
const int buzzer = 22;

// Arrays to store UIDs and corresponding information
const int UID_LENGTH = 4;           // Length of the UID (4 bytes)
const int MAX_CARDS = 7;            // Maximum number of cards to store
const byte storedUIDs[MAX_CARDS][UID_LENGTH] = {
  {0x33, 0xAF, 0x1B, 0x12}, 
  {0xF3, 0x46, 0x9E, 0x0F},
  {0x43, 0xAA, 0x51, 0x13},
  {0x33, 0x03, 0x2D, 0x10},
  {0x83, 0x9A, 0x68, 0x10},
  {0xA3, 0xF0, 0x67, 0x10},
  {0xE3, 0x8B, 0x57, 0x10}
};
const char* names[MAX_CARDS] = {
  "Alberto Josue Hernandez Armas",
  "Harold Sanchez",
  "Lourdes Manuel",
  "Melvin Valencia",
  "Random Person 1",
  "Random Person 2",
  "Random Person 3"
};
const char* roles[MAX_CARDS] = {
  "Student",
  "Teacher",
  "Student",
  "Student",
  "Teacher",
  "Student",
  "Teacher"
};

volatile bool openGateFlag = false;  // Flag to indicate gate should open
volatile bool closeGateFlag1 = false; // Flag to indicate gate should close using switch 1 (Entry)
volatile bool closeGateFlag2 = false; // Flag to indicate gate should close using switch 2 (Exit)
volatile bool coinDetected = false;  // Flag to indicate coin detection

unsigned long lastDetectionTime = 0; // Time of the last detection
const unsigned long debounceDelay = 1000; // Minimum delay between detections in milliseconds

const int maxPeople = 20; // Maximum number of people that can be tracked
int peopleInside = 0; // Counter to track the number of people inside

byte lastUID[UID_LENGTH]; // Store the last recognized UID
bool gateOpened = false; // Track if the gate was opened

// Function to compare two UIDs
bool compareUID(byte* uid1, byte* uid2) {
  for (int i = 0; i < UID_LENGTH; i++) {
    if (uid1[i] != uid2[i]) {
      return false;
    }
  }
  return true;
}

// Function to move the servo to open the gate
void openGate() {
  myservo.attach(servoPin);  // Attach the servo to the pin
  myservo.write(90);         // Rotate to open position (adjust angle as needed)
  delay(1000);               // Wait for 1 second
  myservo.detach();          // Detach the servo to stop it completely
  gateOpened = true;         // Mark the gate as opened
}

// Function to move the servo to close the gate
void closeGate() {
  myservo.attach(servoPin);  // Attach the servo to the pin
  myservo.write(0);          // Rotate back to starting position
  delay(1000);               // Ensure the servo has time to return
  myservo.detach();          // Detach the servo to stop it completely
  gateOpened = false;
}

// Interrupt Service Routine (ISR) for the button to open the gate
void openGateISR() {
  if(closeGateFlag1){
  openGateFlag = true; 
  } // Set the flag to open the gate
}

// Interrupt Service Routine (ISR) for the first switch to close the gate (enter)
void closeGateISR1() {
  closeGateFlag1 = true;  // Set the flag to close the gate (Entry)
}

// Interrupt Service Routine (ISR) for the second switch to close the gate (exit)
void closeGateISR2() {
  closeGateFlag2 = true;  // Set the flag to close the gate (Exit)
  Serial.print("Entro al final de carrera de salida");
}

// Interrupt Service Routine (ISR) for the encoder
void encoderISR() {
  unsigned long currentTime = millis();
  
  // Check if enough time has passed since the last detection
  if (currentTime - lastDetectionTime > debounceDelay) {
    coinDetected = true;  // Set the flag when a coin is detected
    lastDetectionTime = currentTime; // Update the last detection time
  }
}

void setup() {
  Serial.begin(9600);    // Initialize serial communications with the PC
  SPI.begin();           // Init SPI bus
  mfrc522.PCD_Init();    // Init MFRC522
  lcd.init();            // Initialize the LCD
  lcd.backlight();       // Turn on the LCD backlight
  myservo.attach(servoPin);  // Attach the servo to the pin initially
  myservo.write(0);      // Start with the servo in the starting position
  delay(1000);           // Optional delay
  pinMode(buzzer, OUTPUT);

  // Initialize interrupt pins
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(closeSwitchPin1, INPUT_PULLUP);
  pinMode(closeSwitchPin2, INPUT_PULLUP);
  pinMode(encoderPin, INPUT_PULLUP);  // Set encoder pin as input with pull-up resistor

  // Attach interrupts
  attachInterrupt(digitalPinToInterrupt(buttonPin), openGateISR, FALLING);
  attachInterrupt(digitalPinToInterrupt(closeSwitchPin1), closeGateISR1, FALLING);
  attachInterrupt(digitalPinToInterrupt(closeSwitchPin2), closeGateISR2, FALLING);
  attachInterrupt(digitalPinToInterrupt(encoderPin), encoderISR, FALLING);  // Attach interrupt to encoder pin

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Scan card...");
}

void loop() {
  // Display light level from photoresistor
  int lightLevel = analogRead(photoResistorPin);

  static unsigned long lastMillis = 0;
  if ((millis() - lastMillis) > 5000) {
    sendTemperature(lightLevel);  // <--- Sends temperature data via serial
    lastMillis = millis();
    }

  if (Serial.available() > 0) {
  String input = Serial.readStringUntil('\n');
  Serial.println("Datos recibidos: " + input);
  if(input == "entradaRFIDtrue"){
  openGate();
  }
 if(input == "salidaRFIDtrue"){
  openGate();
  }
   if(input == "salidarfidBotontrue"){
  openGate();
  }
   if(input == "salidaRFIDcointrue"){
  openGate();
  }
}

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Light Level:");
  lcd.setCursor(0, 1);
  lcd.print(lightLevel);
  delay(500);  // Update every 500ms

  // Check if a new card is present
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    byte* uid = mfrc522.uid.uidByte;
    bool found = true;

    
String uidString = ""; // Crear una variable para almacenar el UID

for (byte i = 0; i < mfrc522.uid.size; i++) {
  if (mfrc522.uid.uidByte[i] < 0x10) {
    uidString += " 0"; // Agregar un espacio y un cero si es menor que 0x10
  } else {
    uidString += " "; // Agregar solo un espacio
  }
  uidString += String(mfrc522.uid.uidByte[i], HEX); // Agregar el valor en hexadecimal
}

//Serial.println(uidString);
// Ahora puedes usar uidString como desees


    for (int i = 0; i < MAX_CARDS; i++) {
      if (true) {
        found = true;
        // Store the last recognized UID
        for (int j = 0; j < UID_LENGTH; j++) {
          lastUID[j] = uid[j];
        }
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(names[i]);
        lcd.setCursor(0, 1);
        lcd.print(roles[i]);
        //openGate();  // Open the gate for the recognized card
          if (!gateOpened && closeGateFlag1){
                digitalWrite(buzzer, HIGH);
                delay(200);
                digitalWrite(buzzer, LOW);
                lcd.clear();
                lcd.setCursor(0, 0);
                lcd.print("Bienvenido");
                //openGate();
                sendRFIDentrada(uidString);
              closeGateFlag1 = false;
            }
          if (!gateOpened && closeGateFlag2){
                digitalWrite(buzzer, HIGH);
                delay(200);
                digitalWrite(buzzer, LOW);
               lcd.clear();
                lcd.setCursor(0, 0);
                lcd.print("Feliz viaje");
                //openGate();
                sendRFIDsalida(uidString);
              closeGateFlag2 = false;
          }
        break;
      }
    }

    if (!found) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Unknown Card");
    }

    // Halt PICC to stop reading
    mfrc522.PICC_HaltA();

    delay(2000);  // Pause to allow user to see the message
  }

  if (gateOpened){
    if(closeGateFlag1 || closeGateFlag2){
      closeGate();
      closeGateFlag1 = false;
      closeGateFlag2 = false;
    }
  }

  if(!gateOpened && openGateFlag){
    //openGate();
    sendRFIDboton("visitanteBoton");
    openGateFlag = false;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Bienvenido visitante");
    closeGateFlag1 = false;
  }

  if(!gateOpened &&coinDetected && closeGateFlag2){
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Feliz viaje visitante");
    //openGate();
    sendRFIDcoin("visitanteCoin");
    coinDetected = false;
    closeGateFlag2 = false;
  }

}

void sendTemperature(int temperature) {
  StaticJsonDocument<128> doc;
  doc["temperature"] = temperature;

  char output[128];
  serializeJson(doc, output);
  Serial.println(output);  // <--- Sends temperature data via serial
}

void sendRFIDentrada(String rfid){
  StaticJsonDocument<128> doc;
  doc["rfidEntrada"] = rfid;

  char output[128];
  serializeJson(doc, output);
  Serial.println(output);
}

void sendRFIDsalida(String rfid){
  StaticJsonDocument<128> doc;
  doc["rfidSalida"] = rfid;

  char output[128];
  serializeJson(doc, output);
  Serial.println(output);
}

void sendRFIDboton(String rfid){
  StaticJsonDocument<128> doc;
  doc["rfidBoton"] = rfid;

  char output[128];
  serializeJson(doc, output);
  Serial.println(output);
}

void sendRFIDcoin(String rfid){
  StaticJsonDocument<128> doc;
  doc["rfidCoin"] = rfid;

  char output[128];
  serializeJson(doc, output);
  Serial.println(output);
}
