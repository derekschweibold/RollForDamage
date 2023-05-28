import React, { useState } from 'react';
import ICharacter from '../../Interfaces/ICharacter';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ValueEditor from '../Editors/ValueEditor';
import LoadingIcon from '../../Shared/LoadingIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StatBlock from '../StatBlock';
import StatValue from '../StatValue';

interface ICharacterProps {
	character: ICharacter;
	handleDelete: (id: string) => void;
	handleChange: (id: string, data: ICharacter) => void;
	handleNewFrom: (character: ICharacter) => void;
}

const Character: React.FC<ICharacterProps> = ({
	character,
	handleDelete,
	handleChange,
	handleNewFrom,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [saving, setSaving] = useState<boolean>(false);
	const [accordion, setAccordion] = useState<boolean>(false);

	async function deleteCharacter() {
		setLoading(true);
		await handleDelete(character.id ?? 'error');
		setLoading(false);
	}

	async function updateCharacter(
		prop: keyof ICharacter,
		value: string | number
	) {
		setSaving(true);
		const updatedCharacter: ICharacter = { ...character };
		updatedCharacter[prop] = value as never;

		await handleChange(character.id ?? 'error', updatedCharacter);
		setSaving(false);
	}

	const handleAccordion = () => {
		setAccordion(!accordion);
	};

	return (
		<Paper>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography variant='body1'>
								<ValueEditor
									value={character.name}
									prop='name'
									handleUpdate={updateCharacter}
									submitting={saving}
								/>
							</Typography>
						</TableCell>
						<TableCell align='right'>
							<IconButton
								onClick={deleteCharacter}
								size='small'
								disabled={loading}
								color='secondary'
							>
								<LoadingIcon
									icon={<DeleteIcon fontSize='small' />}
									loading={loading}
								/>
							</IconButton>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<StatValue>
								<strong>HP:</strong>&nbsp;
								<ValueEditor
									value={character.hpTotal}
									prop='hpTotal'
									handleUpdate={updateCharacter}
									submitting={saving}
								/>
							</StatValue>
						</TableCell>
						<TableCell align='right'>
							<Button
								size='small'
								variant='outlined'
								onClick={() => handleNewFrom(character)}
							>
								Create From
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2} padding='none' sx={{ borderBottom: 0 }}>
							<Accordion
								expanded={accordion}
								onChange={handleAccordion}
								sx={{
									border: 0,
								}}
							>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									{accordion
										? 'Collapse Notes and Stats'
										: 'View Notes and Stats'}
								</AccordionSummary>
								<AccordionDetails sx={{ background: '#f5f5f5' }}>
									<Typography variant='subtitle1' fontWeight='bold'>
										Notes
									</Typography>
									<Divider sx={{ my: 2 }} />
									<Typography variant='body2'>
										<ValueEditor
											value={character.notes ? character.notes : 'Add notes'}
											prop='notes'
											handleUpdate={updateCharacter}
											submitting={saving}
										/>
									</Typography>
									<Typography
										variant='subtitle1'
										sx={{ mt: 3 }}
										fontWeight='bold'
									>
										Stat Block
									</Typography>
									<Divider sx={{ my: 2 }} />
									<StatBlock
										formData={character.formData ?? ''}
										handleUpdate={updateCharacter}
									/>
								</AccordionDetails>
							</Accordion>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
};

export default Character;
