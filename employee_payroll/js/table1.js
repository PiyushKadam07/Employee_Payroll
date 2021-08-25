window.addEventListener("DOMContentLoaded", (event) => {
     createInnerHTML();
});

// UC15
function createInnerHTML() {
    const headerHTML =
    "<thead>" +
    "<tr class = table-head>" +
    "<th></th>" +
    "<th>Name</th>" +
    "<th>Gender</th>" +
    "<th>Department</th>" +
    "<th>Salary</th>" +
    "<th>Start Date</th>" +
    "<th>Actions</th>" +
    "</thead>";

    const createEmployeePayrollJSON = () => {
        let Payrolllist = [
            {
                profile: "../assets/Ellipse 1.png",
                name: "Keerthi Kumar",
                gender: "Female",
                department: ['HR', 'Sales'],
                salary: "10000",
                startdate: "23-07-2021",
                note: 'Hello'
            },
            {
                profile: "../assets/Ellipse 2.png",
                name: "Keerthi Kumar",
                gender: "Female",
                department: ['HR', 'Sales'],
                salary: "10000",
                startdate: "23-07-2021",
                note: 'Hello'
            },
            {
                profile: "../assets/Ellipse 3.png",
                name: "Iqbal Shaikh",
                gender: "Male",
                department: ['HR', 'Sales'],
                salary: "10000",
                startdate: "23-07-2021",
                note: 'Hello'
            }
            
        ]
        return Payrolllist;
    }
    
    let table_content = `${headerHTML}`;
    
    let emparray = createEmployeePayrollJSON();
    console.log(emparray);
    let empdata = JSON.parse(localStorage.getItem("Payrolllist"));
    

    for(const empdata of emparray) {
    table_content = `${table_content}
            <tbody>
            <tr class = row>
                <td><img class = "image1" src = "../assets/Ellipse 1.png" ></td>
                <td><label>${empdata.name}</label></td>
                <td><label>${empdata.gender}</label></td>
                <td><center><label class = "department">${empdata.department[0]}</label>
                <label class = "department">${empdata.department[1]}</label></center></td>
                <td><label>₹${empdata.salary}</label></td>
                <td><label> 29 Oct 2019 </label></td>
                <td>
                    <label class = "icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#658292" height="20px" width="30px">
                        <path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="30px" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                    </label>
                </td>
            </tr>
            </tbody>
            `;
    }
    document.getElementById('detailstable').innerHTML = table_content;

}