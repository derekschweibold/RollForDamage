import { ICharacterInit } from './IEncounter';

export interface ICharacterFormValues {
	name: string;
	hpTotal: number;
	data?: string;
	notes?: string;
	formData?: string;
}

export interface IEncounterFormValues {
	name: string;
	characters: ICharacterInit[];
}
