// Імпорт модулів Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const configuration = {
  apiKey: "AIzaSyDASFAmS4w1kTrMGjc2kUgm4h12c-0I-a8",
  authDomain: "newsapp-47bdb.firebaseapp.com",
  projectId: "newsapp-47bdb",
  storageBucket: "newsapp-47bdb.appspot.com",
  messagingSenderId: "136419846287",
  appId: "1:136419846287:web:2f33845ca33193bee968fa"
};

const app = initializeApp(configuration);

const database = getFirestore(app);

export default database;
