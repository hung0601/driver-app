import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjqpMUvWaiAqyQsFbfsFxKVcrn-RZ2zzo",
  authDomain: "driver-app-16297.firebaseapp.com",
  databaseURL:
    "https://driver-app-16297-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "driver-app-16297",
  storageBucket: "driver-app-16297.appspot.com",
  messagingSenderId: "610373841711",
  appId: "1:610373841711:web:34c345390d416e4f8ce7da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const driverDB = getDatabase(app);
export default driverDB;
