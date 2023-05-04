import * as app from "firebase/app";
import * as auth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import * as storage from 'firebase/storage'
import * as database from 'firebase/database'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXelxFP9GVMAz_VF54yVPSEk0bS9JDoT0",
  authDomain: "neutron-expo.firebaseapp.com",
  databaseURL: "https://neutron-expo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "neutron-expo",
  storageBucket: "neutron-expo.appspot.com",
  messagingSenderId: "611788892898",
  appId: "1:611788892898:web:8a3948fd6ca9131cbdccbb",
  measurementId: "G-K6BY8CN4TL",
};

export const sessionTTL = 60 * 60 * 24 * 7;

// Initialize Firebase



export const fbApp = app.initializeApp(firebaseConfig);
export const fbAuth = auth.getAuth(fbApp)
export const fbDb = database.getDatabase(fbApp);
export const fbFirestore = firestore.getFirestore(fbApp);

// export const fbProvider = new FacebookAuthProvider();
// export const phoneProvider = new PhoneAuthProvider(auth);
// export const emailProvider = new EmailAuthProvider();


// oAuth2Client.getToken(code, (err, token) => {
//   if (err) return console.error('Error retrieving access token', err);
//   oAuth2Client.setCredentials(token);
//   // Store the token to disk for later program executions
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//       if (err) return console.error(err);
//       
//   });
//   callback(oAuth2Client);
// });