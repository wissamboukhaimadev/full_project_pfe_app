import serial
import time
import struct
import requests

amphie_realtime_url="http://localhost:4000/api/v1/amphie/realtime"
amphie_db_url="http://localhost:4000/api/v1/amphie/insert"

ge_realtime_url="http://localhost:4000/api/v1/ge_department/realtime"
ge_db_url="http://localhost:4000/api/v1/ge_department/insert"

gbi_realtime_url="http://localhost:4000/api/v1/gbi_department/realtime"
gbi_db_url="http://localhost:4000/api/v1/gbi_department/insert"

pfe_realtime_url="http://localhost:4000/api/v1/pfe_room/realtime"
pfe_db_url="http://localhost:4000/api/v1/pfe_room/insert"

counter=0

def generateur_trame(REGISTER_ADDRESS, NOMBRE_REGISTER, MODBUS_ADDRESS):

    frame = bytearray([
        MODBUS_ADDRESS,
        0x03,
        (REGISTER_ADDRESS >> 8) & 0xFF,  
        REGISTER_ADDRESS & 0xFF,         
        (NOMBRE_REGISTER >> 8) & 0xFF,    
        NOMBRE_REGISTER & 0xFF,              
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

    ser = serial.Serial('COM9', 9600, timeout=3)

    if ser.isOpen():
        print(f'Le port {ser.name} est ouvert.')

    try:
        ser.write(frame)
        print('Trame envoyee :', frame.hex())
    except Exception | serial.SerialException as e:
        print(f'Erreur lors de l\'envoi des donnees : {e}')

    try:
        reponse = ser.read(NOMBRE_REGISTER*2 + 5)
        if not 0 in reponse:
            reponse = bytearray([0,0,0,0,0,0,0,0,])
        print('Reponse recue :', reponse.hex())
    except Exception | serial.SerialException as e:
        print(f'Erreur lors de la reception des donnees : {e}')

    ser.close()
    return reponse

def extracteur_donnee(trame):
    if trame.hex()[1] == '1' :
        humidity_hex = trame.hex()[6:10]
        temp_hex = trame.hex()[10:14]
        hum = int(humidity_hex, 16)/100
        temp = int(temp_hex, 16)/100
        return hum, temp
    elif trame.hex()[1] == '2' or trame.hex()[1] == '3' or trame.hex()[1] == '4':
        data0 = int(trame.hex()[6:10], 16)
        data1 = int(trame.hex()[10:14], 16)
        float_value = struct.unpack('f', struct.pack('I',data0 << 16 | data1))[0]
        return round(float_value,2)
    else:
        nothing = 0
        nothingX = 0
        return nothing, nothingX

while True:
    counter+=1
    # La temperature et l'humidité
    hum_temp = extracteur_donnee(generateur_trame(0, 2, 1))
    time.sleep(1)
    amphie_data={
        "temperature":str(hum_temp[1]),
        "co2_gaz":"111",
        "humidity":str(hum_temp[0])
    }
    print(amphie_data)
    data=requests.post(amphie_realtime_url,json=amphie_data)
    if(counter==5):
        data=requests.post(amphie_db_url,json=amphie_data)
    

    # gbi
    Tension = extracteur_donnee(generateur_trame(0x0BDB, 2, 2))
    time.sleep(1)
    Courant = extracteur_donnee(generateur_trame(0x0BC1, 2, 2))
    time.sleep(1)
    PAT = extracteur_donnee(generateur_trame(0x0BF3, 2, 2))
    time.sleep(1)
    PRT = extracteur_donnee(generateur_trame(0x0BFB, 2, 2))
    time.sleep(1)
    PAPPT = extracteur_donnee(generateur_trame(0x0C03, 2, 2))
    time.sleep(1)
    E = extracteur_donnee(generateur_trame(0xB06D, 2, 2))
    time.sleep(1)
    gbi_data={
        "tension":str(Tension), 
        "current":str(Courant), 
        "puissance_active":str(PAT), 
        "puissance_apparente":str(PAPPT), 
        "puissance_reactive":str(PRT), 
        "energy":str(E)
    }
    print(gbi_data)
    data=requests.post(gbi_realtime_url,json=gbi_data)
    if(counter==5):
        data=requests.post(gbi_db_url,json=gbi_data)


    # GE
    Tension = extracteur_donnee(generateur_trame(0x0BDB, 2, 3))
    time.sleep(1)
    Courant = extracteur_donnee(generateur_trame(0x0BC1, 2, 3))
    time.sleep(1)
    PAT = extracteur_donnee(generateur_trame(0x0BF3, 2, 3))
    time.sleep(1)
    PRT = extracteur_donnee(generateur_trame(0x0BFB, 2, 3))
    time.sleep(1)
    PAPPT = extracteur_donnee(generateur_trame(0x0C03, 2, 3))
    time.sleep(1)
    E = extracteur_donnee(generateur_trame(0x0A8B, 2, 3))
    time.sleep(1)
    ge_data={
        "tension":str(Tension), 
        "current":str(Courant), 
        "puissance_active":str(PAT), 
        "puissance_apparente":str(PAPPT), 
        "puissance_reactive":str(PRT), 
        "energy":str(E)
    }
    data=requests.post(ge_realtime_url,json=ge_data)
    if(counter==5):
        data=requests.post(ge_db_url,json=ge_data)


    # electrotech pfe
    Tension = extracteur_donnee(generateur_trame(0x0BDB, 2, 4))
    time.sleep(1)
    Courant = extracteur_donnee(generateur_trame(0x0BC1, 2, 4))
    time.sleep(1)
    PAT = extracteur_donnee(generateur_trame(0x0BF3, 2, 4))
    time.sleep(1)
    PRT = extracteur_donnee(generateur_trame(0x0BFB, 2, 4))
    time.sleep(1)
    PAPPT = extracteur_donnee(generateur_trame(0x0C03, 2, 4))
    time.sleep(1)
    E = extracteur_donnee(generateur_trame(0x0A8B, 2, 4))
    time.sleep(1)
    pfe_data={
        "tension":str(Tension), 
        "current":str(Courant), 
        "puissance_active":str(PAT), 
        "puissance_apparente":str(PAPPT), 
        "puissance_reactive":str(PRT), 
        "energy":str(E)
    }
    data=requests.post(pfe_realtime_url,json=pfe_data)
    if(counter==5):
        data=requests.post(pfe_db_url,json=pfe_data)
        counter=0
        print("============================================================================")

    time.sleep(1)