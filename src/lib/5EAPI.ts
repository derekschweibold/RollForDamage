import { CR } from '../Enums/CR';
import IAPICharacterSearchRes, {
	IAPICharacter,
} from '../Interfaces/IAPICharacterRes';

export default async function getAPIResults(
	searchVal: string,
	cr?: CR
): Promise<IAPICharacterSearchRes> {
	const url = `https://www.dnd5eapi.co/api/monsters?${
		searchVal ? `name=${searchVal}` : ''
	}${cr === CR.ALL ? '' : `&challenge_rating=${cr}`}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return response.json();
}

export async function getAPICharacter(index: string): Promise<IAPICharacter> {
	const url = `https://www.dnd5eapi.co/api/monsters/${index}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return response.json();
}
