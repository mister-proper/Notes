//import getLogin  from "../service/router";

export function submitForm(e){
    e.preventDefault();
    let form = document.querySelector('form').elements;

    fetch('/save-form', {
        method : "POST",
        headers: {
            'Content-Type': 'application/x-www-from-urlencoded'
        },
        body: JSON.stringify({
            'login': form.login.value,
            'email': form.email.value,
            'password': form.password.value
        })
    })
    .then(res => res.text())
    .then(res => console.log(res))
}
