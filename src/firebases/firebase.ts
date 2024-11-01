import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { NotifyApis } from "@/services";
import { localStorageKey } from "@/constants/localStorage";

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
// const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
const vapidKey =
  "BEN4cBYouORE1HThOvBGvEbv1H9HyFi7bNEtYO0e04lGaOBEUO01L9yr8h9c8N2WhlkV4O-GSRC05mqa5eF3ai4";

const requestFCMToken = async () => {
  return Notification.requestPermission()
    .then(async (permission) => {
      const userId = localStorage.getItem(localStorageKey?.userId) || "";
      const role = localStorage.getItem(localStorageKey?.role) || "user";
      const token = await getToken(messaging, { vapidKey });

      if (permission === "granted") {
        await NotifyApis.addDiscount({
          token: token,
          userId: userId,
          role: role,
        });
        return token;
      } else {
        throw new Error("Notification not granted");
      }
    })
    .catch((err) => {
      console.error("Error getting fcm token: ", err);
      throw err;
    });
};

const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, async (payload) => {
      resolve(payload);
    });
  });
};
export { auth, db, messaging, storage, requestFCMToken, onMessageListener };
