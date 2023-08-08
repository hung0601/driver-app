from gpiozero import LED
from time import sleep

LED_PIN = 17

def main():
    led = LED(LED_PIN)
    
    # Toggle the LED 10 times
    for i in range(10):
        led.on()  # Turn on the LED
        print("LED ON")
        sleep(1)
        led.off()  # Turn off the LED
        print("LED OFF")
        sleep(1)

if __name__ == '__main__':
    main()
