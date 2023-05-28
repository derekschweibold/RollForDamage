import React from 'react';
import IEncounter from '../../Interfaces/IEncounter';
import ContentBox from '../ContentBox';

interface IEncountersTabProps {
	encounters: IEncounter[];
	loading: boolean;
}

const EncountersTab: React.FC<IEncountersTabProps> = ({
	encounters,
	loading,
}) => {
	return (
		<>
			<ContentBox title='Add an Encounter' loading={loading}>
				<></>
			</ContentBox>
		</>
	);
};

export default EncountersTab;
