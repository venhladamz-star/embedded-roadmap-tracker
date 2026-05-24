# 🔌 Embedded Roadmap Tracker

> Theo dõi lộ trình học **Embedded Software 16 tuần** cho sinh viên Kỹ thuật điều khiển & Tự động hóa.

App là **trình tổ chức & tracker** — không dạy học trực tiếp. Mỗi tuần chứa danh sách tài liệu ngoài (YouTube, docs, GitHub). Click → học ở nguồn gốc → quay lại app → tick "Đã học".

## ✨ Tính năng

- 📊 **Dashboard** — progress ring, 4 phase cards, "Tiếp tục học" card
- 🗺️ **Lộ trình** — timeline 16 tuần với trạng thái
- 📚 **Tuần học** — objectives, tài liệu có toggle, bài tập, ghi chú cá nhân
- 🔍 **Thư viện** — filter theo type/phase/status, search
- 📈 **Tiến trình** — stats, bảng tuần, achievements, streak
- 💾 **localStorage** — lưu tự động, persist qua reload
- 🔔 **Toast badges** — thông báo khi unlock thành tích

## 🛠️ Tech Stack

- React 18 + Vite
- TailwindCSS 3
- react-router-dom v6
- Lucide React icons
- Google Fonts: Inter + JetBrains Mono
- localStorage (no backend)

## 🚀 Chạy local

```bash
npm install
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

## 📦 Build production

```bash
npm run build
```

## ☁️ Deploy Vercel

1. Push code lên GitHub
2. Import repo vào [vercel.com](https://vercel.com)
3. Framework: **Vite** (auto-detect)
4. Deploy → done!

## 📖 Cấu trúc

```
src/
├── components/     # Navbar, Sidebar, ResourceCard, ...
├── context/        # ProgressContext
├── data/           # courseData.js (16 tuần)
├── hooks/          # useProgress (localStorage)
└── pages/          # Dashboard, Roadmap, WeekDetail, Resources, Progress
```

## 🎯 Lộ trình 16 tuần

| Phase | Tuần | Nội dung |
|-------|------|----------|
| 1 — Củng cố nền | 1–4 | C & con trỏ, State Machine, Điện tử, STM32 Bare-metal |
| 2 — Ngoại vi | 5–8 | Interrupt/Timer, UART, I2C/SPI, ADC/PWM |
| 3 — FreeRTOS | 9–12 | Task/Scheduler, Queue/Semaphore, Timer, Mini SCADA |
| 4 — Hoàn thiện | 13–16 | Git/Makefile, Embedded Linux, Phỏng vấn, Portfolio |
