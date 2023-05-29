export function formatJSONToMarkdown(jsonObj: any) {
	let result = '';

	function processObject(obj: any): string {
		let processedObject = '';

		if (obj && obj.name && !obj.ability) {
			processedObject += `**${obj.name}:**  \n`;
		}

		if (obj && obj.desc) {
			processedObject += `${obj.desc}\n\n`;
		}

		if (obj && obj.dc && obj.dc.dc_value && obj.modifier) {
			processedObject += `**Spellcasting DC:** ${obj.dc.dc_value} + ${obj.modifier}\n\n`;
		}

		for (const key in obj) {
			const value = obj[key];

			if (typeof value === 'object' && !Array.isArray(value)) {
				processedObject += processObject(value);
			}
		}

		return processedObject;
	}

	result = processObject(jsonObj);

	return result;
}
