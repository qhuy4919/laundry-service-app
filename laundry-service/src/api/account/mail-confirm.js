import {MAIL_CONFIRM_URL} from 'const/api-url'

export async function callMailConfirm(params) {
	const fullurl =  `${process.env.REACT_APP_API_SERVER}${MAIL_CONFIRM_URL}`;
	let statuscode = 600;

	// console.log(fullurl)
	await fetch(fullurl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	}).then((res) => {
		// Alert based on status code
		statuscode = res.status;
		console.log(res);
		alert("Mail Sent!");
		return res.json()
	}).catch((err) => {
		console.log("Error while Logging In...")
		console.log(err)
		alert("Something Went Wrong..");
	});
	if (statuscode < 300) return true;
	return false;
}
