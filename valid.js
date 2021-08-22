
    const name = document.getElementById("name");

    function showError(input, message) {
        const rowcontent = input.parentElement;
        console.log(input.parentElement, rowcontent.className);
        rowcontent.className = 'row-content error';
        const small = rowcontent.querySelector('small');
        small.innerText = message;
    }

    function showSuccess(input) {
        const rowcontent = input.parentElement;
        rowcontent.className = 'row-content success';
    }

    function showError1(input, message) {
        const rowcontent = input.parentElement;
        console.log(input.parentElement);
        rowcontent.className = 'row-content error';
        const small = rowcontent.querySelector('small');
        small.innerText = message;
    }

    function showSuccess1(input) {
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
            showError(name,'Name invalid');
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
        console.log(date2,date1,diffDays) ;
        if ( date == "00" || month == "00" || year == "0000" ) {
            // showError1(date, ' ');
            // showError1(month, ' ');
            showError1(year,'Select date');
        }
        else if ( year != year1 ) {
            // showError1(date,' ');
            // showError1(month, ' ');
            showError1(year,'Invalid year');
        }
        else if ( month >= month1 ) {
            if ( date > day1 ) {
                // showError1(date, ' ');
                // showError1(month, ' ');
                showError1(year,'Future date not allowed');
            }
            else {
                // showSuccess1(date);
                // showSuccess1(month);
                showSuccess1(year); 
            }
        }
        else { 
            if ( diffDays > 30 ) {
                // showError1(date, ' ');
                // showError1(month, ' ');
                showError1(year,'No. of days are more than 30');
            }
            else {
                // showSuccess1(date);
                // showSuccess1(month);
                showSuccess1(year);
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






