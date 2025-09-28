# 🚀 Full Deployment Guide: PolyLingua AI Chatbot

Deploy your **multilingual chatbot** so it works entirely online — no need to run `localhost:3000` for frontend or `localhost:8000` for backend.

---

## ✅ What You Want

- **Frontend** hosted on **Vercel**
- **Backend** hosted separately and publicly accessible
- Vercel frontend fetches from the **live backend**, not your local machine

---

## 🧠 Why It Doesn’t Work Yet

Your frontend is deployed on Vercel, but it’s still trying to fetch from:
https://127.0.0.1:8000/chat

This only works when your FastAPI backend is running locally.  
**Vercel cannot reach your local machine** — it needs a **public backend URL**.

---

## ✅ Step-by-Step: Make It Fully Live

### 1. 🚀 Deploy Your FastAPI Backend

Use one of these platforms:

| Platform     | Highlights                          |
|--------------|--------------------------------------|
| **Render**   | Free tier, easy Python setup         |
| **Railway**  | Fast deploys, great for APIs         |
| **AWS ECS**  | Scalable, ideal for production       |
| **Replit**   | Quick testing, not ideal for prod    |
| **Fly.io**   | Lightweight, good for small APIs     |

Once deployed, you’ll get a public URL like:
https://polylingua-api.onrender.com/chat


---

### 2. 🔧 Update Your Frontend `fetch` URL

In your `page.js`, change:

```js
const res = await fetch("http://127.0.0.1:8000/chat", {
```

to

```js
const res = await fetch("https://polylingua-api.onrender.com/chat", {
```
Or better: use an environment variable like NEXT_PUBLIC_API_URL.

### 3. 🛠️ Add .env.local to Your Frontend
Create a file called .env.local in your frontend root:

```env
NEXT_PUBLIC_API_URL=https://polylingua-api.onrender.com
```

Then update your fetch call:

```env
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
```

### 4. 🔁 Redeploy on Vercel
Once your frontend is updated:
- Push changes to GitHub
- Vercel will auto-deploy
- Your live site will now fetch from your live backend


### 🎯 Final Result
You’ll be able to open: https://polylingua-ai.vercel.app


And it will:
• 	✅ Show your chatbot interface
• 	✅ Handle multilingual input
• 	✅ Respond via your FastAPI backend
• 	✅ Work 24/7 — no localhost needed

Built with ❤️ by Praneet
Let the world talk to your bot — in any language.
