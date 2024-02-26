import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconOK from "../img/ok.png"
import iconError from "../img/error.png"

const form = document.querySelector("form")

const snack = (event) => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    form.reset();
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(state == "fulfilled"){
                res(delay)
            }
            if (state == "rejected"){
                rej(delay)
            }
    }, delay);
})
};

form.addEventListener('submit', event => {
    snack(event)
    .then(value => 
            iziToast.success({
                title: 'OK',
                iconUrl: iconOK,
                message: `Fulfilled promise in ${value}ms`,
                position: 'topCenter',
                backgroundColor: '#59a10d',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )
    .catch(error =>
            iziToast.error({
                iconUrl: iconError,
                message: `Rejected promise in ${error}ms`,
                position: 'topCenter',
                backgroundColor: '#ef4040',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )    
});
