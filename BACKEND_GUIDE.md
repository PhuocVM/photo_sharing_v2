# Backend API Implementation Guide

Bạn cần thêm các endpoint này vào backend (Express server):

## 1. Cập nhật User Schema (MongoDB/Mongoose)

```javascript
// Thêm vào User schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  description: String,
  occupation: String,
  location: String,
  date_time: { type: Date, default: Date.now },
  
  // Thêm hai field này
  login_name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
```

## 2. Thêm các API endpoints

### POST /admin/login
```javascript
app.post("/admin/login", async (req, res) => {
  const { login_name, password } = req.body;

  if (!login_name || !password) {
    return res.status(400).send("Missing login_name or password");
  }

  try {
    const user = await User.findOne({ login_name });

    if (!user || user.password !== password) {
      return res.status(400).send("Invalid login credentials");
    }

    // Lưu vào session
    req.session.user = user;

    // Return user info
    res.json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      login_name: user.login_name,
      description: user.description,
      occupation: user.occupation,
      location: user.location
    });
  } catch (err) {
    res.status(400).send("Login failed: " + err.message);
  }
});
```

### POST /admin/logout
```javascript
app.post("/admin/logout", (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("No user logged in");
  }

  req.session.user = null;
  res.json({ success: true });
});
```

### POST /user (Register)
```javascript
app.post("/user", async (req, res) => {
  const { login_name, password, first_name, last_name, location, description, occupation } = req.body;

  // Validation
  if (!login_name || !password || !first_name || !last_name) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Check if login_name already exists
    const existingUser = await User.findOne({ login_name });
    if (existingUser) {
      return res.status(400).send("Login name already exists");
    }

    // Create new user
    const newUser = new User({
      login_name,
      password,
      first_name,
      last_name,
      location: location || "",
      description: description || "",
      occupation: occupation || ""
    });

    await newUser.save();

    res.json({
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      login_name: newUser.login_name
    });
  } catch (err) {
    res.status(400).send("Registration failed: " + err.message);
  }
});
```

## 3. Bảo vệ các endpoints khác

Thêm middleware này trước các route cần bảo vệ:

```javascript
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

// Áp dụng cho endpoints cần login
app.get("/api/user/:id", requireLogin, (req, res) => {
  // existing code
});

app.get("/api/photo/:id", requireLogin, (req, res) => {
  // existing code
});

// ... và các endpoints khác
```

## 4. Session configuration

Đảm bảo Express session đã được config:

```javascript
const session = require("express-session");

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Nếu dev local, để false
}));
```

---

**Lưu ý**: Tạm thời mình dùng plain text password. Thực tế nên dùng bcrypt để hash password trước khi save vào DB.
