import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ICharacter from '../../Interfaces/ICharacter';
import { ICharacterInit } from '../../Interfaces/IEncounter';
import generateGUID from '../../Shared/GenerateGuid';

interface IEncounterCharacterProps {
	character: ICharacter;
	characterState: ICharacterInit[];
	setCharacters: (characters: ICharacterInit[]) => void;
	submitting: boolean;
}

const EncounterCharacter: React.FC<IEncounterCharacterProps> = ({
	character,
	characterState,
	setCharacters,
	submitting,
}) => {
	const [count, setCount] = useState<number>(0);

	const handleDecrement = () => {
		if (count === 0) return;
		setCount(count - 1);

		const characterArray: ICharacterInit[] = [...characterState];
		characterArray.shift();
		setCharacters(characterArray);
	};

	const handleIncrement = () => {
		setCount(count + 1);

		const characterArray: ICharacterInit[] = [];
		for (let index = 0; index < count; index++) {
			const randomNumber: string = generateGUID();
			const newCharacter: ICharacterInit = {
				initiative: 0,
				id: character.id ?? '',
				eid: `${character.id ?? ''}-${randomNumber}`,
				color: '#e0e0e0',
				hpCurrent: character.hpTotal,
			};
			characterArray.push(newCharacter);
		}
		setCharacters(characterArray);
	};

	return (
		<Grid
			container
			spacing={2}
			justifyContent='space-between'
			alignItems='center'
			sx={{ px: 1 }}
		>
			<Grid item xs>
				<Typography variant='body2'>{character.name}</Typography>
			</Grid>
			<Grid item xs='auto'>
				<Box sx={{ background: '#e0e0e0', px: 2, borderRadius: '5px' }}>
					<Typography variant='body1'>{count}</Typography>
				</Box>
			</Grid>
			<Grid item xs='auto'>
				<ButtonGroup>
					<Button
						variant='outlined'
						color='secondary'
						size='small'
						onClick={handleDecrement}
						disabled={submitting}
					>
						-
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						size='small'
						onClick={handleIncrement}
						disabled={submitting}
					>
						+
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	);
};

export default EncounterCharacter;
