
import requests

# Define the URL of your Node.js server
url = 'http://localhost:4000/api/v1/amphie/insert'  
# Voltage value to send
voltage = 220  # Example voltage value

# Data to send to the server
data = {
    "temperature":"57",
    "co2_gaz":"67",
    "humidity":"40"
}

# Send a POST request with the voltage value
response = requests.post(url, json=data)

# Print the response from the server
print(response.json)

