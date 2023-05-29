import React, { useState } from 'react';
import ICharacter from '../../Interfaces/ICharacter';
import { Grid, Typography } from '@mui/material';
import NewCharacterForm from './NewCharacterForm';
import { getAuth } from 'firebase/auth';
import ContentBox from '../ContentBox';
import Character from './Character';
import { ICharacterFormValues } from '../../Interfaces/FormValues';
import { deleteData, setData } from '../../lib/DataHelpers';

interface ICharactersTabProps {
	characters: ICharacter[];
	setCharacters: React.Dispatch<React.SetStateAction<ICharacter[]>>;
	loading: boolean;
}

interface INewCharacterFormState {
	submitting: boolean;
	newFrom?: ICharacter;
}

const CharactersTab: React.FC<ICharactersTabProps> = ({
	characters,
	setCharacters,
	loading,
}) => {
	const [formState, setFormState] = useState<INewCharacterFormState>({
		submitting: false,
	});

	async function handleAdd(
		event: React.FormEvent<HTMLFormElement>,
		formValues: ICharacterFormValues
	) {
		event.preventDefault();

		const auth = getAuth();
		const userID = auth.currentUser?.uid;

		if (userID) {
			setFormState({ ...formState, submitting: true });
			const newCharacter: ICharacter = {
				userID: userID,
				name: formValues.name,
				hpTotal: formValues.hpTotal ? formValues.hpTotal : 0,
				formData: formValues.formData ? formValues.formData : '',
				notes: formValues.notes ? formValues.notes : '',
			};

			await setData('characters', newCharacter);
			setFormState({ ...formState, submitting: false });

			if (characters) {
				const charactersCopy: ICharacter[] = [...characters];
				charactersCopy.push(newCharacter);

				setCharacters(charactersCopy);
			} else {
				setCharacters([newCharacter]);
			}
		}
	}

	async function handleDelete(id: string) {
		if (id) {
			await deleteData('characters', id);

			if (characters.length > 1) {
				const charactersCopy: ICharacter[] = [...characters];
				const index = charactersCopy.map((x) => x.id).indexOf(id);
				charactersCopy.splice(index, 1);

				setCharacters(charactersCopy);
			} else {
				setCharacters([]);
			}
		}
	}

	async function handleChange(id: string, data: ICharacter) {
		if (id) {
			await setData('characters', data, true);

			if (characters.length > 1) {
				const charactersCopy: ICharacter[] = [...characters];
				const index = charactersCopy.map((x) => x.id).indexOf(id);

				if (index !== -1) {
					charactersCopy[index] = data;
				}

				setCharacters(charactersCopy);
			} else {
				setCharacters([data]);
			}
		}
	}

	function handleNewFrom(character: ICharacter) {
		setFormState({ ...formState, newFrom: character });
	}

	return (
		<>
			<ContentBox title='Character Library' loading={loading} lgColWidth={7}>
				<Grid container spacing={1}>
					{characters?.length > 0 &&
						characters.map((x) => (
							<React.Fragment key={`${x.id}-${x.name}-${x.hpTotal}`}>
								<Grid item xs={12}>
									<Character
										character={x}
										handleDelete={handleDelete}
										handleChange={handleChange}
										handleNewFrom={handleNewFrom}
									/>
								</Grid>
							</React.Fragment>
						))}
					{characters?.length === 0 && (
						<Grid item xs={12}>
							<Typography variant='body1'>
								You haven't added any characters yet.
							</Typography>
						</Grid>
					)}
				</Grid>
			</ContentBox>
			<ContentBox title='Add New Character' loading={loading} lgColWidth={5}>
				<NewCharacterForm
					handleAdd={handleAdd}
					submitting={formState.submitting}
					createFrom={formState.newFrom}
				/>
			</ContentBox>
		</>
	);
};

export default CharactersTab;
