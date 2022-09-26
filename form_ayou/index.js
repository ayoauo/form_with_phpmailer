'use strict'

console.log(12345);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        console.log(777);
        console.log(error);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let responce = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (responce.ok) {
                let result = await responce.json();
                alert(result.messagge);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }
        } else {
            // const successMessage = document.querySelector('.error_text');
            // form.addEventListener('submit',()=>{
            //     e.preventDefault();
            //        successMessage.classList.add('show');
            //        setTimeout(() => form.submit(), 20000);
            //    }
            //    )
            alert('Заполните все поля')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('._email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }


    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //email check function
    function emailTest(input) {
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
    }
});