import React, { useState } from 'react';
import IEncounter, { ICharacterInit } from '../../Interfaces/IEncounter';
import ContentBox from '../ContentBox';
import ICharacter from '../../Interfaces/ICharacter';
import AddEncounterForm from './AddEncounterForm';
import { IEncounterFormValues } from '../../Interfaces/FormValues';
import { getAuth } from 'firebase/auth';
import { deleteData, setData } from '../../lib/DataHelpers';

interface IEncountersTabProps {
	encounters: IEncounter[];
	characters: ICharacter[];
	setEncounters: React.Dispatch<React.SetStateAction<IEncounter[]>>;
	loading: boolean;
}

const EncountersTab: React.FC<IEncountersTabProps> = ({
	encounters,
	characters,
	setEncounters,
	loading,
}) => {
	const [formState, setFormState] = useState<boolean>(false);

	async function handleAdd(
		event: React.FormEvent<HTMLFormElement>,
		formValues: IEncounterFormValues
	) {
		event.preventDefault();

		const auth = getAuth();
		const userID = auth.currentUser?.uid;

		const sortedArray: ICharacterInit[] = formValues.characters.sort(
			(a, b) => b.initiative - a.initiative
		);

		if (userID) {
			setFormState(true);
			const newEncounter: IEncounter = {
				userID: userID,
				name: formValues.name,
				up: sortedArray[0].eid,
				open: true,
				round: 1,
				turn: 1,
				characters: sortedArray,
			};

			await setData('encounters', newEncounter);
			setFormState(false);

			if (characters) {
				const encounterCopy: IEncounter[] = [...encounters];
				encounterCopy.push(newEncounter);

				setEncounters(encounterCopy);
			} else {
				setEncounters([newEncounter]);
			}
		}
	}

	async function handleDelete(id: string) {
		if (id) {
			await deleteData('encounters', id);

			if (encounters.length > 1) {
				const encountersCopy: IEncounter[] = [...encounters];
				const index = encountersCopy.map((x) => x.id).indexOf(id);
				encountersCopy.splice(index, 1);

				setEncounters(encountersCopy);
			} else {
				setEncounters([]);
			}
		}
	}

	async function handleChange(id: string, data: IEncounter) {
		if (id) {
			await setData('encounters', data, true);

			if (encounters.length > 1) {
				const encounterCopy: IEncounter[] = [...encounters];
				const index = encounterCopy.map((x) => x.id).indexOf(id);

				if (index !== -1) {
					encounterCopy[index] = data;
				}

				setEncounters(encounterCopy);
			} else {
				setEncounters([data]);
			}
		}
	}

	return (
		<>
			<ContentBox title='Add an Encounter' loading={loading}>
				<AddEncounterForm
					handleAdd={handleAdd}
					submitting={formState}
					characters={characters}
				/>
			</ContentBox>
		</>
	);
};

export default EncountersTab;
