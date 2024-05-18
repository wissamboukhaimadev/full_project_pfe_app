from pymodbus.client import ModbusSerialClient
import time
import requests

COM_port="COM5"

amphie_url="http://localhost:4000/api/v1/amphie/insert"
stage1_url="http://localhost:4000/api/v1/stage1/insert"

slave = ModbusSerialClient(method='rtu', port=COM_port, baudrate=9600, bytesize=8, parity='N')

def PM3255(address):
    response = slave.read_holding_registers(address, count=2, slave=2)
    if not response.isError():
        V = (response.registers[0] << 16 | response.registers[1]) / (2**16)
        return V
    else:
        V = 0
        return V
while True:
    slave.connect()
    response = slave.read_holding_registers(0, count=2, slave=1)
    try:

        

        if not response.isError():

            # amphie_data={
            #     "temperature":str(response.registers[1] / 100),
            #     "co2_gaz":str(43),
            #     "humidity":str(response.registers[0] / 100)
            # }
            

            # stage1_data={
            #     "current":str(PM3255(0x0BC1)),
            #     "tension":str(PM3255(0x0BDB)),
            #     "power":str(PM3255(0x0BF3)),
            #     "energy":str(54)
            # }

            # requests.post(amphie_url,amphie_data)
            # requests.post(stage1_url,stage1_url)
            print(f"Humidity : {response.registers[0] / 100} %")
            print(f"Temperature : {response.registers[1] / 100} *C")
            print(f"la valeur de Tension est : {PM3255(3035):.2f} V")
            print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
            print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
            print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
            print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
    except AttributeError:
        pass
    slave.close()
    time.sleep(1)