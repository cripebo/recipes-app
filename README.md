# 🧑‍🍳 Recipes App


Recipes App is a full-stack web application built with Angular and Node.js with ExpressJS, integrated with OpenAI to generate recipes from user-provided ingredients. It also uses Firebase Authentication for login and Firestore for storing user-generated recipes.

### Features
- ✨ Generate unique recipes using OpenAI based on given ingredients
- 🔐 User authentication with Firebase Auth
- ☁️ Store and retrieve user recipes with Cloud Firestore
- 📱 Responsive Angular frontend
- 🌐 Node.js backend API to handle OpenAI requests
- 🔄 Real-time sync of user data with Firebase

### Tech Stack

#### Frontend
- [Angular](https://angular.io/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Cloud Firestore](https://firebase.google.com/products/firestore)
- [Spartan](https://www.spartan.ng/)

#### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [OpenAI API](https://platform.openai.com/docs)


### Installation

Install project with npm

```bash
# Clone the repository
git clone https://github.com/cripebo/recipes-app.git
cd recipes-app
```

Install frontend dependencies

```bash
cd frontend
npm install
```   

Install backend dependencies

```bash
cd ../backend
npm install
```   
### Environment Variables

**Backend (`/backend/.env`):**

```env
# Required: your OpenAI API key for generating recipes
OPENAI_API_KEY=your_openai_key_here

# Optional: backend port (default is 3030 if not set)
PORT=3030
```

**Frontend (`/frontend/src/environments/environment.ts`):**

```ts
export const environment = {
    BASE_API_UPL: 'https://recipesapi.cristianperis.dev/api' // <-- Replace with your backend URL
};
```

### Firebase Configuration

Firebase configuration is stored in a separate file and imported where needed. You need to configure your Firebase project settings in:

```frontend/src/app/configs/firebase-config.ts```

Modify this file to include your own Firebase project credentials:

```ts
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID_HERE',
  appId: 'YOUR_APP_ID_HERE',
};
```

### Run Locally
**Frontend**

```bash
ng serve -o
```

**Backend**

```bash
npm run dev
```

