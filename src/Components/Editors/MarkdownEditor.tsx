import MDEditor from '@uiw/react-md-editor';
import React, { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LoadingIcon from '../../Shared/LoadingIcon';

interface IMarkdownEditorProps<T> {
	value: string;
	submitting: boolean;
	prop: keyof T;
	handleUpdate: (prop: keyof T, value: string) => void;
	title: string;
}

const MarkdownEditor = <T,>({
	value,
	submitting,
	prop,
	handleUpdate,
	title,
}: IMarkdownEditorProps<T>) => {
	const [formValue, setFormValue] = useState<string>('');
	const [editing, setEditing] = useState<boolean>(false);

	const handleChange = (
		val?: string | undefined,
		event?: React.ChangeEvent<HTMLTextAreaElement> | undefined
	) => {
		setFormValue(val || '');
	};

	const handleEditingToggle = () => {
		setEditing(!editing);
	};

	const handleSave = async () => {
		await handleUpdate(prop, formValue);
		handleEditingToggle();
	};

	useEffect(() => {
		if (value) {
			setFormValue(value);
		}
	}, [value]);

	return (
		<>
			<Box component='span' style={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant='body1' fontWeight='bold'>
					{title}
				</Typography>{' '}
				{editing ? (
					<IconButton
						color='secondary'
						onClick={handleSave}
						disabled={submitting}
					>
						<span style={{ fontSize: '16px' }}>
							<LoadingIcon
								icon={<SaveIcon fontSize='inherit' />}
								loading={submitting}
							/>
						</span>
					</IconButton>
				) : (
					<IconButton color='primary' onClick={handleEditingToggle}>
						<span style={{ fontSize: '16px' }}>
							<EditIcon fontSize='inherit' />
						</span>
					</IconButton>
				)}
			</Box>
			{editing ? (
				<div data-color-mode='light'>
					<MDEditor
						value={formValue}
						onChange={handleChange}
						preview='edit'
						previewOptions={{
							rehypePlugins: [[rehypeSanitize]],
						}}
					/>
				</div>
			) : (
				<ReactMarkdown>{formValue}</ReactMarkdown>
			)}
		</>
	);
};

export default MarkdownEditor;
