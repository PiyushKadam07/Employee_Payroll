    
const name = document.getElementById("name");

function showError(input, message) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'row-content error';
    const small = rowcontent.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'row-content success';
}

const checkName = (name) => {
    var regx = /^[A-Z][a-zA-Z]{2}([a-zA-Z]+)?$/;
    if (name.value.trim() === '') {
        showError(name,'Name is required');
    }
    else if (name.value.length < 3) {
        showError(name,'Minimum name should be greater than 3 characters');
    } 
    else if (regx.test(name.value) == false) {
        showError(name,'Name must start with capital');
    }      
    else {
        showSuccess(name);
    }
}

const checkDate = (date, month, year) => {
    let dateObj = new Date();
    let month1 = String(dateObj.getMonth() + 1).padStart(2, '0');
    let day1 = String(dateObj.getDate()).padStart(2, '0');
    let year1 = dateObj.getFullYear();
    let current_date = month1 + '/' + day1 + '/' + year1;
    let start_date = month + '/' + date + '/' + year;
    var date1 = new Date(start_date);
    var date2 = new Date(current_date);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(date2,date1,diffDays) ;
    if ( date == "00" || month == "00" || year == "0000" ) {
        showError(document.getElementById("year"),'Select date');
    }
    else if ( year != year1 ) {
        showError(document.getElementById("year"),'Invalid year');
    }
    else if ( month >= month1 ) {
        if ( date > day1 ) {
            showError(document.getElementById("year"),'Future date not allowed');
        }
        else {
            showSuccess(document.getElementById("year")); 
        }
    }
    else { 
        if ( diffDays > 30 ) {
            showError(document.getElementById("year"),'No. of days are more than 30');
        }
        else {
            showSuccess(document.getElementById("year"));
        }
    }
}

const validate = () => {
    event.preventDefault();
    checkName(name); 
    var a = document.getElementById("date");
    var date = a.options[a.selectedIndex].value;
    var b = document.getElementById("month");
    var month = b.options[b.selectedIndex].value;
    var c = document.getElementById("year");
    var year = c.options[c.selectedIndex].value;
    checkDate(date,month,year);
}

function save () {
    try {
        setEmployeepayrollobject();
    }
    catch (exception) {
        console.error(exception);
        return;
    }
}

let newData = {}

function setEmployeepayrollobject() {
    try {
        const salary = document.getElementById('amount').value;

        newData.name = document.getElementById('name').value;
        newData.profile = radiovalue(document.getElementsByName('profile'));
        newData.gender = radiovalue(document.getElementsByName('gender'));
        newData.department = multivalue(document.getElementsByName('dept'));
        
        let startdate = new Array();
        startdate.push(document.getElementById("date").value);
        startdate.push(document.getElementById("month").value);
        startdate.push(document.getElementById("year").value);
        
        newData.notes = document.getElementById('notes').value;
        console.log(newData,startdate,salary);
        
        createlocalStorage(newData);
    }
    catch (exception) {
        console.error(exception);
    }
}

function radiovalue(genvalues) {
    for(var i = 0; i < genvalues.length; i++) {
        if (genvalues[i].checked) {
            console.log(genvalues[i].value);
            return genvalues[i].value;
        }
    }
}

function multivalue(deptvalues) {
    let deptlist = new Array();
    for(var i = 0; i < deptvalues.length; i++) {
        if (deptvalues[i].checked) {
            deptlist.push(deptvalues[i].value)
        }
    }
    console.log(deptlist);
    return deptlist;
}

// Uc16
function createlocalStorage(empdata) {
    let emplocalpayrolllist = JSON.parse(localStorage.getItem("Payrolllist"));
    console.log(emplocalpayrolllist);
    if (emplocalpayrolllist != undefined) {
        console.log(emplocalpayrolllist);
        emplocalpayrolllist.push(empdata);
    }
    else {
        emplocalpayrolllist = [empdata];
    }
    localStorage.setItem("Payrolllist",JSON.stringify(emplocalpayrolllist));
}


