import React, { useEffect, useState } from 'react';
import { Grid, Tab, Tabs, Typography, IconButton, Box } from '@mui/material';
import ICharacter from '../Interfaces/ICharacter';
import IEncounter from '../Interfaces/IEncounter';
import EncountersTab from './Encounters/EncountersTab';
import CharactersTab from './Characters/CharactersTab';
import OpenEncounter from './Encounters/OpenEncounter';
import { getAuth, signOut } from 'firebase/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { getData, setData } from '../lib/DataHelpers';
import APIKeywordSearch from './APIKeywordSearch';
import CloseIcon from '@mui/icons-material/Close';

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

	const currentOpenEncounter: IEncounter | undefined = encounters?.find(
		(key, value) => key.id === state.tab
	);

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

	const handleRemoveTab = async (id: string) => {
		const selectedEncounter: IEncounter | undefined = encounters.find(
			(x) => x.id === id
		);
		if (selectedEncounter) {
			selectedEncounter.open = false;

			await setData('encounters', selectedEncounter, true);

			const encounterCopy: IEncounter[] = [...encounters];
			const index = encounterCopy.map((x) => x.id).indexOf(id);

			if (index !== -1) {
				encounterCopy[index] = selectedEncounter;
			}

			setEncounters(encounterCopy);
		}
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
							<IconButton onClick={handleSignOut} color='primary'>
								<small>
									<LogoutIcon fontSize='inherit' />
								</small>
							</IconButton>
						</Typography>
					</Grid>
					<Grid
						item
						xs='auto'
						sx={{
							textAlign: { md: 'center' },
							display: { xs: 'none', md: 'inline' },
						}}
					>
						<Typography variant='h5'>RollForDamage</Typography>
					</Grid>
					<Grid
						item
						xs
						sx={{
							textAlign: { xs: 'left' },
							display: { xs: 'inline', md: 'none' },
						}}
					>
						<Typography variant='h6'>RollForDamage</Typography>
					</Grid>
					<Grid item xs='auto' sx={{ display: { md: 'none' } }}>
						<Typography variant='caption'>
							Hello, {auth.currentUser?.displayName}
							<IconButton onClick={handleSignOut} color='primary'>
								<small>
									<LogoutIcon fontSize='inherit' />
								</small>
							</IconButton>
						</Typography>
					</Grid>
					<Grid item xs={12} md='auto'>
						<APIKeywordSearch />
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
					{!state.loading &&
						encounters
							?.filter((x) => x.open)
							.map((y) => (
								<Tab
									sx={{ pr: 1 }}
									label={
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											{y.name}{' '}
											<IconButton
												onClick={() => handleRemoveTab(y.id ?? '')}
												color='inherit'
												sx={{ ml: 1 }}
												size='small'
											>
												<CloseIcon fontSize='small' />
											</IconButton>
										</Box>
									}
									value={y.id}
								/>
							))}
				</Tabs>
			</Grid>
			<Grid item xs={12}>
				{state.tab === 'encounters' && (
					<Grid container spacing={4}>
						<EncountersTab
							encounters={encounters}
							characters={characters}
							loading={state.loading}
							setEncounters={setEncounters}
						/>
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
				{state.tab !== 'encounters' &&
					state.tab !== 'characters' &&
					currentOpenEncounter && (
						<OpenEncounter encounter={currentOpenEncounter} />
					)}
			</Grid>
		</Grid>
	);
};

export default Layout;
