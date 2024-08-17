import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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
export { storage };
