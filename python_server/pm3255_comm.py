from pymodbus.client import ModbusSerialClient
from struct import unpack
import time
import requests

slave = ModbusSerialClient(method='rtu', port='COM7', baudrate=9600, bytesize=8, parity='N')
amphie_url="http://localhost:4000/api/v1/amphie/insert"
stage1_url="http://localhost:4000/api/v1/stage1/insert"

def PM3255(address):
    response = slave.read_holding_registers(address, count=2, slave=2)
    if not response.isError():
        V_totale = response.registers[0].to_bytes(2, byteorder='big')+ response.registers[1].to_bytes(2, byteorder='big')
        V = unpack('>f', V_totale)[0]
        return V
    else:
        #Erreur de lecture PM3255
        V = 0
        return V
while True:
    slave.connect()
    response = slave.read_holding_registers(0, count=2, slave=1)
    try:
        if not response.isError():
            amphie_data={
                "temperature":str(response.registers[0] / 100),
                "humidity":str(response.registers[1] / 100),
                "co2_gaz":str(49)
            }
            stage1_data={
                "tension":str(PM3255(0x0BDB)),
                "current":str(PM3255(0x0BC1)),
                "power":str(PM3255(0x0BF3))
            }

            amphie_response=requests.post(amphie_url,amphie_data)
            print(amphie_response.json)
            stage1_response=requests.post(stage1_url,stage1_data)
            print(stage1_response.json)




            print(f"Humidity : {response.registers[0] / 100} %")
            print(f"Temperature : {response.registers[1] / 100} *C")
            
            print(f"la valeur de Tension est : {PM3255(0x0BDB):.2f} V")
            print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
            print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
            print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
            print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
    except AttributeError:
        pass
    slave.close()

    time.sleep(10) # dev
    # time.sleep(300) # prod
    