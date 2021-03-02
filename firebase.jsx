import firabase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC-WSgXQt-7xaVFMms4HRAkIbNFMtWzjic",
  authDomain: "slack-app-chat.firebaseapp.com",
  projectId: "slack-app-chat",
  storageBucket: "slack-app-chat.appspot.com",
  messagingSenderId: "879822709007",
  appId: "1:879822709007:web:07aa76793012fbad229e7a",
  measurementId: "G-DNJP3VZXZB"
};

firebase.initializeApp(firebaseConfig);

export default firabase