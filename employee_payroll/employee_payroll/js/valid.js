
const name = document.getElementById("name");

//validation error msg
function showError(input, message) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'row-content error';
    const small = rowcontent.querySelector('small');
    small.innerText = message;
    return false;
}

//validation success msg
function showSuccess(input) {
    const rowcontent = input.parentElement;
    rowcontent.className = 'row-content success';
    return true;
}

//name validation
const checkName = (name) => {
    var regx = /^[A-Z][a-zA-Z]{2}([a-zA-Z]+)?[\s]?([a-zA-Z]+)?$/;
    if (name.value.trim() === '') {
        showError(name,'Name is required');
        return false;
    }
    else if (name.value.length < 3) {
        showError(name,'Minimum name should be greater than 3 characters');
        return false;
    } 
    else if (regx.test(name.value) == false) {
        showError(name,'Name must start with capital');
        return false;
    }      
    else {
        showSuccess(name);
        return true;
    }
}

//date validation
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
        return false;
    }
    else if ( year != year1 ) {
        showError(document.getElementById("year"),'Invalid year');
        return false;
    }
    else if ( month == month1 && date > day1 ) {
        showError(document.getElementById("date"),'Future date not allowed');
        return false;
    } 
    else if ( month > month1 ) {
        showError(document.getElementById("month"),'Future date not allowed');
        return false;
    }
    else if ( diffDays > 30 ) {
        showError(document.getElementById("year"),'No. of days are more than 30');
        return false;
    }
    else {
        showSuccess(document.getElementById("year"));
        return true;
    }
}


const validate = () => {
    event.preventDefault();
    // checkName(name); 
    var a = document.getElementById("date");
    var date = a.options[a.selectedIndex].value;
    var b = document.getElementById("month");
    var month = b.options[b.selectedIndex].value;
    var c = document.getElementById("year");
    var year = c.options[c.selectedIndex].value;
    checkDate(date,month,year);
}

//on submit function
function save () {
    var x = checkName(name);
    var y = checkDate(document.getElementById("date").value,document.getElementById("month").value,document.getElementById("year").value);
    // console.log(x,y);
    if ( x == true && y == true ) {
        try {
            setEmployeepayrollobject();
        }
        catch (exception) {
            console.error(exception);
            return;
        }
    }
    else {
        alert (" Enter details correctly.");
        return;
    } 
}

let newData = {}

//object creation
function setEmployeepayrollobject() {
    try {
        
        newData.name = document.getElementById('name').value;
        newData.profile = radiovalue(document.getElementsByName('profile'));
        newData.gender = radiovalue(document.getElementsByName('gender'));
        newData.department = multivalue(document.getElementsByName('dept'));
        newData.salary = document.getElementById('amount').value;
        // let startdate = new Array();
        let date = document.getElementById("date").value;
        let month = document.getElementById("month").value;
        let year = document.getElementById("year").value;
        // startdate.push(date + '/' + month + '/' + year);
        newData.startdate = date + '/' + month + '/' + year;
        newData.notes = document.getElementById('notes').value;

        //for updating the data take id & update
        let url1 = window.location.href;
        let uid = url1.split('?');
        if ( uid[1] != undefined ) {
            newData.id = uid[1];
            let url = site_properties.json_server+"/"+newData.id;
            ajaxcall("PUT", url, true, newData)
                .then( responseText => {
                        console.log("Updated data", responseText);
                    })
                .catch( error => {
                    console.log("Error " + error)
                });
        }
        else {
            newData.id = Math.floor(Math.random() * 1000);
            let url = site_properties.json_server;
            ajaxcall("POST", url, true, newData)
                .then( responseText => {
                        console.log("Data added", responseText);
                    })
                .catch( error => {
                    console.log("Error " + error)
                });
        }
        
        // creating object & storing the details on local storage also used for updating details
        // var emppayrollupdate = JSON.parse(localStorage.getItem("updateEmp"));
        // var emplocalpayrolllist = JSON.parse(localStorage.getItem("Payrolllist"));
        // if (!emppayrollupdate) {
        //     if ( emplocalpayrolllist.length == 0 ){
        //         newData.id = 0;
        //     }
        //     else {
        //         newData.id = emplocalpayrolllist.length + 1;
        //     }
        // }
        // else {
        //     console.log(emppayrollupdate[0], emppayrollupdate.length);
        //     newData.id = emppayrollupdate.id;
        //     let emppaydata = emplocalpayrolllist.find( empdata => empdata.id == emppayrollupdate.id );
        //     const index = emplocalpayrolllist.map(empdata => empdata.id).indexOf(emppaydata.id);
        //     emplocalpayrolllist.splice(index, 1);
        //     localStorage.setItem("Payrolllist",JSON.stringify(emplocalpayrolllist)); 
        //     localStorage.removeItem('updateEmp')
        // }
        // // console.log(newData,startdate,salary);
        // createlocalStorage(newData);
        window.location.assign("../pages/home_page.html");
    }
    catch (exception) {
        console.error(exception);
    }
}


//get radio value selected
function radiovalue(genvalues) {
    for(var i = 0; i < genvalues.length; i++) {
        if (genvalues[i].checked) {
            // console.log(genvalues[i].value);
            return genvalues[i].value;
        }
    }
}


//get multivalues selected
function multivalue(deptvalues) {
    let deptlist = new Array();
    for(var i = 0; i < deptvalues.length; i++) {
        if (deptvalues[i].checked) {
            deptlist.push(deptvalues[i].value)
        }
    }
    // console.log(deptlist);
    return deptlist;
}


// Uc16  local storage creation and data uploading
function createlocalStorage(empdata) {
    let emplocalpayrolllist = JSON.parse(localStorage.getItem("Payrolllist"));
    // console.log(emplocalpayrolllist);
    if (emplocalpayrolllist != undefined) {
        // console.log(emplocalpayrolllist);
        emplocalpayrolllist.push(empdata);
    }
    else {
        emplocalpayrolllist = [empdata];
    }
    localStorage.setItem("Payrolllist",JSON.stringify(emplocalpayrolllist)); 
    return;
}


//reset form
const reset = () => {
    setValue('#name', ''); 
    unsetSelectedValues('[name = profile]');  
    unsetSelectedValues('[name = gender]'); 
    unsetSelectedValues('[name = dept]'); 
    setValue('#amount', '');
    setValue('#date', '00');
    setValue('#month', '00');
    setValue('#year', '0000');  
    setValue('#notes', '');
    window.location.reload();
}


//turn all radio/multi values false
const unsetSelectedValues = (value) => {
    let data = document.querySelectorAll(value);
    data.forEach(item => {
        item.checked = false;
    });
}


//check first when the page is loaded 
window.addEventListener("DOMContentLoaded", (event) => {
//     // checkName(name);
//     // validate();
    checkupdates(); 
});

let emppayrollobj = {

};

// using id in the href take data & update
function checkupdates(row) {
    // console.log(row);
    let url1 = window.location.href;
    let uid = url1.split('?');
    // console.log(url,uid, uid[1]);
    if ( uid != undefined ) {
        let url = site_properties.json_server+"/"+uid[1];
        ajaxcall("GET", url, true)
        .then( responseText => {
                console.log("Data to be updated", responseText);
                emppayrollobj = JSON.parse(responseText);
                // console.log(emppayrollobj);
                setform(emppayrollobj);
            })
        .catch( error => {
            console.log("Error " + error)
        });
    }
    else {
        return;
    }

    //if there is any employee details present in updateEmp key on local storage
    // const employeepayroll = localStorage.getItem('updateEmp');
    // if (employeepayroll == undefined) {
    //     return;
    // }
    // else {
    //     let emppayrollobj = JSON.parse(employeepayroll);
    //     // console.log(emppayrollobj);
    //     setform(emppayrollobj);
    // }
}


//set form values if there is employee details in updateEmp
const setform = (emppayrollobj) => {
    // console.log(emppayrollobj);
    setValue('#name', emppayrollobj.name); 
    setSelectedValues('[name = profile]', emppayrollobj.profile);  
    setSelectedValues('[name = gender]', emppayrollobj.gender); 
    setSelectedValues('[name = dept]', emppayrollobj.department); 
    setValue('#rangeInput', emppayrollobj.salary);
    setValue('#amount', emppayrollobj.salary);
    let date = emppayrollobj.startdate.split("/");
    setValue('#date', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);  
    setValue('#notes', emppayrollobj.notes);
}

//set values in the form
const setValue = (id, value) => {
    const data = document.querySelector(id);
    data.value = value;
}

//set values for radio/multi values in the form
const setSelectedValues = (multivalue, value) => {
    let data = document.querySelectorAll(multivalue);
    data.forEach(item => {
        if(Array.isArray(value)){
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if ( item.value === value )
            item.checked = true; 
    });
}






