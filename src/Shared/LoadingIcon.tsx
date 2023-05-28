import React from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface ILoadingIconProps {
	loading: boolean;
	icon: React.ReactNode;
}

const LoadingIcon: React.FC<ILoadingIconProps> = ({ loading, icon }) => {
	return (
		<>
			{loading ? (
				<HourglassEmptyIcon fontSize='small' className='animate-rotate' />
			) : (
				icon
			)}
		</>
	);
};

export default LoadingIcon;
