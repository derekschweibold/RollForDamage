import React, { useEffect, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { Container, ThemeProvider } from '@mui/material';
import Layout from './Components/Layout';
import { theme } from './Shared/Theme';
import firebaseApp from './FirebaseInit';

function App() {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	function handleAuth() {
		const auth = getAuth(firebaseApp);
		const provider = new GoogleAuthProvider();

		auth.onAuthStateChanged(function (user) {
			if (user) {
				setLoggedIn(true);
			} else {
				signInWithRedirect(auth, provider);
			}
		});
	}

	useEffect(handleAuth, []);

	if (loggedIn) {
		return (
			<ThemeProvider theme={theme}>
				<Container maxWidth='lg'>
					<Layout />
				</Container>
			</ThemeProvider>
		);
	} else {
		return <></>;
	}
}

export default App;
