import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IKeywordSearchRes from '../Interfaces/IKeywordSearchRes';
import { queryKeywords } from '../lib/5EAPI';

const theme = createTheme({
	palette: {
		primary: {
			main: '#DE3163',
		},
		secondary: {
			main: '#005e70',
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'white',
							color: 'white',
						},
					},
					'& .MuiOutlinedInput-input': {
						color: 'white',
					},
					'& .MuiFormLabel-root': {
						color: 'white',
					},
				},
			},
		},
	},
});

const APIKeywordSearch = () => {
	const [searchVal, setSearchVal] = useState<string>('');
	const [searchRes, setSearchRes] = useState<IKeywordSearchRes[]>([]);
	const [dialog, setDialog] = useState<boolean>(false);

	async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = await queryKeywords(searchVal);

		setSearchRes(data);
		setDialog(true);
		setSearchVal('');
	}

	const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;

		setSearchVal(value);
	};

	const handleDialog = () => {
		setDialog(!dialog);
	};

	return (
		<>
			<Box
				component='form'
				onSubmit={handleSearch}
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<ThemeProvider theme={theme}>
					<TextField
						label='Keyword search'
						size='small'
						value={searchVal}
						onChange={handleUpdate}
						fullWidth
						sx={{ borderColor: '#fff', color: '#fff' }}
					/>
				</ThemeProvider>
				<Button type='submit' variant='contained' sx={{ ml: 2 }}>
					<SearchIcon fontSize='medium' />
				</Button>
			</Box>
			<Dialog open={dialog} onClose={handleDialog} maxWidth='sm' fullWidth>
				<DialogContent>
					{searchRes.length > 0 ? (
						searchRes.map((x) => (
							<>
								<Box key={x.name}>
									<Typography variant='body1' fontWeight='bold' sx={{ mb: 2 }}>
										{x.name}
									</Typography>
									{x.description}
								</Box>
								{searchRes.length > 1 && <Divider sx={{ my: 3 }} />}
							</>
						))
					) : (
						<Typography variant='body1' fontWeight='bold'>
							No results
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialog}
						color='secondary'
						variant='outlined'
						size='small'
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default APIKeywordSearch;
