import 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBaUNYI1EH7U1FHd4TmailSp2x4xtVoRQw',
	authDomain: 'rollfordamage.app',
	projectId: 'rollforinitative-ec90d',
	storageBucket: 'rollforinitative-ec90d.appspot.com',
	messagingSenderId: '698718668618',
	appId: '1:698718668618:web:11e77e1ae59e135771a3b3',
};
// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
