import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LoadingIcon from '../../Shared/LoadingIcon';
import { ICharacterFormValues } from '../../Interfaces/FormValues';
import APICharacterSearch from './APICharacterSearch';
import { ICharacterStatBlock } from '../../Interfaces/ICharacter';

interface INewCharacterFormProps {
	handleAdd: (
		event: React.FormEvent<HTMLFormElement>,
		formValues: ICharacterFormValues
	) => void;
	submitting: boolean;
	createFrom?: ICharacterFormValues;
}

const NewCharacterForm: React.FC<INewCharacterFormProps> = ({
	handleAdd,
	submitting,
	createFrom,
}) => {
	const [formValues, setFormValues] = useState<ICharacterFormValues>({
		name: '',
		hpTotal: 0,
		notes: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value: string | number = event.target.value;
		const name: string = event.target.name as keyof ICharacterFormValues;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSetFormData = (formData: ICharacterStatBlock) => {
		setFormValues({
			...formValues,
			formData: JSON.stringify(formData),
			name: formData.name,
			hpTotal: formData.hitPoints,
			notes: formData.description,
		});
	};

	const handleClearForm = () => {
		setFormValues({
			name: '',
			hpTotal: 0,
			notes: '',
			formData: '',
		});
	};

	useEffect(() => {
		if (createFrom) {
			setFormValues(createFrom);
		}
	}, [createFrom]);

	return (
		<Box component='form' onSubmit={(e) => handleAdd(e, formValues)}>
			<Box sx={{ mb: 2 }}>
				<APICharacterSearch handleSetFormData={handleSetFormData} />
			</Box>
			<Box sx={{ mb: 2 }}>
				<TextField
					name='name'
					label='Character Name'
					variant='outlined'
					size='small'
					fullWidth
					required
					disabled={submitting}
					onChange={handleChange}
					value={formValues.name}
				/>
			</Box>
			<Box sx={{ mb: 2 }}>
				<TextField
					name='hpTotal'
					label='Hit Points'
					variant='outlined'
					size='small'
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
					fullWidth
					required
					disabled={submitting}
					onChange={handleChange}
					value={formValues.hpTotal > 0 ? formValues.hpTotal : ''}
				/>
			</Box>
			<Box sx={{ mb: 2 }}>
				<TextField
					name='notes'
					label='Notes'
					variant='outlined'
					size='small'
					fullWidth
					multiline
					maxRows={15}
					disabled={submitting}
					onChange={handleChange}
					value={formValues.notes}
				/>
			</Box>
			<Button
				type='submit'
				variant='contained'
				fullWidth
				disabled={submitting}
				size='large'
			>
				<LoadingIcon icon={'Save New Character'} loading={submitting} />
			</Button>
			<Box sx={{ mt: 1, textAlign: 'center' }}>
				<Button size='small' color='secondary' onClick={handleClearForm}>
					Clear Form
				</Button>
			</Box>
		</Box>
	);
};

export default NewCharacterForm;
