import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCnTta1rmPehUw7-g9NgnAxcnG3dxLpILI",
  authDomain: "videocallapp-4fbc2.firebaseapp.com",
  databaseURL: "https://videocallapp-4fbc2-default-rtdb.firebaseio.com",
  projectId: "videocallapp-4fbc2",
  storageBucket: "videocallapp-4fbc2.appspot.com",
  messagingSenderId: "1061542732473",
  appId: "1:1061542732473:web:66874e5f5b1320bd773168",
  measurementId: "G-YVXMLM0C8X",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth(app);
const db = getFirestore();

const messaging = getMessaging(app);
// const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
export { auth, db, messaging, storage };
