# 🆘🚑 ResQ-Net

ResQ-Net is a disaster management and rescue support platform. It helps find **nearby hospitals** with available beds, as well as **safe points declared by National Disaster Relief Teams and State Teams**. The platform provides both **User** and **Admin** interfaces.

## ✨ Features

### 👤 User Interface

* Search for **nearby hospitals** and view **bed availability**.
* Find **declared safe points** in real-time.
* Share **user coordinates** to request help.

### 🛠️ Admin Interface

* Update and manage **hospital bed counts**.
* Mark and update **rescue zones**.
* Manage and validate **safe points** provided by relief teams.

---

## 🚀 Getting Started

Follow these instructions to set up and run **ResQ-Net** on your system.

### 📂 Clone the Repository

```bash
git clone https://github.com/your-username/ResQ-Net.git
cd ResQ-Net
```

---

## 🎨 Frontend (React)

Navigate to the **frontend** directory:

```bash
cd resqnet-master/resqnet-master
npm install
npm run dev
```

This will start the React development server.

---

## ⚙️ Backend (Node.js + Express)

Navigate to the **backend** directory:

```bash
cd Mapbox
npm install
nodemon server.js
```

This will start the backend server.

---

## 🔑 Environment Configuration

Create a `.env` file in the **backend** directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

---



### User Interface

* Hospital Search & Bed Availability
* Safe Point Locator
* User Coordinates Sharing

### Admin Interface

* Manage Hospital Beds
* Mark Rescue Zones
* Validate Safe Points



---

## 📦 Tech Stack

* **Frontend:** React, Vite
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Maps & Location:** Mapbox

---

## 🏆 Achievement

ResQ-Net was developed as a hackathon project in CSA 4.0 to tackle **real-world disaster management problems** and we are in the top 10 finalists in 100+ teams.

We are proud to showcase **ResQ-Net** as a solution for safer, smarter rescue operations.


