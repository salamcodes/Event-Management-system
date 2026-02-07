import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB-xdu6WdJHwp_XIUo5xREA2sZphBS1zgI",
    authDomain: "event-management-system-9c128.firebaseapp.com",
    projectId: "event-management-system-9c128",
    storageBucket: "event-management-system-9c128.firebasestorage.app",
    messagingSenderId: "989608410484",
    appId: "1:989608410484:web:c02f987c6bcdf9059fc021"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);