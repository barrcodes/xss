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
    formFields.submit = form.appendChild(new HTMLButtonElement());
    formFields.submit.classList.add('button', 'small');
    formFields.submit.onclick = () => {
        alert(`You've just been hacked! I now have your username and password.\n\nuser: ${acc.user.value}\npass: ${acc.pass.value}`)
    }
} 
