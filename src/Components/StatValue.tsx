import React from 'react';
import { Typography } from '@mui/material';

interface IStatValueProps {
	children: React.ReactNode;
}

const StatValue: React.FC<IStatValueProps> = ({ children }) => {
	return (
		<Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
			{children}
		</Typography>
	);
};

export default StatValue;
