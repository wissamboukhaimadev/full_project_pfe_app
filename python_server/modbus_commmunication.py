from pymodbus.client import ModbusSerialClient
import time
import requests
import threading


COM_port="COM5"
temperature_humidity_slave_id=0
centrales_addresses=[1,2,3,4]

amphi_url="http://localhost:4000/api/v1/amphie/realtime"
ge_department="http://localhost:4000/api/v1/ge_department/realtime"
gbi_department="http://localhost:4000/api/v1/pfe_room/realtime"
global_central="http://localhost:4000/api/v1/global/realtime"


slave = ModbusSerialClient(method='rtu', port=COM_port, baudrate=9600, bytesize=8, parity='N')

def PM3255(address):
    response = slave.read_holding_registers(address, count=2, slave=2)
    if not response.isError():
        V = (response.registers[0] << 16 | response.registers[1]) / (2**16)
        return V
    else:
        V = 0
        return V
    

def real_time_function():
    while True:
        slave.connect()

        response = slave.read_holding_registers(0, count=2, slave=temperature_humidity_slave_id)
        try:
            if not response.isErrtor():
                print(f"Humidity : {response.registers[0] / 100} %")
                print(f"Temperature : {response.registers[1] / 100} *C")

        except AttributeError:
            pass

        for central_address in centrales_addresses:
            response = slave.read_holding_registers(1, count=2, slave=central_address)
            try:
                if not response.isErrtor():
                    print(f"la valeur de Tension est : {PM3255(3035):.2f} V")
                    print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
                    print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
                    print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
                    print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
            except AttributeError:
                pass
        slave.close()
        print("Real-time function running")
        # Your real-time code here
        time.sleep(2) # 2 seconds


def insert_into_db():
    while True:
        print("insering into db")
        slave.connect()

        response = slave.read_holding_registers(0, count=2, slave=temperature_humidity_slave_id)
        try:
            if not response.isErrtor():
                print(f"Humidity : {response.registers[0] / 100} %")
                print(f"Temperature : {response.registers[1] / 100} *C")

        except AttributeError:
            pass

        for central_address in centrales_addresses:
            response = slave.read_holding_registers(1, count=2, slave=central_address)
            try:
                if not response.isErrtor():
                    print(f"la valeur de Tension est : {PM3255(3035):.2f} V")
                    print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
                    print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
                    print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
                    print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
            except AttributeError:
                pass
        slave.close()
        time.sleep(10)  # 10 seconds

# while True:
#     slave.connect()

#     response = slave.read_holding_registers(0, count=2, slave=temperature_humidity_slave_id)
#     try:
#         if not response.isErrtor():
#             print(f"Humidity : {response.registers[0] / 100} %")
#             print(f"Temperature : {response.registers[1] / 100} *C")

#     except AttributeError:
#         pass

#     for central_address in centrales_addresses:
#         response = slave.read_holding_registers(1, count=2, slave=central_address)
#         try:
#             if not response.isErrtor():
#                 print(f"la valeur de Tension est : {PM3255(3035):.2f} V")
#                 print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
#                 print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
#                 print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
#                 print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
#         except AttributeError:
#             pass
#     slave.close()
#     time.sleep(1)

real_time_thread = threading.Thread(target=real_time_function)
db_thread = threading.Thread(target=insert_into_db)

real_time_thread.start()
db_thread.start()

# Join the threads to the main thread to keep them running
real_time_thread.join()
db_thread.join()