const total = document.querySelector('#total_orders');
const follower = document.querySelector('#follower');
const form = document.querySelector('#profile-form');
const list = document.querySelector('#order-list');

form.onsubmit = async function (e) {
    e.preventDefault();
    const id = 3;
    const result = await fetch('/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: id,
        })
    }).then(res => res.json());
    if (result.status === 'ok') {
        // everything went fine
        alert(result.error);
    } else {
        alert("error")
    }
}