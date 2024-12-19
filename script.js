let form = document.querySelector('form');
let card = document.querySelector('.card');
let isChecked = (name) => document.querySelector(`input[name="${name}"]:checked`) !== null
let timer
let validateRule = {
    first_name: value => value,
    last_name: value => value,
    // Validate email format: must contain '@' and '.' with no spaces
    email: value => value && (/^[^@\s]+@[^@\s]+\.[^@\s]+$/).test(value),
    content: value => value 
}
let toggleError = (el) => document.querySelector(`[name="${el}"]`).closest(`fieldset`).toggleAttribute('error', true);
let handleSubmit = (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(form));
    let state = true;
    for (const key in data) {
        if (!validateRule.hasOwnProperty(key)) continue
        if (validateRule[key](data[key])) continue;
        toggleError(key)
        state = false;
    }
    ['qt', 'contact'].forEach(name => {
        if (!isChecked(name)) {
            toggleError(name);
            state = false;
        }
    });

    card.toggleAttribute('success', state);
    clearTimeout(timer)
    timer = setTimeout(() => card.toggleAttribute('success', false), 5000)
}
form.addEventListener('submit', handleSubmit);