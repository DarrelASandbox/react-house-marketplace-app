/*
Using Firebase Web Version 9
Need firebase cli
Move populate.mjs & listings.json into root directory.
.firebaserc & firebase.json needs to be in root directory as well unless using firebase init command.
Quick fix for permission issue when writing to db is to change the Firestore Database rules.
*/

import dotenv from 'dotenv';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { readFile } from 'fs/promises';
import { auth, db } from './firebase.config.mjs';

dotenv.config();

const { listings } = JSON.parse(
  await readFile(new URL('./listings.json', import.meta.url))
);

// iterate over listings and create a doc in our listings collection
async function seed(userRef) {
  for (const listing of listings) {
    const docRef = await addDoc(collection(db, 'listings'), {
      ...listing,
      userRef,
    });
    console.log(`Created listing: ${docRef.id}`);
  }
  console.log('completed seeding... exiting');
  signOut();
  process.exit(1);
}

// NOTE: we first need to add a user in our Firebase console then sign them in
// with email and password
signInWithEmailAndPassword(
  auth,
  process.env.USER_EMAIL,
  process.env.USER_PASSWORD
).then(({ user: { uid } }) => {
  console.log('logged in user ', uid);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      seed(user.uid);
    } else {
      process.exit(1);
    }
  });
});
