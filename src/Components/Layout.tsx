import React, { useEffect, useState } from 'react';
import { Grid, Button, Tab, Tabs, Typography, IconButton } from '@mui/material';
import ICharacter from '../Interfaces/ICharacter';
import IEncounter from '../Interfaces/IEncounter';
import EncountersTab from './Encounters/EncountersTab';
import CharactersTab from './Characters/CharactersTab';
import OpenEncounter from './Encounters/OpenEncounter';
import { getAuth, signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { getData } from '../lib/DataHelpers';

interface ILayoutState {
	loading: boolean;
	tab: string;
}

const auth = getAuth();

const Layout: React.FC = () => {
	const [state, setState] = useState<ILayoutState>({
		loading: true,
		tab: 'encounters',
	});
	const [characters, setCharacters] = useState<ICharacter[]>([]);
	const [encounters, setEncounters] = useState<IEncounter[]>([]);

	// const currentOpenEncounter: IEncounter | undefined = encounters?.find(
	// 	(key, value) => key.id === state.tab
	// );

	async function getAppData() {
		setState({ ...state, loading: true });

		const characterData = await getData('characters');
		const encounterData = await getData('encounters');

		if (characterData)
			characterData.sort(
				(a: { name: number }, b: { name: number }) => b.name - a.name
			);
		if (encounterData)
			encounterData.sort(
				(a: { name: number }, b: { name: number }) => b.name - a.name
			);

		setCharacters(characterData as unknown as ICharacter[]);
		setEncounters(encounterData as unknown as IEncounter[]);

		setState({ ...state, loading: false });
	}

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setState({ ...state, tab: newValue });
	};

	const handleSignOut = () => {
		signOut(auth).then(() => {
			window.location.reload();
		});
	};

	useEffect(() => {
		getAppData();
	}, []);

	return (
		<Grid container spacing={4} sx={{ py: 3 }}>
			<Grid item xs={12} sx={{ color: 'white' }}>
				<Grid
					container
					justifyContent='space-between'
					alignItems='center'
					spacing={2}
				>
					<Grid item xs='auto' sx={{ display: { xs: 'none', md: 'inline' } }}>
						<Typography variant='caption'>
							Hello, {auth.currentUser?.displayName}
						</Typography>
					</Grid>
					<Grid item xs={12} md='auto' sx={{ textAlign: 'center' }}>
						<Typography variant='h5'>RollForDamage</Typography>
					</Grid>
					<Grid item xs='auto' sx={{ display: { md: 'none' } }}>
						<Typography variant='caption'>
							Hello, {auth.currentUser?.displayName}
						</Typography>
					</Grid>
					<Grid item xs='auto'>
						<IconButton onClick={handleSignOut} color='primary'>
							<LogoutIcon fontSize='inherit' />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Tabs
					value={state.tab}
					onChange={handleTabChange}
					variant='scrollable'
					scrollButtons='auto'
				>
					<Tab label='My Encounters' value='encounters' />
					<Tab label='My Characters' value='characters' />
					{/* {!state.loading &&
						encounters
							?.filter((x) => x.open)
							.map((y) => <Tab label={y.name} value={y.id} />)} */}
				</Tabs>
			</Grid>
			<Grid item xs={12}>
				{state.tab === 'encounters' && (
					<Grid container spacing={4}>
						<EncountersTab encounters={encounters} loading={state.loading} />
					</Grid>
				)}
				{state.tab === 'characters' && (
					<Grid container spacing={4}>
						<CharactersTab
							characters={characters}
							setCharacters={setCharacters}
							loading={state.loading}
						/>
					</Grid>
				)}
				{/* {state.tab !== 'encounters' &&
					state.tab !== 'characters' &&
					currentOpenEncounter && (
						<OpenEncounter encounter={currentOpenEncounter} />
					)} */}
			</Grid>
		</Grid>
	);
};

export default Layout;
