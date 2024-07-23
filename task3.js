document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const birthDate = document.getElementById('birthDate');
    const submitButton = document.getElementById('submitButton');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const birthDateError = document.getElementById('birthDateError');

    function validateFirstName() {
        const value = firstName.value.trim();
        const regex = /^[A-Za-zА-Яа-яЁё]{2,20}$/;
        if (!regex.test(value)) {
            firstNameError.textContent = 'Имя должно содержать только буквы и быть от 2 до 20 символов.';
            return false;
        }
        firstNameError.textContent = '';
        return true;
    }

    function validateLastName() {
        const value = lastName.value.trim();
        const regex = /^[A-Za-zА-Яа-яЁё]{2,30}$/;
        if (!regex.test(value)) {
            lastNameError.textContent = 'Фамилия должна содержать только буквы и быть от 2 до 30 символов.';
            return false;
        }
        lastNameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            emailError.textContent = 'Неверный формат email.';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validatePassword() {
        const value = password.value.trim();
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!regex.test(value)) {
            passwordError.textContent = 'Пароль должен быть не менее 8 символов, содержать цифру, заглавную и строчную буквы и символ.';
            return false;
        }
        passwordError.textContent = '';
        return true;
    }

    function validateConfirmPassword() {
        if (password.value.trim() !== confirmPassword.value.trim()) {
            confirmPasswordError.textContent = 'Пароли не совпадают.';
            return false;
        }
        confirmPasswordError.textContent = '';
        return true;
    }

    function validateBirthDate() {
        const value = new Date(birthDate.value);
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        const monthDiff = today.getMonth() - value.getMonth();
        const dayDiff = today.getDate() - value.getDate();

        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            birthDateError.textContent = 'Возраст должен быть не менее 18 лет.';
            return false;
        }
        birthDateError.textContent = '';
        return true;
    }

    function validateForm() {
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isBirthDateValid = validateBirthDate();

        submitButton.disabled = !(isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isBirthDateValid);
    }

    function saveToLocalStorage() {
        localStorage.setItem('firstName', firstName.value);
        localStorage.setItem('lastName', lastName.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('confirmPassword', confirmPassword.value);
        localStorage.setItem('birthDate', birthDate.value);
    }

    firstName.addEventListener('blur', () => {
        validateFirstName();
    });
    lastName.addEventListener('blur', () => {
        validateLastName();
    });
    email.addEventListener('blur', () => {
        validateEmail();
    });
    password.addEventListener('blur', () => {
        validatePassword();
    });
    confirmPassword.addEventListener('blur', () => {
        validateConfirmPassword();
    });
    birthDate.addEventListener('blur', () => {
        validateBirthDate();
    });

    // очистка полей данныя после отправки
    function clearForm(){
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
            birthDate.value = '';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!submitButton.disabled) {
            alert('Форма отправлена успешно!');
            //тут должна быть логика сохранения данных на сервер, я сохраняю данные в localStorage
            saveToLocalStorage();
            clearForm()
            // дополнительные действия после сохранения данных
        }
    });

    form.addEventListener('input', validateForm);
});
