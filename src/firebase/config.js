import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDh4OaDMI9LCcghGpmWaeBOh1xmlJ1PvkY",
  authDomain: "udemy--vue-firebase-sites.firebaseapp.com",
  projectId: "udemy--vue-firebase-sites",
  storageBucket: "udemy--vue-firebase-sites.appspot.com",
  messagingSenderId: "601060018290",
  appId: "1:601060018290:web:713d3026cb69b208c69aeb"
};

//init firebase
firebase.initializeApp(firebaseConfig)


const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp, projectAuth }