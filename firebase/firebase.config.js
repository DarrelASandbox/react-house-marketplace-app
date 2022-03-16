// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGEING_SENDER_ID,
  appId: process.env.APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
export const db = getFirestore();

if (process.env.NODE_ENV === 'development') {
  console.log('testing locally -- hitting local auth and firestore emulators');
  auth().useEmulator('http://localhost:9099/');
  db.useEmulator('localhost', 8080);
}

console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
