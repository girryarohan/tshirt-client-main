// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
// firebase config
// const config = {
//   apiKey: "AIzaSyAXJ1t9Ejh2_vOgmPPRjiV6bzcIKWfiQkM",
//   authDomain: "ecom-deadd.firebaseapp.com",
//   projectId: "ecom-deadd",
//   storageBucket: "ecom-deadd.appspot.com",
//   messagingSenderId: "905866893251",
//   appId: "1:905866893251:web:84bd976f9d5f62fd934f76",
//   measurementId: "G-4DM539LGK1",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAeLK4p_YkiUNzE8D_LpLQMyyEeJ4c64EE",
  authDomain: "tshirt-ecom-project.firebaseapp.com",
  projectId: "tshirt-ecom-project",
  storageBucket: "tshirt-ecom-project.appspot.com",
  messagingSenderId: "1086937042116",
  appId: "1:1086937042116:web:15754cc0fe60e7d2cd8d91",
  measurementId: "G-S9XF8K2NW9",
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Cloud Storage and get a reference to the service
export const storage = firebase.storage();

// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
