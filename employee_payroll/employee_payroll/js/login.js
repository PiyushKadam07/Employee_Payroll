var overlay = document.getElementById("overlay");

window.addEventListener('load', function(){
  overlay.style.display = 'none';
});

const phone = document.getElementById("phone");
const passwd = document.getElementById("passwd");
const email = document.getElementById("email");

//validation error msg
function showError(input, message) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'rowcontent error';
    const small = rowcontent.querySelector('small');
    small.innerText = message;
    return false;
}

//validation success msg
function showSuccess(input) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'rowcontent success';
    return true;
}

//mobile number validation
const checkMobile = (phone) => {
    var regx = /^[6789][\d]{9}$/;
    if (phone.value.trim() === '') {
        showError(phone,'Mobile number is required');
        return false;
    }
    else if (phone.value.length < 10 || phone.value.length > 10) {
        showError(phone,'Mobile number should be of length 10');
        return false;
    } 
    else if (regx.test(phone.value) == false) {
        showError(phone,'Mobile number invalid');
        return false;
    }      
    else {
        showSuccess(phone);
        return true;
    }
}

//password validation
const checkPasswd = (passwd) => {
    var regx = /^[\w]{3}([\w]+)?$/;
    if (phone.value.trim() === '') {
        showError(passwd,'Password required');
        return false;
    }
    else if (passwd.value.length < 3 ) {
        showError(passwd,'Min. password should be greater than length 2');
        return false;
    }
    else if (regx.test(passwd.value) == false) {
        showError(passwd,'Password invalid');
        return false;
    }      
    else {
        showSuccess(passwd);
        return true;
    }
}

//email validation
const checkEmail = (email) => {
    var regx = /^([A-Za-z0-9._]+)(@)([\w]+)(.)([\w]{3})(.)?([\w]){2,3}?$/;
    if (email.value.trim() === '') {
        showError(email,'Email required');
        return false;
    }
    else if (regx.test(email.value) == false) {
        showError(email,'Invalid email');
        return false;
    }      
    else {
        showSuccess(email);
        return true;
    }
}

//set values in the form
const setValue = (id, value) => {
    const data = document.querySelector(id);
    data.value = value;
}

//reset form
const reset = () => {
    setValue('#phone', ''); 
    setValue('#passwd', '');
    window.location.reload();
}

let newData = {

}

function submit() {
    var x = checkMobile(phone);
    var y = checkPasswd(passwd);
    if ( x == true && y == true ) {
        newData.phone = document.getElementById("phone").value;
        newData.passwd = document.getElementById("passwd").value;
        newData.id = Math.floor(Math.random() * 1000);
        checklocalstorage(newData);
    }
    else {
        alert (" Enter details correctly.");
        return;
    }
}

function checklocalstorage(data) {
    let emplocalpayrolllist = JSON.parse(localStorage.getItem("Admin"));
    let emppaydata = emplocalpayrolllist.find( empdata => empdata.phone == data.phone );
    if ( emppaydata == undefined ) {
        alert("Access not allowed");
    }
    else {
        let emppaydata1 = emplocalpayrolllist.find( empdata => empdata.passwd == data.passwd );
        const index = emplocalpayrolllist.map(empdata => empdata.phone).indexOf(emppaydata.phone);
        const index1 = emplocalpayrolllist.map(empdata => empdata.passwd).indexOf(emppaydata.passwd);
        console.log(index, index1);
        if ( index == index1 ) {
            window.location.assign("../pages/home_page.html?"+emppaydata.id);
        }
        else {
            alert("Access not allowed");
        }
    }
}

function setlocalstorage(data) {
    let payrolllist = [];
    let emplocalpayrolllist = JSON.parse(localStorage.getItem("Admin"));
    // console.log(typeof(emplocalpayrolllist));
    if ( emplocalpayrolllist == undefined ) {
        emplocalpayrolllist = [data];
        console.log(emplocalpayrolllist);
        // localStorage.setItem("Admin","[]");
        localStorage.setItem("Admin",JSON.stringify(emplocalpayrolllist));
    }
    else {
        payrolllist = data;
        emplocalpayrolllist.push(payrolllist);
        localStorage.setItem("Admin",JSON.stringify(emplocalpayrolllist));
        window.location.assign("../pages/home_page.html?"+payrolllist.id);
    }
}

function register() {
    window.location.assign("../pages/registration.html");
}

function login() {
    var x = checkMobile(phone);
    var y = checkPasswd(passwd);
    var z = checkEmail(email);
    if ( x == true && y == true && z == true ) {
        newData.phone = document.getElementById("phone").value;
        newData.passwd = document.getElementById("passwd").value;
        newData.id = Math.floor(Math.random() * 1000);
        setlocalstorage(newData);
    }
    else {
        alert (" Enter details correctly.");
        return;
    }
}

function signin () {
    window.location.assign("../pages/login.html");
}
