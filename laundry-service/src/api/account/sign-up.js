import {SIGN_UP_URL, SERVER_URL} from 'const/api-url'

export async function callSignUp(params) {
	const fullurl =  `${SERVER_URL}${SIGN_UP_URL}`;
	let statuscode = 500;

	await fetch(fullurl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	}).then((res) => {
		res.json()
		statuscode = res.status;
	}).catch((err) => {
		console.log("Error while Logging In...")
		console.log(err)
	});

	if (statuscode < 300) return true;
	return false;
}
