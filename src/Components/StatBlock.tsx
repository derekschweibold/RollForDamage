import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ValueEditor from './Editors/ValueEditor';
import StatValue from './StatValue';
import { ICharacterStatBlock } from '../Interfaces/ICharacter';
import MarkdownEditor from './Editors/MarkdownEditor';
import StatEditor from './Editors/StatEditor';

interface IStatBlockProps<T> {
	formData: string;
	handleUpdate: (prop: keyof T, value: string | number) => void;
}

const StatBlock = <T,>({ formData, handleUpdate }: IStatBlockProps<T>) => {
	const [data, setData] = useState<ICharacterStatBlock>();
	const [saving, setSaving] = useState<boolean>(false);

	async function handleChange(
		prop: keyof ICharacterStatBlock,
		value: string | number
	) {
		setSaving(true);

		const updatedFormData: ICharacterStatBlock = {
			...(data as ICharacterStatBlock),
		};

		if (updatedFormData !== undefined) {
			updatedFormData[prop] = value as never;
		}

		setData(updatedFormData);
	}

	const modifierCalc = (modifier?: number) => {
		if (modifier && modifier > 0) {
			const calc: number = Math.floor((modifier - 10) / 2);
			const symbol: boolean = String(calc).includes('-');
			return `${symbol ? '' : '+'}${Math.floor((modifier - 10) / 2)}`;
		} else {
			return null;
		}
	};

	useEffect(() => {
		if (formData) setData(JSON.parse(formData));
	}, [formData]);

	useEffect(() => {
		// This is a little weird, but it's needed to stringify the markdown correctly
		async function handleSave() {
			const stringData: string = JSON.stringify(data) as never;
			await handleUpdate('formData' as keyof T, stringData);

			setSaving(false);
		}

		handleSave();
	}, [data]);

	return (
		<Grid container spacing={{ xs: 0.25, md: 1 }}>
			<Grid item xs={12}>
				<Grid container spacing={1} sx={{ py: 2 }}>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.str ?? 0}
							prop='str'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.str)}
						/>
					</Grid>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.dex ?? 0}
							prop='dex'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.dex)}
						/>
					</Grid>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.con ?? 0}
							prop='con'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.con)}
						/>
					</Grid>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.int ?? 0}
							prop='int'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.int)}
						/>
					</Grid>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.wis ?? 0}
							prop='wis'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.wis)}
						/>
					</Grid>
					<Grid item xs={4} lg={2}>
						<StatEditor
							value={data?.cha ?? 0}
							prop='cha'
							handleUpdate={handleChange}
							modifier={modifierCalc(data?.cha)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatValue>
					<strong>Armor Class:</strong>&nbsp;
					<ValueEditor
						value={data?.armorClass ?? ''}
						submitting={saving}
						prop='armorClass'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatValue>
					<strong>Armor Type:</strong>&nbsp;
					<ValueEditor
						value={data?.armorType ?? ''}
						submitting={saving}
						prop='armorType'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatValue>
					<strong>Hit Dice:</strong>&nbsp;
					<ValueEditor
						value={data?.hitDice ?? ''}
						submitting={saving}
						prop='hitDice'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12} md={6}>
				<StatValue>
					<strong>Speed:</strong>&nbsp;
					<ValueEditor
						value={data?.speed ?? ''}
						submitting={saving}
						prop='speed'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12}>
				<StatValue>
					<strong>Saving Throws:</strong>&nbsp;
					<ValueEditor
						value={data?.savingThrows ?? ''}
						submitting={saving}
						prop='savingThrows'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12}>
				<StatValue>
					<strong>Skills:</strong>&nbsp;
					<ValueEditor
						value={data?.skills ?? ''}
						submitting={saving}
						prop='skills'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12}>
				<StatValue>
					<strong>Senses:</strong>&nbsp;
					<ValueEditor
						value={data?.senses ?? ''}
						submitting={saving}
						prop='senses'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12}>
				<StatValue>
					<strong>Languages:</strong>&nbsp;
					<ValueEditor
						value={data?.languages ?? ''}
						submitting={saving}
						prop='languages'
						handleUpdate={handleChange}
					/>
				</StatValue>
			</Grid>
			<Grid item xs={12} sx={{ mt: 2 }}>
				<MarkdownEditor
					value={data?.abilities ?? ''}
					submitting={saving}
					prop='abilities'
					handleUpdate={handleChange}
					title='Abilities:'
				/>
			</Grid>
			<Grid item xs={12} sx={{ mt: 2 }}>
				<MarkdownEditor
					value={data?.actions ?? ''}
					submitting={saving}
					prop='actions'
					handleUpdate={handleChange}
					title='Actions:'
				/>
			</Grid>
			<Grid item xs={12} sx={{ mt: 2 }}>
				<MarkdownEditor
					value={data?.legendaryActions ?? ''}
					submitting={saving}
					prop='legendaryActions'
					handleUpdate={handleChange}
					title='Legendary Actions:'
				/>
			</Grid>
		</Grid>
	);
};

export default StatBlock;
