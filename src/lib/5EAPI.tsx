import { Typography } from '@mui/material';
import { CR } from '../Enums/CR';
import IAPICharacterSearchRes, {
	IAPICharacter,
} from '../Interfaces/IAPICharacterRes';
import IKeywordSearchRes, {
	IConditionRes,
	IDamageTypesRes,
	IMagicSchoolsRes,
	IRuleSectionsRes,
	IRulesRes,
	ISpellsRes,
} from '../Interfaces/IKeywordSearchRes';

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

export async function queryKeywords(
	keyword: string
): Promise<IKeywordSearchRes[]> {
	const lowercaseString = keyword.toLowerCase();
	const stringArray = lowercaseString.split(' ');
	const joinedString = stringArray.join('-');

	async function queryEndpoint<T extends IKeywordSearchRes>(
		url: string,
		transformFn: (data: any) => T
	): Promise<T[]> {
		const response = await fetch(url);

		if (response.ok) {
			const responseData = await response.json();
			const responseObj: T[] = [transformFn(responseData)];

			return responseObj;
		} else {
			return [];
		}
	}

	async function conditions(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/conditions/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(
			url,
			(responseData: IConditionRes) => ({
				name: responseData.name,
				description: responseData.desc.map((x) => (
					<Typography variant='body2' sx={{ mb: 1 }}>
						{x}
					</Typography>
				)),
			})
		);
	}

	async function damageTypes(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/damage-types/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(
			url,
			(responseData: IDamageTypesRes) => ({
				name: responseData.name,
				description: responseData.desc.map((x) => (
					<Typography variant='body2' sx={{ mb: 1 }}>
						{x}
					</Typography>
				)),
			})
		);
	}

	async function magicSchools(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/magic-schools/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(
			url,
			(responseData: IMagicSchoolsRes) => ({
				name: responseData.name,
				description: (
					<Typography variant='body2'>{responseData.desc}</Typography>
				),
			})
		);
	}

	async function ruleSections(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/rule-sections/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(
			url,
			(responseData: IRuleSectionsRes) => ({
				name: responseData.name,
				description: (
					<Typography variant='body2'>{responseData.desc}</Typography>
				),
			})
		);
	}

	async function rules(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/rules/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(url, (responseData: IRulesRes) => ({
			name: responseData.name,
			description: <Typography variant='body2'>{responseData.desc}</Typography>,
		}));
	}

	async function spells(): Promise<IKeywordSearchRes[]> {
		const url = `https://www.dnd5eapi.co/api/spells/${joinedString}`;

		return queryEndpoint<IKeywordSearchRes>(
			url,
			(responseData: ISpellsRes) => ({
				name: responseData.name,
				description: (
					<Typography variant='body2'>{responseData.desc}</Typography>
				),
			})
		);
	}

	const [
		conditionQuery,
		damageTypesQuery,
		magicSchoolsQuery,
		ruleSectionsQuery,
		rulesQuery,
		spellsQuery,
	] = await Promise.all([
		conditions(),
		damageTypes(),
		magicSchools(),
		ruleSections(),
		rules(),
		spells(),
	]);

	const results = [
		conditionQuery,
		damageTypesQuery,
		magicSchoolsQuery,
		ruleSectionsQuery,
		rulesQuery,
		spellsQuery,
	];

	const combinedResults = results.flat();

	return combinedResults;
}
