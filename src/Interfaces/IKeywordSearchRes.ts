import { ReactNode } from 'react';

export default interface IKeywordSearchRes {
	name: string;
	description: ReactNode;
}

export interface IConditionRes {
	index: string;
	name: string;
	url: string;
	desc: string[];
}

export interface IDamageTypesRes {
	index: string;
	name: string;
	url: string;
	desc: string[];
}

export interface IMagicSchoolsRes {
	index: string;
	name: string;
	url: string;
	desc: string;
}

export interface IRuleSectionsRes {
	index: string;
	name: string;
	url: string;
	desc: string;
}

export interface IRulesRes {
	index: string;
	name: string;
	url: string;
	desc: string;
}

export interface ISpellsRes {
	index: string;
	name: string;
	url: string;
	desc: string;
}
