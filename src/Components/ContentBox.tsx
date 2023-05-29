import { Box, Divider, Grid, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';

interface IContentBoxProps {
	title: string;
	children: React.ReactNode;
	loading: boolean;
	lgColWidth?: number;
}

const ContentBox: React.FC<IContentBoxProps> = ({
	title,
	children,
	loading,
	lgColWidth,
}) => {
	return (
		<Grid item xs={12} md={6} lg={lgColWidth ?? 6}>
			<Paper sx={{ p: { xs: 2, md: 3, lg: 4 } }}>
				<Typography variant='h6'>{title}</Typography>
				<Divider sx={{ my: 3 }} />
				<Box
					sx={{
						maxHeight: { xs: '100vh', md: '65vh' },
						overflowY: 'auto',
						pt: 1,
					}}
				>
					{loading ? (
						<Skeleton
							variant='rectangular'
							sx={{ borderRadius: 2 }}
							width='100%'
							height={500}
						/>
					) : (
						children
					)}
				</Box>
			</Paper>
		</Grid>
	);
};

export default ContentBox;
