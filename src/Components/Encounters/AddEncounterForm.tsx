import { Box, Button, TextField, FormLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LoadingIcon from '../../Shared/LoadingIcon';
import { IEncounterFormValues } from '../../Interfaces/FormValues';
import ICharacter from '../../Interfaces/ICharacter';
import EncounterCharacter from './EncounterCharacter';
import { ICharacterInit } from '../../Interfaces/IEncounter';

interface IAddEncounterFormProps {
	handleAdd: (
		event: React.FormEvent<HTMLFormElement>,
		formValues: IEncounterFormValues
	) => void;
	submitting: boolean;
	characters: ICharacter[];
}

const AddEncounterForm: React.FC<IAddEncounterFormProps> = ({
	handleAdd,
	submitting,
	characters,
}) => {
	const [formValues, setFormValues] = useState<IEncounterFormValues>({
		name: '',
		characters: [],
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = event.target.value;
		setFormValues({ ...formValues, name: value });
	};

	const handleAddCharacters = (characters: ICharacterInit[]) => {
		const arrCopy: ICharacterInit[] = [...formValues.characters];
		arrCopy.push(...characters);
		setFormValues({ ...formValues, characters: arrCopy });
	};

	return (
		<Box component='form' onSubmit={(event) => handleAdd(event, formValues)}>
			<Box sx={{ mb: 2 }}>
				<TextField
					name='name'
					label='Encounter Name'
					variant='outlined'
					size='small'
					fullWidth
					required
					disabled={submitting}
					onChange={handleChange}
					value={formValues.name}
				/>
			</Box>
			<Box sx={{ mb: 2, maxHeight: '320px', overflowX: 'auto' }}>
				<FormLabel>Select Characters:</FormLabel>
				{characters.map((character) => (
					<Box key={character.id} sx={{ my: 1 }}>
						<EncounterCharacter
							character={character}
							characterState={formValues.characters}
							setCharacters={handleAddCharacters}
							submitting={submitting}
						/>
					</Box>
				))}
			</Box>
			<Button
				type='submit'
				variant='contained'
				fullWidth
				disabled={submitting}
				size='large'
			>
				<LoadingIcon icon={'Save New Encounter'} loading={submitting} />
			</Button>
		</Box>
	);
};

export default AddEncounterForm;
