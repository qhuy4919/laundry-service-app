import {SIGN_IN_URL} from 'const/api-url'
import {SIGNED_IN_USER} from 'const/local-storage-key'

export async function callSignIn(params) {
	const fullurl =  `${process.env.REACT_APP_API_SERVER}${SIGN_IN_URL}`;
	let statuscode = 600;

	// console.log(fullurl)
	await fetch(fullurl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	}).then((res) => {
		statuscode = res.status;
		return res.json()
	}).then((data) => {
		localStorage.setItem(SIGNED_IN_USER, JSON.stringify(data));
	}).catch((err) => {
		alert("Something went Wrong");
		console.log("Error while Logging In...")
		console.log(err)
		localStorage.removeItem(SIGNED_IN_USER);
	});
	if (statuscode < 300) return true;
	return false;
}
