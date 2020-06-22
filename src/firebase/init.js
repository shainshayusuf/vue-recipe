import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCHAuQFBzcOMWGehRu2Wy-NzmpKUFECjSs",
  authDomain: "vue-recipe-project.firebaseapp.com",
  databaseURL: "https://vue-recipe-project.firebaseio.com",
  projectId: "vue-recipe-project",
  storageBucket: "vue-recipe-project.appspot.com",
  messagingSenderId: "192005489706",
  appId: "1:192005489706:web:dff7bdf368bba28c82ef53",
  measurementId: "G-Z86CCM4F22"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);



export default firebaseApp.firestore();