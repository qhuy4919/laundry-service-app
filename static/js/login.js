const form = document.querySelector('#login-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const result = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => res.json());
    if (result.status === 'ok') {
        // everythign went fine
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        alert('Success')
    } else {
        alert("hiu")
    }
}