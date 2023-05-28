export default interface IAPICharacterSearchRes {
	results: ICharacterSearchResData[];
}

export interface ICharacterSearchResData {
	index: string;
	name: string;
	url: string;
}

export interface IAPICharacter {
	index: string;
	name: string;
	url: string;
	actions: IAction[];
	alignment: string;
	armor_class: IArmorClass[];
	challenge_rating: number;
	charisma: number;
	condition_immunities: any[];
	constitution: number;
	damage_immunities: any[];
	damage_resistances: any[];
	damage_vulnerabilities: any[];
	dexterity: number;
	forms: any[];
	hit_dice: string;
	hit_points: number;
	hit_points_roll: string;
	intelligence: number;
	languages: string;
	legendary_actions: IAction[];
	proficiencies: {
		proficiency: IProficiency;
		value: number;
	}[];
	reactions: IReaction[];
	senses: ISenses;
	size: string;
	special_abilities: ISpecialAbility[];
	speed: ISpeed;
	strength: number;
	subtype: null;
	type: string;
	wisdom: number;
	xp: number;
}

export interface IAbilityScore {
	index: string;
	name: string;
	url: string;
}

export interface IDamageType {
	index: string;
	name: string;
	url: string;
}

export interface IDamage {
	damage_dice: string;
	damage_type: IDamageType;
}

export interface IDCType {
	index: string;
	name: string;
	url: string;
}

export interface IDC {
	dc_type: IDCType;
	dc_value: number;
	success_type: string;
}

export interface IUsage {
	times: number;
	type: string;
}

export interface IAction {
	attacks: any[];
	damage: IDamage[];
	desc: string;
	name: string;
	multiattack_type?: string;
	actions?: IAction[];
	attack_bonus?: number;
	dc?: IDC;
	usage?: IUsage;
}

export interface IArmorClass {
	type: string;
	value: number;
}

export interface IProficiency {
	index: string;
	name: string;
	url: string;
}

export interface IReaction {
	damage: any[];
	desc: string;
	name: string;
}

export interface ISenses {
	darkvision: string;
	blindsight: string;
	tremorsense: string;
	truesight: string;
	passive_perception: number;
}

export interface ISpecialAbility {
	damage: any[];
	desc: string;
	name: string;
	dc?: IDC;
}

export interface ISpeed {
	swim: string;
	walk: string;
	fly: string;
	burrow: string;
	climb: string;
}
