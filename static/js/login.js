const form = document.querySelector('#login-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const nickname = document.querySelector("#nickname").value;
    const password = document.querySelector("#password").value;

    const result = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname,
            password
        })
    }).then(res => res.json());

    console.log(result)
    if (result.status === 'ok') {
        // everything went fine
        console.log('Got the token: ', result.data)
        alert("server was recieved");
    } else {
        alert("error");
    }
}