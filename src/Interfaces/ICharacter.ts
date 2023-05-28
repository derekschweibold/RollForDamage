export default interface ICharacter {
	id?: string;
	userID: string;
	name: string;
	hpCurrent: number;
	hpTotal: number;
	isUp: boolean;
	statImg?: string;
	notes?: string;
	formData?: string;
}

export interface ICharacterStatBlock {
	name: string;
	armorClass: number;
	armorType: string;
	hitPoints: number;
	hitDice: string;
	speed: string;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	savingThrows: string;
	skills: string;
	senses: string;
	languages: string;
	cr: number;
	xp: number;
	proficiencyBonus: number;
	abilities: string;
	actions: string;
	legendaryActions: string;
	type: string;
	alignment: string;
}
