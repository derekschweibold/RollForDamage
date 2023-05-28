import React, { useEffect, useState } from 'react';
import { Box, IconButton, Popover, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import LoadingIcon from '../../Shared/LoadingIcon';

interface IEditableStringProps<T> {
	value: string | number;
	submitting: boolean;
	prop: keyof T;
	handleUpdate: (prop: keyof T, value: string | number) => void;
}

const ValueEditor = <T,>({
	value,
	submitting,
	prop,
	handleUpdate,
}: IEditableStringProps<T>) => {
	const [formValue, setFormValue] = useState<string | number>('');
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val: any = event.target.value;
		setFormValue(val);
	};

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSave = async () => {
		await handleUpdate(prop, formValue);
		handleClose();
	};

	const open = Boolean(anchorEl);
	const id = open ? 'val-edit-popover' : undefined;

	useEffect(() => {
		if (value) {
			setFormValue(value);
		}
	}, [value]);

	return (
		<>
			<Box component='span' style={{ display: 'flex', alignItems: 'center' }}>
				{value}{' '}
				<IconButton
					color='primary'
					onClick={handleOpen}
					disabled={Boolean(anchorEl)}
				>
					<span style={{ fontSize: '16px' }}>
						<EditIcon fontSize='inherit' />
					</span>
				</IconButton>
			</Box>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<Box
					component='form'
					onSubmit={() => handleUpdate(prop, formValue)}
					sx={{ display: 'flex', alignItems: 'center', p: 1 }}
				>
					<TextField
						label='Edit'
						value={formValue}
						variant='outlined'
						size='small'
						onChange={handleChange}
					/>
					<IconButton
						color='primary'
						onClick={handleSave}
						sx={{ ml: 1 }}
						disabled={submitting}
					>
						<LoadingIcon
							icon={<CheckIcon fontSize='small' />}
							loading={submitting}
						/>
					</IconButton>
					<IconButton
						color='secondary'
						onClick={handleClose}
						sx={{ ml: 1 }}
						disabled={submitting}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				</Box>
			</Popover>
		</>
	);
};

export default ValueEditor;
