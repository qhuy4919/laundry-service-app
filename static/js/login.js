const form = document.querySelector('#login-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const result = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json());

    console.log(result)
    if (result.status === 200) {
        // everything went fine
        console.log('Got the token: ', result.data)
        alert("server was recieved");
    }
}