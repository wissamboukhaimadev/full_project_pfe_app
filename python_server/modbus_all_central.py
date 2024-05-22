import serial
import struct
import time

COM='7'


# Génération de la trame Modbus RTU pour lire des registres
def generateur_trame(register_address, nombre_registre, modbus_address):
    frame = bytearray([
        modbus_address,
        0x03,
        (register_address >> 8) & 0xFF,
        register_address & 0xFF,
        (nombre_registre >> 8) & 0xFF,
        nombre_registre & 0xFF,
        0,
        0,
    ])
    crc = 0xFFFF
    for i in range(len(frame) - 2):
        crc ^= frame[i]
        for j in range(8):
            if crc & 0x0001:
                crc >>= 1
                crc ^= 0xA001
            else:
                crc >>= 1
    frame[-2] = crc & 0xFF
    frame[-1] = crc >> 8
    return frame

# Extraction des données de la trame Modbus
def extracteur_donnee(trame):
    if trame.hex()[1] == '1':
        humidity_hex = trame.hex()[6:10]
        temp_hex = trame.hex()[10:14]
        hum = int(humidity_hex, 16) / 100
        temp = int(temp_hex, 16) / 100
        return hum, temp
    elif trame.hex()[1] == '2':
        data0 = int(trame.hex()[6:10], 16)
        data1 = int(trame.hex()[10:14], 16)
        float_value = struct.unpack('f', struct.pack('I', data0 << 16 | data1))[0]
        return float_value

# Fonction pour lire les données de chaque centrale de mesure
def lire_centrale(modbus_address, register_address, nombre_registre):
    try:
        ser = serial.Serial(COM, 9600, timeout=1)
        
        if ser.isOpen():
            print(f'Le port {ser.name} est ouvert.')

            frame = generateur_trame(register_address, nombre_registre, modbus_address)
            try:
                ser.write(frame)
                print(f'Trame envoyée à la centrale {modbus_address} :', frame.hex())
            except Exception as e:
                print(f'Erreur lors de l\'envoi des données à la centrale {modbus_address} : {e}')

            try:
                reponse = ser.read(nombre_registre * 2 + 5)
                print(f'Réponse reçue de la centrale {modbus_address} :', reponse.hex())
                return extracteur_donnee(reponse)
            except Exception as e:
                print(f'Erreur lors de la réception des données de la centrale {modbus_address} : {e}')
            finally:
                ser.close()
    except Exception as e:
        print(f'Erreur de communication avec la centrale {modbus_address} : {e}')
    return None

# Lecture des données de quatre centrales de mesure
centrales = [1, 2, 3, 4]
register_address = 0x0000
nombre_registre = 2  # Par exemple, lire deux registres

for centrale in centrales:
    resultat = lire_centrale(centrale, register_address, nombre_registre)
    if resultat is not None:
        if isinstance(resultat, tuple):
            hum, temp = resultat
            print(f'Centrale {centrale} - Humidité: {hum}%, Température: {temp}°C')
        else:
            print(f'Centrale {centrale} - Valeur flottante: {resultat}')
    time.sleep(1)  # Attendre un peu avant de lire la prochaine centrale