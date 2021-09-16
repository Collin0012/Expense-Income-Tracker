const usernameField = document.querySelector('#usernameField');

const feedBackArea = document.querySelector('.invalid__feedback');

const emailField = document.querySelector('#emailField');

const emailFeedBackArea = document.querySelector('.emailFeedBackArea');

const username_success_output = document.querySelector('.username_success_output');
const email_success_output = document.querySelector('.email_success_output');

const show_password_toggle = document.querySelector('.show_password_toggle');
const passwordField = document.querySelector('#passwordField');

const submit__btn = document.querySelector('.submit__btn');

const  handleToggleInput = (e) => {
     
    if (show_password_toggle.textContent === 'SHOW') {
        show_password_toggle.textContent = 'HIDE';

        passwordField.setAttribute('type', 'text');
    }
    else{
        show_password_toggle.textContent = 'SHOW';
        passwordField.setAttribute('type', 'password');
    }
};

show_password_toggle.addEventListener('click', handleToggleInput);


emailField.addEventListener('keyup', (e) => {

    const emailValue = e.target.value;

    email_success_output.style.display = 'block';
    email_success_output.textContent = `Checking ${emailValue}`;

    emailField.classList.remove('is-invalid');
    emailFeedBackArea.style.display = 'none';


    if(emailValue.length > 0) {
        fetch('/authentication/validate-email', {
            body: JSON.stringify({ email: emailValue }), 
            method: 'POST', 
        })
        .then(res => res.json())
        .then(data =>{
            // console.log('data', data);
            email_success_output.style.display = 'none';
            if(data.email_error){
                // submit__btn.disabled = true;
                emailField.classList.add('is-invalid');
                emailFeedBackArea.style.display = 'block';
                emailFeedBackArea.innerHTML=`<p>${data.email_error}</p>`;
            }
        });
    }
});

usernameField.addEventListener('keyup', (e) => {

    const usernameValue = e.target.value;

    username_success_output.style.display = 'block';
    username_success_output.textContent = `Checking ${usernameValue}`;

    usernameField.classList.remove('is-invalid');
    feedBackArea.style.display = 'none';


    if(usernameValue.length > 0) {
        fetch('/authentication/validate-username', {
            body: JSON.stringify({ username: usernameValue }), 
            method: 'POST', 
        })
        .then(res => res.json())
        .then(data =>{
            // console.log('data', data);
            username_success_output.style.display = 'none';
            if(data.username_error){
                usernameField.classList.add('is-invalid');
                feedBackArea.style.display = 'block';
                feedBackArea.innerHTML=`<p>${data.username_error}</p>`;
            }
        });
    }
    
});