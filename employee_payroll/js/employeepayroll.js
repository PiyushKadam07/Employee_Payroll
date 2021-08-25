const profile = document.getElementsByName("profile");
const gender = document.getElementsByName("gender");
const department = document.getElementsByName("dept");
const salary = document.getElementById("amount");
const date = document.getElementById("date");
const month = document.getElementById("month");
const year = document.getElementById("year");
const notes = document.getElementById("notes");

window.addEventListener('DOMContentLoaded', (event) => {
class Employee_payroll {
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get profilepic() {
        return this._profilepic;
    }
    set profilepic(profilepic) {
        this._profilepic = profilepic;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }

    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }

    get month() {
        return this._month;
    }
    set month(month) {
        this._month = month;
    }

    get notes() {
        return this.notes;
    }
    set notes(notes) {
        this._notes = notes;
    }

    showError(input, message) {
        const rowcontent = input.parentElement;
        rowcontent.className = 'row-content error';
        const small = rowcontent.querySelector('small');
        small.innerText = message;
    }

    showSuccess(input) {
        const rowcontent = input.parentElement;
        rowcontent.className = 'row-content success';
    }

    checkName(name) {
        var regx = /^[A-Z][a-zA-Z]{2}([a-zA-Z]+)?$/;
        if (name.value.trim() === null) {
            this.showError(name,'Name is required');
        }
        else if (name.value.length < 3) {
            this.showError(name,'Minimum name should be greater than 3 characters');
        } 
        else if (regx.test(name.value) == false) {
            this.showError(name,'Name must start with capital');
        }      
        else {
            this.showSuccess(name);
        }
    }

    checkDate(date, month, year) {
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
        console.log(date2,date1,diffDays) ;
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

    validate () {
        event.preventDefault();
        checkName(name); 
        checkDate(date,month,year);
    }
}
const emp = new Employee_payroll();
const name = document.getElementById("name");
name.addEventListener('input', emp.checkName(name));

});
// params = [name, profile, gender, department, salary, date, month, year, notes];





