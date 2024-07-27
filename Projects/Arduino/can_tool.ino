#include <SPI.h>
#include <Wire.h>
#define CAN_2515
// #define CAN_2518FD

// Set SPI CS Pin according to your hardware

#if defined(SEEED_WIO_TERMINAL) && defined(CAN_2518FD)
// For Wio Terminal w/ MCP2518FD RPi Hat：
// Channel 0 SPI_CS Pin: BCM 8
// Channel 1 SPI_CS Pin: BCM 7
// Interupt Pin: BCM25
const int SPI_CS_PIN  = BCM8;
const int CAN_INT_PIN = BCM25;
#else

// For Arduino MCP2515 Hat:
// the cs pin of the version after v1.1 is default to D9
// v0.9b and v1.0 is default D10
const int SPI_CS_PIN = 9;
const int CAN_INT_PIN = 2;
#endif

#ifdef CAN_2518FD
#include "mcp2518fd_can.h"
mcp2518fd CAN(SPI_CS_PIN); // Set CS pin

// TEST TEST MCP2518FD CAN2.0 data transfer
#define MAX_DATA_SIZE 8
// To TEST MCP2518FD CANFD data transfer, uncomment below lines
// #undef  MAX_DATA_SIZE
// #define MAX_DATA_SIZE 64

#endif//CAN_2518FD

#ifdef CAN_2515
#include "mcp2515_can.h"
mcp2515_can CAN(SPI_CS_PIN); // Set CS pin
#define MAX_DATA_SIZE 8
#endif

typedef struct {
  Msg_t *next_msg; 
  Msg_t *prev_msg; 
} Msg_t; 

void setup() {
  SERIAL_PORT_MONITOR.begin(115200); 
  while (!Serial); // wait for Serial rx
  
  if (CAN.begin(CAN_500KBPS) != 0) {
    SERIAL_PORT_MONITOR.println("CAN-BUS initiliased error!");
    while(1);
  }

  SERIAL_PORT_MONITOR.println("CAN init ok!");
}

unsigned msg_len = MAX_DATA_SIZE; 
uint32_t msg_id = 0x200; 
byte msg_data[MAX_DATA_SIZE] = {0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff};
int i, n; 
int msg_index; 

void loop() {
  for (msg_index = 0; msg_index < MAX_MSG_AMOUNT; msg_index++) {
    char print_buffer[32 + MAX_DATA_SIZE * 3]; 
    n = sprintf(print_buffer, "TX: [%08lX] ", (unsigned long)msg_id); 
    
    for (i = 0; i < msg_len; i++) {
      n += sprintf(print_buffer + n, "%02X ", msg_data[i]);
    }
    
    CAN.sendMsgBuf(msg_id, 1, 0, msg_len, msg_data); 
    SERIAL_PORT_MONITOR.println(print_buffer);
  }
}
