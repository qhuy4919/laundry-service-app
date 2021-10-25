const form = document.querySelector('#reset-password-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const result = await fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email
        })
    }).then(res => res.json());

    console.log(result)
    if (result.status === 200) {
        // everything went fine
        console.log('Got the token: ', result.data)
        alert("server was recieved");
    }
}