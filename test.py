import RPi.GPIO as GPIO
import time

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)

try:
    while True:
        # Turn on the LED
        GPIO.output(17, GPIO.HIGH)
        print("LED ON")

        # Wait for 1 second
        time.sleep(1)

        # Turn off the LED
        GPIO.output(17, GPIO.LOW)
        print("LED OFF")

        # Wait for 1 second
        time.sleep(1)

except KeyboardInterrupt:
    # Clean up GPIO on program exit
    GPIO.cleanup()
