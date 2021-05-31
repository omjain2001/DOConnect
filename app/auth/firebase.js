import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import { firebaseConfig } from "./config.firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
