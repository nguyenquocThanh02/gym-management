import { toast } from "sonner";

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCnTta1rmPehUw7-g9NgnAxcnG3dxLpILI",
  authDomain: "videocallapp-4fbc2.firebaseapp.com",
  databaseURL: "https://videocallapp-4fbc2-default-rtdb.firebaseio.com",
  projectId: "videocallapp-4fbc2",
  storageBucket: "videocallapp-4fbc2.appspot.com",
  messagingSenderId: "1061542732473",
  appId: "1:1061542732473:web:66874e5f5b1320bd773168",
  measurementId: "G-YVXMLM0C8X",
});

// const messaging = firebase.messaging();
const messaging = typeof window !== "undefined" ? firebase.messaging() : null;
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
