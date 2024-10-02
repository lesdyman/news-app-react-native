import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  FIREBASE_ApiKey,
  FIREBASE_AuthDomain,
  FIREBASE_ProjectId,
  FIREBASE_StorageBucket,
  FIREBASE_MessagingSenderId,
  FIREBASE_AppId
} from '@env';

const configuration = {
  apiKey: FIREBASE_ApiKey,
  authDomain: FIREBASE_AuthDomain,
  projectId: FIREBASE_ProjectId,
  storageBucket: FIREBASE_StorageBucket,
  messagingSenderId: FIREBASE_MessagingSenderId,
  appId: FIREBASE_AppId,
};

const app = initializeApp(configuration);

const database = getFirestore(app);

export default database;
