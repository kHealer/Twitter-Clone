import firebase from "firebase/app";
import "firebase/firestore"
import { initializeApp } from 'firebase/app';
import {
  getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwrGZDUnj4nNGZfTHOA70rXcPNm_avQhc",

  authDomain: "twitter-cd687.firebaseapp.com",

  projectId: "twitter-cd687",

  storageBucket: "twitter-cd687.appspot.com",

  messagingSenderId: "213698348552",

  appId: "1:213698348552:web:b881ed297a65c6a2a133bd"

};

const app = initializeApp(firebaseConfig)

let db = getFirestore(app)

export default db