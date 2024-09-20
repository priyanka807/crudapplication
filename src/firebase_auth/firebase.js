import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrJ9a6n7LEgVwL16-9wwmCEPB2DuKrIt4",
  authDomain: "loginpage-cf9ee.firebaseapp.com",
  projectId: "loginpage-cf9ee",
  storageBucket: "loginpage-cf9ee.appspot.com",
  messagingSenderId: "178175555085",
  appId: "1:178175555085:web:3b5e12e8ff59836b048744",
  measurementId: "G-ZJ267474NZ",
};



const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export const database = getFirestore(firebaseApp)
export default auth;
