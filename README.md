# ⚡ CoachPro – Professional Coaching Platform

## 🏗️ Project Structure
```
coachpro/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── admin/AdminDashboard.jsx
│   │   ├── coach/CoachDashboard.jsx
│   │   └── client/ClientDashboard.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── LangContext.jsx
│   ├── components/
│   ├── styles/globals.css
│   ├── firebase.js
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── firestore.rules
└── vercel.json
```

---

## 🚀 SETUP STEPS

### 1. Firebase Setup
1. Go to **console.firebase.google.com**
2. Create project (already done: "Coach Peter")
3. Enable **Authentication → Email/Password** ✅ Done
4. Enable **Firestore Database** ✅ Done
5. Enable **Storage** → Go to Storage → Get Started → Production mode
6. Copy Firestore rules from `firestore.rules` → Paste in Firebase → Publish

### 2. Create Admin Account
In Firebase Console → Authentication → Add user manually:
- Email: `00000000000@coachpro.app`
- Password: `Admin@CoachPro2024`

Then in Firestore → users collection → Add document:
- id: (the uid from auth)
- name: "Admin"
- phone: "00000000000"
- role: "admin"
- status: "approved"

### 3. Change Coach Secret Code
In `src/contexts/AuthContext.jsx` line:
```js
const COACH_SECRET = 'COACHPRO2024'; // Change this!
```

### 4. Install & Run
```bash
npm install
npm run dev
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Or drag the project folder to **vercel.com**

---

## 👥 User Roles

| Role | Access |
|------|--------|
| **Admin** | Full control — approve/reject coaches, view all |
| **Coach** | Manage clients, create plans with images/videos |
| **Client** | View their plan only, check subscription |

## 🔑 How Users Login
- All users login with **phone number + password**
- Example: phone `01012345678` → stored as `01012345678@coachpro.app`

## 🌐 Languages
- Click the **EN/AR** button to switch
- Full RTL support for Arabic

## ✨ Features
- ✅ Admin approves/rejects coaches
- ✅ Coach adds clients (stays logged in!)
- ✅ Workout plans with images & videos (max 30s)
- ✅ Real-time updates (Firebase)
- ✅ Subscription management & auto-expiry
- ✅ Arabic/English with RTL
- ✅ Mobile responsive
- ✅ Role-based security
