const form = document.querySelector('#btn-signout');
form.onsubmit = async function (e) {
    e.eventDefault();
    const result = await fetch('/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {}
    }).then(res => res.json());
    if (result.status === 'ok') {
        // everything went fine
        console.log('Got the token: ', result.data)
        alert("server was recieved");
    } else {
        alert("error");
    }
}