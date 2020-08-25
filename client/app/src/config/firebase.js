import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA61KAfWj9zGd7-FkQ8Z0EDeiiuRiGjofg',
  authDomain: 'uet-pharma.firebaseapp.com',
  databaseURL: 'https://uet-pharma.firebaseio.com',
  projectId: 'uet-pharma',
  storageBucket: 'uet-pharma.appspot.com',
  messagingSenderId: '597823422132',
  appId: '1:597823422132:web:26941a0d10c978026721e1',
  measurementId: 'G-8WXPV149PG',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
