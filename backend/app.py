import serial

# Configura el puerto serial (reemplaza 'COM3' con tu puerto y ajusta el baudrate si es necesario)
ser = serial.Serial('COM3', 9600, timeout=1)

try:
    while True:
        # Lee los datos del puerto serial
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)
except KeyboardInterrupt:
    print("Lectura detenida.")
finally:
    # Cierra el puerto serial cuando termines
    ser.close()
