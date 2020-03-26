
import firebase from 'firebase'; 
firebase.initializeApp({
  apiKey: "AIzaSyCGyuemxxqqliMVT-ZxSvdUlkJ_pGlJ77Q",
  authDomain: "hocup-info.firebaseapp.com",
  databaseURL: "https://hocup-info.firebaseio.com",
  projectId: "hocup-info",
  storageBucket: "hocup-info.appspot.com",
  messagingSenderId: "665508187276",
  appId: "1:665508187276:web:d3696945e412d2475effa9",
  measurementId: "G-WT6QQDJL2S"
});
firebase.analytics();
export const DB = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;