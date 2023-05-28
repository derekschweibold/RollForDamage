export default interface IEncounter {
	id?: string;
	userID: string;
	name: string;
	characters?: ICharacterInit[];
	up: string;
	open: boolean;
	round: number;
	turn: number;
}

export interface ICharacterInit {
	initiative: number;
	id: string;
}
