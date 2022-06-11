const form = document.querySelector("#form");
const btnSubmit = form.querySelector('button[type="submit"]');

getCountryCode();
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  validForm();
});

function validForm() {
  voidValue();
  validName();
  validEmail();
  validPhone();
}

function voidValue() {
  let allInputs = form.querySelectorAll("input");
  allInputs = Array.from(allInputs);  

  allInputs.forEach((item) => {
    if (item.value == "") {
      let err = item.parentElement.closest('.mb-3').querySelector(".error-input-msg");
      item.classList.add("error");
      if (err) {
        err.innerText = errMsgs.void;
      }
    } else {
      let err = item.parentElement.closest('.mb-3').querySelector(".error-input-msg");
      if (err) {
        err.innerText = "";
        item.classList.remove("error");
      }
    }
  });
}

function validName() {
  const name = form.querySelector('input[type="name"]');
  const lastName = form.querySelector('input[type="last-name"]');
  const errName = name.parentElement.querySelector(".error-input-msg");
  const errLastName = lastName.parentElement.querySelector(".error-input-msg");
  const nameReg = /^[A-za-z]+$/;
  console.log();

  if (!nameReg.test(name.value) && name.value.length >= 2) {
    errName.innerText = errMsgs.nameReg;
    name.classList.add("error");
  }

  if (name.value.length < 2 && name.value != "") {
    errName.innerText = errMsgs.nameLen;
    name.classList.add("error");
  }

  if (!nameReg.test(lastName.value) && lastName.value.length >= 2) {
    errLastName.innerText = errMsgs.lastNameReg;
    lastName.classList.add("error");
  }

  if (lastName.value.length < 2 && lastName.value != "") {
    errLastName.innerText = errMsgs.lastNameLen;
    lastName.classList.add("error");
  }
}

function validEmail() {
  const email = form.querySelector('input[type="email"]');
  const emailReg =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (emailReg.test(email.value) == false && email.value.length > 1) {
    email.parentElement.querySelector(".error-input-msg").innerText = errMsgs.email;
    email.classList.add("error");
  }
}

function validPhone() {
  const phone = form.querySelector("#phone");
  const phoneReg = /^[\d]+$/;
  const errPhone = phone.parentElement.closest('.mb-3').querySelector(".error-input-msg");  

  if (!phoneReg.test(phone.value) && phone.value.length > 0) {
    errPhone.innerText = errMsgs.phone;
    phone.classList.add('error');
  }else if(phoneReg.test(phone.value) && phone.value.length > 0){
    errPhone.innerText = ' ';
    phone.classList.remove('error')
  }

  let placeholder = phone.placeholder
  placeholder = placeholder.split(' ').join('');
  let placeholderLen = placeholder.length
  
  if(phone.value.length != placeholderLen && phone.value != ''){
    errPhone.innerText = `Номер телефона должен состоять из ${placeholderLen} цифр`
  }
}

function getCountryCode() {
  var input = document.querySelector("#phone");
  let inputNum = intlTelInput(input, {
    initialCountry: "auto",
    separateDialCode: true,   
    placeholderNumberType: "FIXED_LINE_OR_MOBILE",
    geoIpLookup: async function (success, failure) {
      let responseCountry = await fetch(
        "https://ipinfo.io/json?token=0548049a57560e"
      );
      let jsonCountry = await responseCountry.json();
      let codeCountry = jsonCountry.country;
      success(codeCountry);
    },
  });
}



let errMsgs = {
  phone:"Номер телефона должен состоять только из цифр",
  email: "Email должне быть представлен в формате 'user@mail.com'",
  lastNameLen: "Фамилия должна быть минимум 2 символа",
  lastNameReg: "Фамилия должна состоять из букв латинского алфавита. Запрещено использовать цифры и спецсимволы",
  nameLen: "Имя должно быть минимум 2 символа",
  nameReg: "Имя должно состоять из букв латинского алфавита. Запрещено использовать цифры и спецсимволы",
  void: "Поле не может быть пустым"
}