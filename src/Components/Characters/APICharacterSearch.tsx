/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import getAPIResults, { getAPICharacter } from '../../lib/5EAPI';
import { CR } from '../../Enums/CR';
import {
	IAPICharacter,
	ICharacterSearchResData,
} from '../../Interfaces/IAPICharacterRes';
import { ICharacterStatBlock } from '../../Interfaces/ICharacter';
import { formatJSONToMarkdown } from '../../Shared/DataResponseHelpers';

interface IAPICharacterSearchProps {
	handleSetFormData: (character: ICharacterStatBlock) => void;
}

const APICharacterSearch: React.FC<IAPICharacterSearchProps> = ({
	handleSetFormData,
}) => {
	const [searchVal, setSearchVal] = useState<string>('');
	const [cr, setCr] = useState<CR>(CR.ALL);
	const [searchRes, setSearchRes] = useState<ICharacterSearchResData[]>([]);

	const crArray = Object.values(CR) as (number | string)[];
	const crValues = crArray.filter((value) =>
		value === 'All' ? typeof value === 'string' : typeof value === 'number'
	);

	const handleUpdate = (
		event: React.SyntheticEvent<Element, Event>,
		value: string | null
	) => {
		setSearchVal(value || '');
	};

	const handleCR = (event: SelectChangeEvent<CR>, child: React.ReactNode) => {
		const value: CR = event.target.value as CR;

		setCr(value);
	};

	async function handleSetForm() {
		const searchIndex: string =
			searchRes.find((x) => x.name === searchVal)?.index ?? 'error';
		const characterData: IAPICharacter = await getAPICharacter(searchIndex);

		const abilities: string = formatJSONToMarkdown(
			characterData.special_abilities
		);
		const actions: string = formatJSONToMarkdown(characterData.actions);
		const reactions: string = formatJSONToMarkdown(characterData.reactions);
		const legendaryActions: string = formatJSONToMarkdown(
			characterData.legendary_actions
		);

		const characterStatBlock: ICharacterStatBlock = {
			name: characterData.name,
			description: characterData.desc,
			armorClass: characterData.armor_class[0].value,
			armorType: `${
				characterData.armor_class[0].armor
					? `${characterData.armor_class[0].armor[0].name} armor`
					: ''
			}${
				characterData.armor_class[0].type
					? `${characterData.armor_class[0].type} armor`
					: ''
			}`,
			hitPoints: characterData.hit_points,
			hitDice: characterData.hit_points_roll,
			speed: `${characterData.speed.walk ? characterData.speed.walk : ''}${
				characterData.speed.swim ? `, swim ${characterData.speed.swim}` : ''
			}${characterData.speed.fly ? `, fly ${characterData.speed.fly}` : ''}${
				characterData.speed.burrow
					? `, burrow ${characterData.speed.burrow}`
					: ''
			}${
				characterData.speed.climb ? `, climb ${characterData.speed.climb}` : ''
			}`,
			str: characterData.strength,
			dex: characterData.dexterity,
			con: characterData.constitution,
			int: characterData.intelligence,
			wis: characterData.wisdom,
			cha: characterData.charisma,
			savingThrows: `${
				characterData.proficiencies[0]?.value
					? `CON +${characterData.proficiencies[0]?.value}`
					: ''
			}${
				characterData.proficiencies[1]?.value
					? `, INT +${characterData.proficiencies[1]?.value}`
					: ''
			}${
				characterData.proficiencies[2]?.value
					? `, WIS +${characterData.proficiencies[2]?.value}`
					: ''
			}`,
			skills: characterData.proficiencies
				.filter((x) => x.proficiency.index.includes('skill'))
				.map((y) => `${y.proficiency.name.replace('Skill: ', '')} +${y.value}`)
				.join(', '),
			senses: `Passive Perception ${characterData.senses.passive_perception}${
				characterData.senses.darkvision
					? `, Darkvision ${characterData.senses.darkvision}`
					: ''
			}${
				characterData.senses.blindsight
					? `, BlindSight ${characterData.senses.blindsight}`
					: ''
			}${
				characterData.senses.truesight
					? `, Truesight ${characterData.senses.truesight}`
					: ''
			}${
				characterData.senses.tremorsense
					? `, Tremorsense ${characterData.senses.tremorsense}`
					: ''
			}`,
			languages: characterData.languages ?? 'None',
			cr: characterData.challenge_rating,
			xp: characterData.xp,
			proficiencyBonus: 2 + (characterData.challenge_rating - 1) / 4,
			abilities: abilities,
			actions: actions,
			reactions: reactions,
			legendaryActions: legendaryActions,
			type: characterData.type,
			alignment: characterData.alignment,
			resistances: `${
				characterData.damage_resistances
					? `${characterData.damage_resistances.join(' damage, ')} damage`
					: 'none'
			} ${
				characterData.condition_immunities
					? `${characterData.condition_immunities
							.map((x) => x.name)
							.join(' condition, ')} condition`
					: 'none'
			}`,
			immunities: `${
				characterData.damage_immunities
					? `${characterData.damage_immunities.join(' damage, ')} damage`
					: 'none'
			}`,
		};

		handleSetFormData(characterStatBlock);
	}

	async function handleSearch() {
		const data = await getAPIResults(searchVal, cr);

		setSearchRes(data.results);
	}

	useEffect(() => {
		setTimeout(() => {
			handleSearch();
		}, 250);
	}, [searchVal, cr]);

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<Autocomplete
					options={searchRes.map((x) => x.name)}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Search for monster'
							size='small'
							fullWidth
							InputProps={{
								...params.InputProps,
								startAdornment: <SearchIcon fontSize='medium' sx={{ ml: 1 }} />,
							}}
						/>
					)}
					value={searchVal}
					onChange={handleUpdate}
					selectOnFocus
					clearOnBlur
					handleHomeEndKeys
					fullWidth
				/>
				<FormControl sx={{ width: '100px', ml: 2 }} size='small'>
					<InputLabel id='cr-label'>CR</InputLabel>
					<Select
						labelId='cr-label'
						value={cr}
						label='CR'
						onChange={handleCR}
						size='small'
						inputProps={{
							MenuProps: {
								sx: { maxHeight: '50%' },
							},
						}}
					>
						{crValues.map((x) => (
							<MenuItem key={x} value={x}>
								{x}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			{searchVal && (
				<Box sx={{ textAlign: 'center' }}>
					<Button onClick={handleSetForm}>Fill Form</Button>
				</Box>
			)}
		</>
	);
};

export default APICharacterSearch;
