import serial
import requests


amphie_realtime_url="http://localhost:4000/api/v1/amphie/realtime"

# Configuration des constantes Modbus
MODBUS_ADDRESS = 0x01  # Remplacez par l'adresse de votre esclave
MODBUS_FUNCTION_READ_INPUT_REGISTERS = 0x03  # Code de fonction pour lire les registres d'entrée

# Préparation de la trame Modbus RTU
while True:
    frame = bytearray([
    MODBUS_ADDRESS,
    MODBUS_FUNCTION_READ_INPUT_REGISTERS,
    (0x0000 >> 8) & 0xFF,  # High byte de l'adresse de départ
    0x0000 & 0xFF,         # Low byte de l'adresse de départ
    (2 >> 8) & 0xFF,       # High byte du nombre de registres à lire
    2 & 0xFF,              # Low byte du nombre de registres à lire
    0,                     # deux octets reservé pour le CRC
    0,
])
    # Calcul du CRC
    crc = 0xFFFF
    for i in range(len(frame) - 2):
        crc ^= frame[i]
        for j in range(8):
            if crc & 0x0001:
                crc >>= 1
                crc ^= 0xA001
            else:
                crc >>= 1
    frame[-2] = crc & 0xFF  # Low byte du CRC
    frame[-1] = crc >> 8    # High byte du CRC

    #print(crc)
    #print()

    # Envoi de la trame sur le port série
    ser = serial.Serial('COM5', 9600)

    # Vérification si le port est ouvert
    if ser.isOpen():
        print(f'Le port {ser.name} est ouvert.')

    try:
        ser.write(frame)
        print('Trame envoyée :', frame.hex())
    except Exception as e:
        print(f'Erreur lors de l\'envoi des données : {e}')

    # Attente de la réponse
    try:
        reponse = ser.read(9)  
        print('Réponse reçue :', reponse.hex())
    except Exception as e:
        print(f'Erreur lors de la réception des données : {e}')

    ser.close()

    humidity_hex = reponse.hex()[6:10]
    temp_hex = reponse.hex()[10:14]

    hum = int(humidity_hex, 16)/100
    temp = int(temp_hex, 16)/100
    print(hum)
    print(temp)


    amphie_data={
        "temperature":str(temp),
        "co2_gaz":"837",
        "humidity":str(hum)
    }


    data=requests.post(amphie_realtime_url,json=amphie_data)


