getFormFields = (form) => {
    return Array.from(form.children).reduce((acc, curr, i, arr) => {
        if (!curr || !curr.attributes || !curr.attributes.type) {
            return acc;
        }
        
        switch (curr.attributes.type.value) {
            case 'text':
                acc.user = curr;
            case 'password':
                acc.pass = curr;
            case 'submit':
                acc.submit = curr;
        }

        return acc;
    }, {});
}

window.onload = function onWindowLoad() { 
    const form = document.getElementById('login');
    const formFields = getFormFields(form);

    console.log(formFields);
    formFields.submit.remove();
    formFields.submit = document.createElement('button');
    formFields.submit.classList.add('button', 'small');
    formFields.submit.innerHTML = "LOG IN";
    formFields.submit.onclick = () => {
        alert(`You've just been hacked! I now have your username and password.\n\nuser: ${formFields.user.value}\npass: ${formFields.pass.value}`)
    }
    form.appendChild(formFields.submit);
} 
