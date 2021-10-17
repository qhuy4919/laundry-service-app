const form = document.querySelector('#register-form');
form.onsubmit = async function (e) {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm_password = document.querySelector("#confirm_password").value;
    const result = await fetch('/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
            confirm_password
        })
    }).then(res => res.json());
    if (result.status === 'ok') {
        // everything went fine
        alert(result.error);
    } else {
        alert("error")
    }
}