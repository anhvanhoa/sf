Ok, mình sẽ giúp bạn tạo một **tài liệu phân tích hệ thống (System Analysis Document)** cho dự án **Smart Farming** theo chuẩn phân tích hệ thống (gần giống tài liệu SRS – Software Requirement Specification).

---

# 📘 TÀI LIỆU PHÂN TÍCH HỆ THỐNG

## Dự án: Smart Farming – Hệ thống Nông nghiệp Thông minh

---

## 1. Giới thiệu hệ thống

### 1.1. Mục tiêu

- Giúp nông dân quản lý môi trường trồng trọt hiệu quả.
- Tự động hóa tưới tiêu, chiếu sáng, điều chỉnh nhiệt độ, giảm chi phí nhân công.
- Dùng dữ liệu cảm biến + AI để đưa ra quyết định thông minh (ví dụ: tưới khi đất khô, cảnh báo khi cây có dấu hiệu sâu bệnh).

### 1.2. Phạm vi ứng dụng

- Nhà kính, trang trại rau, hoa, cây ăn quả.
- Có thể mở rộng ra quy mô lớn (hệ thống quản lý nhiều khu ruộng).

---

## 2. Mô tả hệ thống

### 2.1. Các thành phần chính

1. **Thiết bị IoT (Edge Layer)**
    - Cảm biến: nhiệt độ, độ ẩm đất, độ ẩm không khí, ánh sáng.
    - Thiết bị điều khiển: bơm nước, đèn, quạt.
    - Vi điều khiển: ESP32/Arduino thu thập dữ liệu và gửi về server qua WiFi/4G.

2. **Hệ thống trung tâm (Backend Layer)**
    - Máy chủ xử lý dữ liệu (Node.js/Python/Go).
    - Lưu trữ dữ liệu (PostgreSQL, MongoDB, InfluxDB).
    - Cung cấp API cho ứng dụng web/mobile.
    - Tích hợp mô hình AI (dự đoán nhu cầu tưới, phát hiện bất thường).

3. **Ứng dụng quản lý (Application Layer)**
    - **Web Dashboard**: hiển thị dữ liệu thời gian thực, biểu đồ.
    - **Mobile App**: điều khiển thiết bị từ xa, nhận cảnh báo.

---

## 3. Chức năng hệ thống

### 3.1. Chức năng chính

- **Giám sát môi trường**:
    - Xem dữ liệu cảm biến theo thời gian thực.
    - Biểu đồ nhiệt độ, độ ẩm theo ngày/tháng.

- **Tự động điều khiển**:
    - Hệ thống bật bơm khi độ ẩm đất < ngưỡng.
    - Bật quạt khi nhiệt độ > 35°C.

- **Cảnh báo**:
    - Gửi SMS/email/Telegram khi có bất thường.

- **Dự đoán & Gợi ý**:
    - AI dự đoán nhu cầu tưới tiêu trong 24h tới dựa trên thời tiết + dữ liệu lịch sử.
    - Gợi ý lịch bón phân, thu hoạch.

### 3.2. Chức năng quản trị

- Quản lý người dùng (nông dân, kỹ sư, admin).
- Quản lý thiết bị cảm biến & khu vực trồng trọt.
- Xuất báo cáo sản lượng, môi trường.

---

## 4. Yêu cầu phi chức năng

- **Hiệu năng**: hệ thống phải xử lý dữ liệu cảm biến < 2 giây trễ.
- **Bảo mật**: dữ liệu IoT truyền qua TLS/HTTPS/MQTT với chứng chỉ.
- **Khả năng mở rộng**: hỗ trợ thêm hàng ngàn cảm biến.
- **Tính khả dụng**: uptime ≥ 99%.

---

## 5. Kiến trúc hệ thống (Architecture)

```
[IoT Sensors] → [ESP32/Arduino] → [MQTT Broker/HTTP API] → [Backend Server]
              → [Database] → [AI Module] → [Web/Mobile Dashboard]
```

- IoT gửi dữ liệu → Server xử lý → Lưu DB → Dashboard hiển thị.
- AI module phân tích dữ liệu định kỳ.
- Người dùng có thể điều khiển thiết bị từ dashboard, lệnh được gửi ngược lại IoT.

---

## 6. Mô hình ca sử dụng (Use Case)

**Actor chính:**

- Nông dân (User)
- Hệ thống IoT (Device)
- Quản trị viên (Admin)

**Các Use Case chính:**

1. Nông dân xem dữ liệu cảm biến.
2. Nông dân nhận cảnh báo (qua app).
3. Nông dân bật/tắt bơm nước từ xa.
4. Hệ thống IoT tự động tưới khi đất khô.
5. Admin thêm/xóa cảm biến.
6. AI đưa ra gợi ý tưới tiêu.
