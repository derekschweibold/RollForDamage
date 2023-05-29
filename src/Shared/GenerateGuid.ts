export default function generateGUID() {
	let guid = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		guid += characters.charAt(randomIndex);
	}

	return guid;
}

const uniqueGUID = generateGUID();
