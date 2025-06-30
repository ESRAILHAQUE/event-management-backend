
```markdown
# 🧠 EventEase - Backend API

This is the **backend server** for the **EventEase** platform — a full-featured event management system where users can create, browse, and manage events.

Built with **Node.js**, **Express**, and **MongoDB**, this RESTful API powers the client-side application hosted separately.

---

## ⚙️ Technologies Used

- 🌐 **Node.js**
- 🚀 **Express.js**
- 🗃️ **MongoDB (with Mongoose)**
- 🔐 **JWT Authentication**
- 🛡️ **CORS**
- 📦 **dotenv**
- 📫 **REST API Design**

---

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ESRAILHAQUE/event-management-backend.git
cd event-management-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm run dev
```

Runs the server on `http://localhost:5000`

---

## 🛠️ Available API Endpoints

| Method | Route             | Description                 | Auth Required |
| ------ | ----------------- | --------------------------- | ------------- |
| GET    | `/api/events`     | Get all public events       | ✅ Yes         |
| POST   | `/api/events`     | Create new event            | ✅ Yes         |
| GET    | `/api/my-events`  | Get logged-in user's events | ✅ Yes         |
| PATCH  | `/api/events/:id` | Update an event             | ✅ Yes         |
| DELETE | `/api/events/:id` | Delete an event             | ✅ Yes         |
| POST   | `/api/login`      | Log in (return JWT)         | ❌ No          |
| POST   | `/api/register`   | Create new user             | ❌ No          |

> Note: Protect routes using `authMiddleware` (JWT)


## 🔐 CORS Configuration

To connect with frontend (e.g., Vite/React):

```js
app.use(cors({
  origin: ['http://localhost:5173', 'https://ph-event-management.netlify.app'],
  credentials: true
}));
```

---

## 📫 Postman / Thunder Client

You can test all routes using:

* ✅ [Postman Collection](https://example.com/postman-link) *(optional)*
* ✅ Thunder Client (VS Code Extension)

---

## 🧑 Author

**Esrail Haque**
🔗 [GitHub](https://github.com/ESRAILHAQUE)
📧 [esrailbblhs@gmail.com](mailto:esrailbblhs@gmail.com)
🌐 [Portfolio](https://esrailhaque.netlify.app)

---


