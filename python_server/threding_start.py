import threading
import time

def real_time_function():
    while True:
        print("Real-time function running")
        # Your real-time code here
        time.sleep(2)

def insert_into_db():
    while True:
        print("insering into db")
        time.sleep(10)  # 10 secoonds (dev only)

# Create and start the threads
real_time_thread = threading.Thread(target=real_time_function)
db_thread = threading.Thread(target=insert_into_db)

real_time_thread.start()
db_thread.start()

# Join the threads to the main thread to keep them running
real_time_thread.join()
db_thread.join()