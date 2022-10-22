import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAwMyvc1KWxmRLT2o5UL9E-ClcDzW0TrfA',
  authDomain: 'p2p-mining.firebaseapp.com',
  projectId: 'p2p-mining',
  storageBucket: 'p2p-mining.appspot.com',
  messagingSenderId: '170089826833',
  appId: '1:170089826833:web:17ece6515370500071bfb0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
