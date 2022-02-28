const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const phone = document.getElementById('phone');

function error(input, message) {
    // normalde form-control error dedik ve css de error un özellikleri belirttik
    // ama kütüphane kullandığımız için direkt is-invalid yaptık ve belirtilenler 
    // girilmediğin de etrafını kırmızı yaptı ve ünlem simgesini ekledi
    input.className = 'form-control is-invalid';

    //ulaştığımız input dan sonra gelen ilk div oluyor yani
    const div = input.nextElementSibling;
    div.innerText = message;
    // boostrap den yine
    div.className = 'invalid-feedback';

}
function succes(input) {
    input.className = 'form-control is-valid';
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (input.value === '') {
        error(input, `${input.id} is required.`);
    } else {
        if (re.test(input.value)) {
            succes(input);
        } else {
            error(input, 'Please enter a correct email');
        }

    }
}


function checkRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.value === '') {
            error(input, `${input.id} is required.`);
        } else {
            succes(input);
        }

    });
}

function checkLength(input, min, max) {
    if (input.value !== '') {
        if (input.value.length < min) {
            error(input, `${input.id} must be at least ${min} charecters`);
        } else if (input.value.length > max) {
            error(input, `${input.id} must be no more than ${max} charecters`);
        } else {
            succes(input);
        }
    }

}
function checkPassword(input1, input2) {
    if (input1.value !== input2.value) {
        error(input2, 'passwords do not match')
    }
}

function checkPhone(input) {
    var exp = /^\d{10}$/;
    if (input.value === '') {
        error(input, `${input.id} is required.`);
    } else if (!exp.test(input.value)) {
        error(input, 'Phone must be 10 characters')
    } else {
        succes(input);
    }

}

form.addEventListener('submit', function (e) {
    // bu kod form un submit özelliğini kapatıp username e girilen değeri almamızı sağlıyor
    e.preventDefault();

    checkRequired([username, email, password, repassword]);
    checkEmail(email);
    checkLength(username, 7, 15);
    checkLength(password, 6, 12);
    checkPassword(password, repassword);
    checkPhone(phone);
});