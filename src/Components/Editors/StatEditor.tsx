import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IStatEditorProps<T> {
	value: number;
	prop: keyof T;
	handleUpdate: (prop: keyof T, value: number) => void;
	modifier: string | null;
}

const StatEditor = <T,>({
	value,
	prop,
	handleUpdate,
	modifier,
}: IStatEditorProps<T>) => {
	const [formValue, setFormValue] = useState<number>(value);
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val: any = event.target.value;
		setFormValue(parseInt(val));

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		const newTimeoutId = setTimeout(() => {
			handleUpdate(prop, formValue);
		}, 5000);

		setTimeoutId(newTimeoutId);
	};

	useEffect(() => {
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	return (
		<TextField
			name={prop as string}
			label={String(prop).toUpperCase()}
			variant='outlined'
			inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
			fullWidth
			onChange={handleChange}
			value={value}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<strong>{modifier}</strong>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default StatEditor;
