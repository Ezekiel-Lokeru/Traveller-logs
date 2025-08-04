
# Traveller Logs 🌍✈️

Traveller Logs is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that enables users to easily log, manage, and share their travel experiences. It supports both private journaling and public sharing, helping individuals keep memories alive and discover new adventures through others.

## 🌟 Key Features

- 🗺️ **Create & manage trips**: Add titles, descriptions, countries, destinations, dates, and photos.
- 👀 **Public vs private trips**: Control the visibility of your travel logs.
- 📸 **Image uploads**: Add photos to personalize your trip memories.
- 🔐 **User authentication**: Secure login and registration (with demo accounts).
- 📊 **Dashboard**: Stats and recent trips with a collapsible sidebar.
- 💬 **Comments & likes** on public trips.
- 🌐 **Responsive design**: Optimized for mobile, tablet, and desktop.

## 🚀 Demo

🌍 Live Frontend: [https://traveller-logs.vercel.app](https://traveller-logs.vercel.app)  
🌐 Live Backend API: [https://api.traveller-logs.com](https://api.traveller-logs.com)

Demo Login:  
```
Email: user@travelog.com  
Password: password123
```

## 🧠 Technologies Used

- Frontend: React.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Auth: JWT (with cookies)
- Deployment: Vercel (frontend), Railway/Render (backend)

## 📸 Screenshots

- Landing page with testimonials & hero section
- Dashboard with stats and recent trips
- Trip detail and edit views

## 🎯 Target Market

- 🌍 2 out of 5 people globally travel for personal or professional reasons annually.
- 📱 95% of travelers use mobile tools to plan or document trips.
- 👥 123 million+ millennials actively share travel logs on social platforms.

## 🔄 Future Enhancements

- Trip maps & location tagging (Google Maps or Mapbox)
- Offline journaling capability (PWA support)
- Collaborative trips (multi-user logs)
- Dark mode toggle

## 🤝 Social Impact

Traveller Logs supports the following UN Sustainable Development Goals (SDGs):  
![SDG 9](https://sdgs.un.org/sites/default/files/2020-09/09.png)
![SDG 11](https://sdgs.un.org/sites/default/files/2020-09/11.png)
![SDG 12](https://sdgs.un.org/sites/default/files/2020-09/12.png)
![SDG 13](https://sdgs.un.org/sites/default/files/2020-09/13.png)

## 🛠️ Installation (for developers)

```bash
# Clone frontend and backend
git clone https://github.com/your-username/traveller-logs.git

# Install frontend dependencies
cd client
pnpm install
pnpm dev

# Install backend dependencies
cd ../server
npm install
npm run dev
```

## 🔐 Environment Variables

Frontend `.env` example:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend `.env` example:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

## 📦 Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com)
- **Backend** is deployed on [Render](https://render.com)
- **Database** is hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 💼 License

MIT © 2025 Ezekiel Lokeru  
Design and idea by [@ezekiel](https://github.com/ezekiel_lokeru)
