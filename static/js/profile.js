
const form = document.querySelector('#profile-form');

form.onsubmit = async function () {
    const result = await fetch('/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());

    console.log(result.status)
    // if (result.status === 404) {
    //     // everything went fine
    //     console.log('Got the token: ', result.data)
    //     alert("server was recieved");
    // } else {
    //     alert("error");
    // }
}