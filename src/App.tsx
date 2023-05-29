import React, { useEffect, useState } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import Layout from './Components/Layout';
import { theme } from './Shared/Theme';
import firebaseApp from './FirebaseInit';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

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
		return (
			<Box
				sx={{
					width: '100%',
					height: '90vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					color: 'white',
				}}
			>
				<Typography variant='h5' sx={{ mb: 3 }}>
					Logging you in...
				</Typography>
				<HourglassEmptyIcon fontSize='large' className='animate-rotate' />
			</Box>
		);
	}
}

export default App;
