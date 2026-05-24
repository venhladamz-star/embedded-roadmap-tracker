// courseData.js — 16 tuần dữ liệu thực từ file plan
// Phase colors: P1=#2F81F7 P2=#238636 P3=#D29922 P4=#F85149

export const PHASES = [
  { id: 'p1', title: 'Củng cố nền',          weeks: ['w1','w2','w3','w4'],   accent: '#2F81F7', num: 1 },
  { id: 'p2', title: 'Ngoại vi & Giao tiếp', weeks: ['w5','w6','w7','w8'],   accent: '#238636', num: 2 },
  { id: 'p3', title: 'FreeRTOS',              weeks: ['w9','w10','w11','w12'], accent: '#D29922', num: 3 },
  { id: 'p4', title: 'Hoàn thiện & Dự án',   weeks: ['w13','w14','w15','w16'],accent: '#F85149', num: 4 },
]

export const WEEKS = {
  'w1': {
    id: 'w1', phase: 'p1', num: 1,
    title: 'Làm bạn với C và con trỏ',
    objectives: [
      'Ôn tập cú pháp C: printf/scanf, vòng lặp, mảng, struct, typedef, enum',
      'Con trỏ cấp 1, cấp 2, con trỏ hàm, void pointer',
      'Bitwise operators và macro SET_BIT, CLEAR_BIT, TOGGLE_BIT, CHECK_BIT',
      'Xây dựng circular buffer bằng struct và mảng',
    ],
    resources: [
      {
        id: 'w1-r1', type: 'video',
        title: 'C Programming Tutorial for Beginners',
        source: 'freeCodeCamp.org',
        desc: 'Khóa 4 giờ, đầy đủ từ cơ bản đến con trỏ',
        url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
        tag: 'required',
      },
      {
        id: 'w1-r2', type: 'video',
        title: 'C Programming & Pointers',
        source: 'mycodeschool',
        desc: 'Playlist tập trung con trỏ, từng loại rõ ràng',
        url: 'https://youtube.com/playlist?list=PL2_aWCzGMAwLZp6LMUKI3cc7pgGsasm2_',
        tag: 'required',
      },
      {
        id: 'w1-r3', type: 'interactive',
        title: 'Sololearn',
        source: 'learn-c.org',
        desc: 'Học & thực hành trực tiếp trên trình duyệt',
        url: 'https://www.learn-c.org/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w1-e1', title: 'Viết bit_utils.h', desc: '4 macro: SET_BIT, CLEAR_BIT, TOGGLE_BIT, CHECK_BIT. Test trên uint8_t.', est: '30 min', required: true },
      { id: 'w1-e2', title: 'Circular Buffer', desc: 'Dùng struct + mảng, viết buf_write và buf_read. Test chuỗi ký tự.', est: '45 min', required: true },
      { id: 'w1-e3', title: 'Mảng con trỏ hàm', desc: 'Tạo mảng callback, in thông điệp khác nhau theo index.', est: '20 min', required: false },
    ],
  },

  'w2': {
    id: 'w2', phase: 'p1', num: 2,
    title: 'Tư duy nhúng – Không malloc, State Machine',
    objectives: [
      'Tại sao trong nhúng hạn chế malloc? (phân mảnh, real-time)',
      'Memory Pool tĩnh: tự tạo hàm my_alloc/my_free trên mảng có sẵn',
      'State Machine: dùng enum + switch-case',
      'Vai trò của volatile, static, const trong hệ nhúng',
    ],
    resources: [
      {
        id: 'w2-r1', type: 'article',
        title: 'embeddedartistry.com',
        source: 'state-machine.com',
        desc: 'Tổng hợp kiến thức và khóa học video của Miro Samek',
        url: 'https://state-machine.com/doc/Samek0312.pdf',
        tag: 'required',
      },
      {
        id: 'w2-r2', type: 'article',
        title: 'State Machines for Event-Driven Systems',
        source: 'Barr Group',
        desc: 'Hướng dẫn state machine cho hệ thống event-driven',
        url: 'https://barrgroup.com/Embedded-Systems/How-To/State-Machines-Event-Driven-Systems',
        tag: 'recommended',
      },
      {
        id: 'w2-r3', type: 'article',
        title: 'Why avoid malloc in embedded systems?',
        source: 'Embedded.com',
        desc: 'Giải thích lý do và các kỹ thuật quản lý bộ nhớ tĩnh',
        url: 'https://hoangvangioi.com/posts/c-programming-memory-management/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w2-e1', title: 'Memory Pool 256 byte', desc: 'Tạo memory pool 256 byte (16 khối 16 byte), viết pool_alloc và pool_free.', est: '40 min', required: true },
      { id: 'w2-e2', title: 'State Machine nút nhấn', desc: 'Viết chương trình console mô phỏng nút nhấn: IDLE → PRESSED → RELEASED.', est: '35 min', required: true },
    ],
  },

  'w3': {
    id: 'w3', phase: 'p1', num: 3,
    title: 'Điện tử cơ bản & Đọc Datasheet',
    objectives: [
      'Điện trở, tụ, transistor (BJT, MOSFET) làm khóa',
      'Mạch pull-up, pull-down, mạch RC chống dội',
      'Kỹ năng đọc datasheet: pinout, clock tree, GPIO registers của STM32F103C8',
    ],
    resources: [
      {
        id: 'w3-r1', type: 'video',
        title: 'Transistor as a switch',
        source: 'Khan Academy',
        desc: 'Video giải thích transistor làm khóa điện tử',
        url: 'https://www.khanacademy.org/science/physics/semiconductors/transistors/v/transistor-as-a-switch',
        tag: 'required',
      },
      {
        id: 'w3-r2', type: 'article',
        title: 'Transistors Tutorial',
        source: 'SparkFun',
        desc: 'Hướng dẫn transistor đầy đủ từ lý thuyết đến thực hành',
        url: 'https://learn.sparkfun.com/tutorials/transistors',
        tag: 'required',
      },
      {
        id: 'w3-r3', type: 'pdf',
        title: 'STM32F103C8 Datasheet',
        source: 'ST Microelectronics',
        desc: 'Datasheet chính thức — đọc trang 28–35 (pinout, GPIO)',
        url: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',
        tag: 'required',
      },
      {
        id: 'w3-r4', type: 'tool',
        title: 'Falstad Circuit Simulator',
        source: 'falstad.com',
        desc: 'Mô phỏng mạch điện online, miễn phí',
        url: 'https://www.falstad.com/circuit/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w3-e1', title: 'Đọc Datasheet STM32F103C8', desc: 'Tìm và note lại: số chân GPIO, clock max, địa chỉ base của GPIOA.', est: '30 min', required: true },
      { id: 'w3-e2', title: 'Mô phỏng mạch RC', desc: 'Dùng Falstad mô phỏng mạch RC chống dội nút nhấn.', est: '20 min', required: false },
    ],
  },

  'w4': {
    id: 'w4', phase: 'p1', num: 4,
    title: 'STM32 Bare-metal – Lập trình thanh ghi',
    objectives: [
      'Cài đặt STM32CubeIDE, tạo project cho Blue Pill',
      'Cấu hình clock (HSI 8MHz, PLL 72MHz)',
      'Điều khiển GPIO bằng thanh ghi: RCC_APB2ENR, GPIOx_CRL/CRH, GPIOx_ODR/BSRR',
    ],
    resources: [
      {
        id: 'w4-r1', type: 'video',
        title: 'STM32 Bare Metal Video Series',
        source: 'STM32World',
        desc: 'Series video lập trình bare-metal STM32 từ đầu',
        url: 'https://stm32world.com/wiki/STM32_Bare_Metal_Videos',
        tag: 'required',
      },
      {
        id: 'w4-r2', type: 'github',
        title: 'Bare Metal Embedded Course',
        source: 'g-schro / GitHub',
        desc: 'Repository kèm link playlist YouTube đầy đủ',
        url: 'https://github.com/g-schro/mcu-class-1-code',
        tag: 'required',
      },
      {
        id: 'w4-r3', type: 'pdf',
        title: 'STM32F103 Reference Manual RM0008',
        source: 'ST Microelectronics',
        desc: 'Tài liệu chính thức — đọc Chương 9 (GPIO registers)',
        url: 'https://www.st.com/resource/en/reference_manual/rm0008-stm32f101xx-stm32f102xx-stm32f103xx-stm32f105xx-and-stm32f107xx-advanced-armbased-32bit-mcus-stmicroelectronics.pdf',
        tag: 'required',
      },
    ],
    exercises: [
      { id: 'w4-e1', title: 'Blinky LED PC13', desc: 'Blinky LED chân PC13 chỉ dùng thanh ghi (không dùng HAL/LL).', est: '60 min', required: true },
      { id: 'w4-e2', title: 'Đọc nút nhấn PA0', desc: 'Polling PA0 (nút nhấn), bật/tắt LED, thêm debounce đơn giản.', est: '45 min', required: true },
    ],
  },

  // ── PHASE 2 ──────────────────────────────────────────────
  'w5': {
    id: 'w5', phase: 'p2', num: 5,
    title: 'Interrupt & Timer',
    objectives: [
      'NVIC, ngắt ngoài (EXTI), SysTick',
      'Viết hàm millis() bằng SysTick',
      'Debounce bằng timer trong ngắt',
    ],
    resources: [
      {
        id: 'w5-r1', type: 'video',
        title: 'STM32 EXTI Interrupt Example',
        source: 'YouTube',
        desc: 'Ví dụ thực tế cấu hình EXTI và xử lý ngắt ngoài',
        url: 'https://www.youtube.com/watch?v=JqWZ6d4v5Mk',
        tag: 'required',
      },
      {
        id: 'w5-r2', type: 'article',
        title: 'STM32 External Interrupts Tutorial',
        source: 'LinkedIn / Haberstock',
        desc: 'Hướng dẫn chi tiết cấu hình EXTI trên STM32',
        url: 'https://www.linkedin.com/pulse/stm32-microcontroller-tutorial-7-external-interrupts-hardware-haberstock/',
        tag: 'recommended',
      },
      {
        id: 'w5-r3', type: 'article',
        title: 'SysTick Timer on STM32',
        source: 'deepbluembedded.com',
        desc: 'Hướng dẫn lập trình SysTick để tạo hàm millis()',
        url: 'https://deepbluembedded.com/stm32-systick-timer-tutorial/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w5-e1', title: 'SysTick delay_ms', desc: 'Dùng SysTick tạo ms_tick, viết delay_ms không blocking.', est: '45 min', required: true },
      { id: 'w5-e2', title: 'EXTI0 LED toggle', desc: 'Cấu hình PA0 là EXTI0, trong ISR đảo LED, có chống dội.', est: '40 min', required: true },
    ],
  },

  'w6': {
    id: 'w6', phase: 'p2', num: 6,
    title: 'UART – Cửa sổ giao tiếp',
    objectives: [
      'UART frame, baud rate',
      'Viết driver UART2 (PA2-TX, PA3-RX) bằng thanh ghi (polling và interrupt)',
      'Xây dựng terminal nhận lệnh "ON"/"OFF"',
    ],
    resources: [
      {
        id: 'w6-r1', type: 'github',
        title: 'UART project with Bluepill',
        source: 'AliQorbaniFard / GitHub',
        desc: 'Code mẫu UART đầy đủ cho STM32F1 Blue Pill',
        url: 'https://github.com/AliQorbaniFard/UART_STM32F1_Bluepill',
        tag: 'required',
      },
      {
        id: 'w6-r2', type: 'video',
        title: 'STM32 UART Tutorial (Polling & Interrupt)',
        source: 'YouTube',
        desc: 'Video hướng dẫn UART từ polling đến interrupt-driven',
        url: 'https://www.youtube.com/watch?v=JqWZ6d4v5Mk',
        tag: 'required',
      },
      {
        id: 'w6-r3', type: 'article',
        title: 'STM32 UART Registers Deep Dive',
        source: 'deepbluembedded.com',
        desc: 'Giải thích chi tiết các thanh ghi USART',
        url: 'https://deepbluembedded.com/stm32-usart-uart-tutorial/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w6-e1', title: 'Hello UART', desc: 'Gửi "Hello\\n" mỗi giây, nhận ký tự và in ra màn hình serial.', est: '30 min', required: true },
      { id: 'w6-e2', title: 'Command Parser', desc: 'Dùng RX interrupt và buffer vòng, phân tích lệnh ON/OFF điều khiển LED.', est: '60 min', required: true },
    ],
  },

  'w7': {
    id: 'w7', phase: 'p2', num: 7,
    title: 'I2C & SPI',
    objectives: [
      'I2C: Start/Stop, ACK, địa chỉ 7-bit. Viết driver quét thiết bị',
      'SPI: CPOL/CPHA, giao tiếp full-duplex',
      'Đọc cảm biến LM75 (I2C) hoặc MPU6050',
    ],
    resources: [
      {
        id: 'w7-r1', type: 'video',
        title: 'I2C Protocol Basics (Microchip)',
        source: 'YouTube / Microchip',
        desc: 'Giải thích cơ bản về giao thức I2C',
        url: 'https://www.youtube.com/watch?v=7z2L8L3v7Qc',
        tag: 'required',
      },
      {
        id: 'w7-r2', type: 'video',
        title: 'STM32 I2C Tutorial',
        source: 'STM32World',
        desc: 'Hướng dẫn I2C trên STM32 từ cơ bản',
        url: 'https://stm32world.com/wiki/STM32_Tutorial_Videos#I2C',
        tag: 'required',
      },
      {
        id: 'w7-r3', type: 'tool',
        title: 'PulseView — Logic Analyzer',
        source: 'sigrok.org',
        desc: 'Phần mềm phân tích tín hiệu logic miễn phí',
        url: 'https://sigrok.org/wiki/PulseView',
        tag: 'optional',
      },
    ],
    exercises: [
      { id: 'w7-e1', title: 'I2C Scanner', desc: 'Viết I2C scanner, in địa chỉ thiết bị tìm thấy qua UART.', est: '50 min', required: true },
      { id: 'w7-e2', title: 'Đọc nhiệt độ LM75', desc: 'Đọc nhiệt độ LM75 mỗi giây, in ra terminal qua UART.', est: '60 min', required: true },
    ],
  },

  'w8': {
    id: 'w8', phase: 'p2', num: 8,
    title: 'ADC, PWM & Điều khiển',
    objectives: [
      'ADC: đọc biến trở, DMA',
      'PWM: tạo xung với TIM2, điều khiển độ sáng LED, servo SG90',
    ],
    resources: [
      {
        id: 'w8-r1', type: 'article',
        title: 'STM32 PWM Tutorial',
        source: 'deepbluembedded.com',
        desc: 'Hướng dẫn đầy đủ về PWM trên STM32 với Timer',
        url: 'https://deepbluembedded.com/stm32-pwm-tutorial/',
        tag: 'required',
      },
      {
        id: 'w8-r2', type: 'video',
        title: 'Servo Motor Control with STM32',
        source: 'YouTube',
        desc: 'Video điều khiển servo SG90 bằng PWM 50Hz',
        url: 'https://www.youtube.com/watch?v=0l6l8UqH4kE',
        tag: 'required',
      },
      {
        id: 'w8-r3', type: 'article',
        title: 'STM32 ADC Tutorial with DMA',
        source: 'deepbluembedded.com',
        desc: 'Đọc ADC và dùng DMA để không blocking CPU',
        url: 'https://deepbluembedded.com/stm32-adc-tutorial-complete-guide/',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w8-e1', title: 'ADC → PWM LED', desc: 'Đọc biến trở (ADC) → thay đổi duty cycle PWM → độ sáng LED.', est: '50 min', required: true },
      { id: 'w8-e2', title: 'Điều khiển Servo', desc: 'Tạo PWM 50Hz, điều khiển servo quay 0-180° bằng biến trở.', est: '60 min', required: true },
    ],
  },

  // ── PHASE 3 ──────────────────────────────────────────────
  'w9': {
    id: 'w9', phase: 'p3', num: 9,
    title: 'Task & Scheduler',
    objectives: [
      'Tạo 3 task LED và UART, hiểu xTaskCreate, vTaskDelay',
      'Hiểu cách FreeRTOS scheduler hoạt động (preemptive)',
      'Stack size, priority, và task states',
    ],
    resources: [
      {
        id: 'w9-r1', type: 'github',
        title: 'Introduction to RTOS (Shawn Hymel)',
        source: 'GitHub / Shawn Hymel',
        desc: 'Repository kèm video YouTube series 14 phần, rất rõ ràng',
        url: 'https://github.com/ShawnHymel/introduction-to-rtos',
        tag: 'required',
      },
      {
        id: 'w9-r2', type: 'article',
        title: 'FreeRTOS Getting Started',
        source: 'FreeRTOS.org',
        desc: 'Tài liệu chính thức FreeRTOS, hướng dẫn bắt đầu',
        url: 'https://www.freertos.org/FreeRTOS-quick-start-guide.html',
        tag: 'required',
      },
      {
        id: 'w9-r3', type: 'article',
        title: 'FreeRTOS Task Management',
        source: 'FreeRTOS.org',
        desc: 'API xTaskCreate, vTaskDelay, vTaskDelete',
        url: 'https://www.freertos.org/taskandcrblists.html',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w9-e1', title: '3 Task cơ bản', desc: 'Chạy 3 task: LED1 100ms, LED2 500ms, Task3 in "Hello" mỗi 1s.', est: '60 min', required: true },
    ],
  },

  'w10': {
    id: 'w10', phase: 'p3', num: 10,
    title: 'Queue, Semaphore, Mutex',
    objectives: [
      'Queue: truyền lệnh từ UART ISR đến task xử lý',
      'Binary Semaphore: ISR báo hiệu cho task',
      'Mutex: bảo vệ tài nguyên dùng chung (shared resource)',
    ],
    resources: [
      {
        id: 'w10-r1', type: 'article',
        title: 'FreeRTOS Queue Management',
        source: 'FreeRTOS.org',
        desc: 'Hướng dẫn Queue API: xQueueCreate, xQueueSend, xQueueReceive',
        url: 'https://www.freertos.org/Queues.html',
        tag: 'required',
      },
      {
        id: 'w10-r2', type: 'article',
        title: 'FreeRTOS Semaphores & Mutexes',
        source: 'FreeRTOS.org',
        desc: 'Binary semaphore, counting semaphore, mutex API',
        url: 'https://www.freertos.org/Semaphore/semaphores.html',
        tag: 'required',
      },
      {
        id: 'w10-r3', type: 'github',
        title: 'Introduction to RTOS — Part 6 & 7',
        source: 'GitHub / Shawn Hymel',
        desc: 'Phần Queue và Semaphore trong series Shawn Hymel',
        url: 'https://github.com/ShawnHymel/introduction-to-rtos',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w10-e1', title: 'UART → Queue → Task', desc: 'UART nhận lệnh → queue → task in ra "Đã nhận: [lệnh]".', est: '60 min', required: true },
      { id: 'w10-e2', title: 'EXTI → Semaphore → LED', desc: 'Nút nhấn EXTI → gửi Binary Semaphore → task đảo LED.', est: '45 min', required: true },
    ],
  },

  'w11': {
    id: 'w11', phase: 'p3', num: 11,
    title: 'Software Timer & Deferred Interrupt',
    objectives: [
      'Software Timer trong FreeRTOS: xTimerCreate, xTimerStart',
      'Deferred Interrupt Processing: ISR nhẹ, task nặng',
      'Watchdog timer (IWDG) để reset khi hệ thống treo',
    ],
    resources: [
      {
        id: 'w11-r1', type: 'article',
        title: 'FreeRTOS Software Timers',
        source: 'FreeRTOS.org',
        desc: 'API và cách sử dụng software timer trong FreeRTOS',
        url: 'https://www.freertos.org/FreeRTOS-Software-Timer-API-Functions.html',
        tag: 'required',
      },
      {
        id: 'w11-r2', type: 'article',
        title: 'Deferred Interrupt Handling',
        source: 'FreeRTOS.org',
        desc: 'Pattern xử lý ngắt nhẹ trong ISR, nặng trong task',
        url: 'https://www.freertos.org/deferred_interrupt_processing.html',
        tag: 'required',
      },
    ],
    exercises: [
      { id: 'w11-e1', title: 'Software Timer đọc LM75', desc: 'Tạo software timer 5s đọc LM75, in nhiệt độ qua UART.', est: '60 min', required: true },
      { id: 'w11-e2', title: 'Watchdog Timer', desc: 'Cấu hình IWDG, "kick" watchdog trong task chính.', est: '30 min', required: false },
    ],
  },

  'w12': {
    id: 'w12', phase: 'p3', num: 12,
    title: 'Tích hợp & Debug — Mini SCADA Terminal',
    objectives: [
      'Dự án cuối Phase 3: Mini SCADA Terminal',
      '4 task: Sensor, Display, Command, Watchdog',
      'Debug bằng SEGGER SystemView hoặc printf',
    ],
    resources: [
      {
        id: 'w12-r1', type: 'tool',
        title: 'SEGGER SystemView',
        source: 'SEGGER',
        desc: 'Tool phân tích real-time behavior của FreeRTOS app',
        url: 'https://www.segger.com/products/development-tools/systemview/',
        tag: 'recommended',
      },
      {
        id: 'w12-r2', type: 'github',
        title: 'FreeRTOS Demo Projects',
        source: 'FreeRTOS / GitHub',
        desc: 'Các project demo FreeRTOS chính thức để tham khảo',
        url: 'https://github.com/FreeRTOS/FreeRTOS',
        tag: 'optional',
      },
    ],
    exercises: [
      { id: 'w12-e1', title: 'Mini SCADA Terminal', desc: 'Dự án 4 task: SensorTask, DisplayTask, CommandTask, WatchdogTask với UART.', est: '3–4 giờ', required: true },
    ],
  },

  // ── PHASE 4 ──────────────────────────────────────────────
  'w13': {
    id: 'w13', phase: 'p4', num: 13,
    title: 'Git & Makefile',
    objectives: [
      'Git cơ bản: init, add, commit, branch, merge, push',
      'Viết Makefile cho ARM cross-compilation',
      'Quy trình đưa project lên GitHub với README tốt',
    ],
    resources: [
      {
        id: 'w13-r1', type: 'article',
        title: 'Pro Git — Official Book',
        source: 'git-scm.com',
        desc: 'Sách Git chính thức, miễn phí, đầy đủ nhất',
        url: 'https://git-scm.com/book/en/v2',
        tag: 'required',
      },
      {
        id: 'w13-r2', type: 'article',
        title: 'Makefile Tutorial',
        source: 'makefiletutorial.com',
        desc: 'Hướng dẫn Makefile từ cơ bản đến nâng cao',
        url: 'https://makefiletutorial.com/',
        tag: 'required',
      },
      {
        id: 'w13-r3', type: 'video',
        title: 'Git & GitHub Crash Course',
        source: 'freeCodeCamp.org',
        desc: 'Video 1 giờ học Git đầy đủ cho người mới',
        url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w13-e1', title: 'Đưa project lên GitHub', desc: 'Tạo repo, push code W1–W12, viết README cho ít nhất 1 project.', est: '60 min', required: true },
      { id: 'w13-e2', title: 'Viết Makefile ARM', desc: 'Viết Makefile cross-compile cho một project STM32 bare-metal.', est: '90 min', required: true },
    ],
  },

  'w14': {
    id: 'w14', phase: 'p4', num: 14,
    title: 'Embedded Linux (Raspberry Pi)',
    objectives: [
      'Làm quen Raspberry Pi: booting, GPIO, shell',
      'Viết kernel module cơ bản (hello world)',
      'Khái niệm device tree, cross-compilation',
    ],
    resources: [
      {
        id: 'w14-r1', type: 'article',
        title: 'Bootlin Embedded Linux Training',
        source: 'bootlin.com',
        desc: 'Slides và materials training Embedded Linux miễn phí',
        url: 'https://bootlin.com/doc/training/embedded-linux/',
        tag: 'optional',
      },
      {
        id: 'w14-r2', type: 'article',
        title: 'Raspberry Pi GPIO Documentation',
        source: 'Raspberry Pi Foundation',
        desc: 'Tài liệu chính thức GPIO Raspberry Pi',
        url: 'https://www.raspberrypi.com/documentation/computers/raspberry-pi.html',
        tag: 'optional',
      },
      {
        id: 'w14-r3', type: 'video',
        title: 'Linux Kernel Module Programming',
        source: 'YouTube',
        desc: 'Series viết kernel module cơ bản trên Linux',
        url: 'https://www.youtube.com/watch?v=x1Y203vH-Dc',
        tag: 'optional',
      },
    ],
    exercises: [
      { id: 'w14-e1', title: 'Hello Kernel Module', desc: 'Viết và load kernel module in "Hello from kernel" vào dmesg.', est: '2 giờ', required: false },
    ],
  },

  'w15': {
    id: 'w15', phase: 'p4', num: 15,
    title: 'Ôn phỏng vấn Embedded',
    objectives: [
      'Luyện câu hỏi phỏng vấn: volatile, static, ISR, mutex, priority inversion',
      'Làm bài tập LeetCode bằng C (Easy level)',
      'Ôn lại các khái niệm quan trọng từ W1–W14',
    ],
    resources: [
      {
        id: 'w15-r1', type: 'article',
        title: 'Embedded Systems Interview Questions',
        source: 'Embedded.com',
        desc: '100+ câu hỏi phỏng vấn embedded thường gặp',
        url: 'https://www.embedded.com/embedded-systems-interview-questions/',
        tag: 'required',
      },
      {
        id: 'w15-r2', type: 'interactive',
        title: 'LeetCode — C Easy Problems',
        source: 'LeetCode',
        desc: 'Luyện thuật toán bằng C, bắt đầu từ Easy',
        url: 'https://leetcode.com/problemset/all/?difficulty=EASY&page=1&languageTags=c',
        tag: 'required',
      },
      {
        id: 'w15-r3', type: 'article',
        title: 'Top Embedded C Interview Questions',
        source: 'Guru99',
        desc: 'Câu hỏi và đáp án phỏng vấn Embedded C',
        url: 'https://www.guru99.com/embedded-systems-interview-questions.html',
        tag: 'recommended',
      },
    ],
    exercises: [
      { id: 'w15-e1', title: 'Mock Interview', desc: 'Tự đặt câu hỏi và trả lời về: volatile, ISR safe, priority inversion.', est: '60 min', required: true },
      { id: 'w15-e2', title: 'LeetCode 5 bài Easy', desc: 'Giải 5 bài LeetCode Easy bằng ngôn ngữ C.', est: '90 min', required: true },
    ],
  },

  'w16': {
    id: 'w16', phase: 'p4', num: 16,
    title: 'Portfolio & GitHub',
    objectives: [
      'Hoàn thiện tất cả project, đưa lên GitHub với README đẹp',
      'Viết CV nhấn mạnh kỹ năng embedded: STM32, FreeRTOS, UART/I2C/SPI',
      'Chuẩn bị link portfolio và demo video',
    ],
    resources: [
      {
        id: 'w16-r1', type: 'article',
        title: 'How to Write a Good README',
        source: 'GitHub Docs',
        desc: 'Hướng dẫn viết README chuyên nghiệp cho GitHub',
        url: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
        tag: 'required',
      },
      {
        id: 'w16-r2', type: 'article',
        title: 'Embedded Systems Engineer Resume Guide',
        source: 'resume.io',
        desc: 'Mẫu CV và lời khuyên cho kỹ sư embedded',
        url: 'https://resume.io/resume-examples/embedded-systems-engineer',
        tag: 'required',
      },
    ],
    exercises: [
      { id: 'w16-e1', title: 'Portfolio GitHub', desc: 'Đưa ≥4 project lên GitHub, mỗi project có README đầy đủ, demo ảnh/video.', est: '3 giờ', required: true },
      { id: 'w16-e2', title: 'Viết CV', desc: 'Hoàn thiện CV nhấn mạnh: STM32, FreeRTOS, UART/I2C/SPI, Git.', est: '2 giờ', required: true },
    ],
  },
}

export const GOALS = [
  'Thành thạo C cho nhúng: con trỏ, quản lý bộ nhớ, bit manipulation',
  'Làm chủ STM32F103 (Blue Pill) từ thanh ghi đến HAL',
  'Giao tiếp UART, I2C, SPI; điều khiển ADC, PWM, servo',
  'Xây dựng hệ thống đa nhiệm với FreeRTOS',
  'Có ít nhất 4 project thực tế, sẵn sàng đi thực tập',
]

export const RESOURCE_TYPE_LABELS = {
  video:       'Video',
  article:     'Bài viết',
  interactive: 'Tương tác',
  github:      'GitHub',
  tool:        'Công cụ',
  pdf:         'PDF/Datasheet',
}

export const TAG_LABELS = {
  required:    'Bắt buộc',
  recommended: 'Khuyến nghị',
  optional:    'Tùy chọn',
}
