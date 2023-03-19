import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyD40KeWCdMbAKszWAzN95NOVAOSXilS4y4",
  authDomain: "peeper-346c9.firebaseapp.com",
  projectId: "peeper-346c9",
  storageBucket: "peeper-346c9.appspot.com",
  messagingSenderId: "553069121794",
  appId: "1:553069121794:web:d23d3653b5bd265da4721b",
  measurementId: "G-6VGV0DG1SK"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage();



export {app,db,storage}