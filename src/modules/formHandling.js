import { requiredData } from "./appLogic.js";

const form = document.querySelector('#location');
const formInput = document.querySelector('#select-location');

const formHandler = () => {
    const validationHandler = () => {
        const regex = /^\p{L}+$/u;
        if (!regex.test(formInput.value)) {
            formInput.setCustomValidity('No numbers or special characters allowed!');
            formInput.reportValidity();
        } else {
            formInput.setCustomValidity("");
        }
    }

    formInput.addEventListener('input', validationHandler);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        requiredData(formInput.value);
    })
}

export default formHandler;