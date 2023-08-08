#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>

#define GPIO_BASE_ADDR 0x20200000
#define GPIO_OUTPUT_PIN 17

int main()
{
    int mem_fd = open("/dev/mem", O_RDWR | O_SYNC);
    if (mem_fd == -1) {
        perror("Failed to open /dev/mem");
        return -1;
    }
    
    void *gpio_map = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, mem_fd, GPIO_BASE_ADDR);
    if (gpio_map == MAP_FAILED) {
        perror("Failed to map GPIO memory");
        close(mem_fd);
        return -1;
    }
    
    volatile unsigned int *gpio = (volatile unsigned int *)gpio_map;
    
    // Set GPIO pin as output
    *(gpio + ((GPIO_OUTPUT_PIN) / 10)) &= ~(7 << (((GPIO_OUTPUT_PIN) % 10) * 3));
    *(gpio + ((GPIO_OUTPUT_PIN) / 10)) |=  (1 << (((GPIO_OUTPUT_PIN) % 10) * 3));
    
    // Toggle the LED 10 times
    for (int i = 0; i < 10; i++) {
        *(gpio + 7) = 1 << GPIO_OUTPUT_PIN; // Turn on the LED
        sleep(1);
        *(gpio + 10) = 1 << GPIO_OUTPUT_PIN; // Turn off the LED
        sleep(1);
    }
    
    munmap(gpio_map, 4096);
    close(mem_fd);
    
    return 0;
}
