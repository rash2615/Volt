# ⚡ VoltRide - Plateforme de Gestion des Scooters Électriques

**VoltRide** est une plateforme complète de gestion de flotte de scooters électriques.  
Elle permet la gestion des stocks, le suivi des maintenances, ainsi que des statistiques en temps réel. 🚲⚡

## 📂 **Structure du projet**


volt-ride/
│
├── backend/           # Backend Nest.js (API REST + MongoDB)
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/          # Frontend React.js (Interface utilisateur)
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml # Orchestration des services (MongoDB, Backend, Frontend)
└── README.md          # Guide de lancement


---

## 🚀 **Installation**

### 1️⃣ **Cloner le projet**


git clone https://github.com/votre-nom-utilisateur/voltride.git
cd voltride


---

### 2️⃣ **Configurer les variables d’environnement**

Créez un fichier `.env` dans le dossier `backend/` avec le contenu suivant :

env
MONGO_URI=mongodb://mongo:27017/voltride


---

### 3️⃣ **Lancer le projet avec Docker**

Assurez-vous d’avoir **Docker** et **Docker Compose** installés.


docker-compose up --build


Les services suivants seront disponibles :
- 🛠️ **Backend (Nest.js)** ➡️ http://localhost:3001/
- 🌐 **Frontend (React.js)** ➡️ http://localhost:3000/
- 📊 **MongoDB** ➡️ Accessible sur le port `27017`

---

### 4️⃣ **Lancer sans Docker (optionnel)**

#### ⚙️ **Backend (Nest.js)**

cd backend
npm install
npm run start:dev

Le serveur API sera disponible sur ➡️ `http://localhost:3001/`

#### 🌍 **Frontend (React.js)**

cd frontend
npm install
npm start

L’interface utilisateur sera disponible sur ➡️ `http://localhost:3000/`

---

## 🔗 **Routes API**

### 📍 **Scooters**
- `GET /scooters` ➡️ Liste des scooters
- `POST /scooters` ➡️ Ajouter un scooter
- `DELETE /scooters/:id` ➡️ Supprimer un scooter
- `GET /scooters/:id/status` ➡️ Vérifier le statut d'un scooter

### 📦 **Stocks**
- `GET /stock` ➡️ Liste des stocks
- `POST /stock` ➡️ Ajouter un stock
- `PUT /stock/:id` ➡️ Modifier un stock
- `DELETE /stock/:id` ➡️ Supprimer un stock
- `GET /stock/notifications` ➡️ Notifications sur les stocks faibles

### 🔧 **Maintenance**
- `POST /maintenance` ➡️ Planifier une maintenance
- `GET /maintenance` ➡️ Liste des maintenances
- `POST /maintenance/:id/complete` ➡️ Marquer une maintenance comme terminée

---

## ✅ **Tests**

### ⚙️ **Backend (Nest.js)**
Lancer les tests unitaires :


cd backend
npm run test


---

## 👨‍💻 **Technologies Utilisées**

- **Backend :** [Nest.js](https://nestjs.com/) + [Mongoose](https://mongoosejs.com/)
- **Frontend :** [React.js](https://reactjs.org/) + [Framer Motion](https://www.framer.com/motion/) + [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Base de données :** [MongoDB](https://www.mongodb.com/)
- **Containerisation :** [Docker](https://www.docker.com/)

---

## 🙏 **Contributeurs**

- 🔥 **Nom Prénom** - *Développeur Backend*
- 💻 **Nom Prénom** - *Développeur Frontend*
- 🛠️ **Nom Prénom** - *Intégrateur DevOps*



