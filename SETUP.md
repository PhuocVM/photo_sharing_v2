# Setup Login & Register - Hướng dẫn

## ✅ Frontend đã hoàn thành

### Các files thay đổi:
1. **App.js** - Quản lý login state
   - Kiểm tra `localStorage` khi app load
   - Hiển thị `LoginRegister` nếu chưa login
   - Hiển thị main app nếu đã login

2. **TopBar/index.jsx** - Hiển thị user info
   - Hiển thị "Hi [first_name]"
   - Thêm button "Logout"

3. **components/LoginRegister/index.jsx** - New component
   - Tab Login / Register
   - Form login (login_name, password)
   - Form register (login_name, password x2, first_name, last_name, location, description, occupation)

4. **lib/fetchModelData.js** - Cập nhật error handling
   - Throw error nếu API response không ok

## ❌ Backend cần implement

Bạn cần thêm các API endpoints vào backend (Node/Express server):

### 1️⃣ Cập nhật User Schema
- Thêm `login_name` (unique, required)
- Thêm `password` (required)

### 2️⃣ Thêm 3 API endpoints:

**POST /admin/login**
- Input: `{ login_name, password }`
- Output: User object (hoặc error 400)
- Lưu user vào session

**POST /admin/logout**
- Clear session user

**POST /user** (Registration)
- Input: `{ login_name, password, first_name, last_name, location, description, occupation }`
- Validation: login_name phải unique, password/first_name/last_name required
- Output: User object (hoặc error 400)

### 3️⃣ Bảo vệ các endpoints
- Tất cả GET endpoints cần check `req.session.user` (401 nếu không có)
- Ngoại lệ: `/admin/login` và `/admin/logout` không cần check

---

## Xem chi tiết code backend

Mở file **BACKEND_GUIDE.md** để xem code mẫu.

---

## Testing Checklist

- [ ] Register user mới (check trùng login_name)
- [ ] Login với credentials đúng
- [ ] Login với credentials sai (hiển thị error)
- [ ] Logout
- [ ] Refresh page - vẫn login (nếu localStorage còn)
- [ ] User list chỉ hiển thị nếu đã login
- [ ] TopBar hiển thị "Hi [name]" + Logout button

