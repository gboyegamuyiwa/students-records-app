// Select all DOM Variables
const form = document.querySelector("#form");
const fullname = document.querySelector("#fullname");
const studentId = document.querySelector("#studentId");
const grade = document.querySelector("#grade");
const sex = document.querySelector("#sex");
const msgFullname = document.querySelector("#msgFullname");
const msgStudent = document.querySelector("#msgStudent");
const msgGrade = document.querySelector("#msgGrade");
const msgSex = document.querySelector("#msgSex");
const studentsRecord = document.querySelector("#studentsRecord");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

//Input validation
const formValidation = () => {
    if (fullname.value === "") {
        msgFullname.innerHTML = "Please enter the student's fullname";
        } if (studentId.value === "") {
            msgStudent.innerHTML = "Please enter the student's ID";
            } if (grade.value === "") {
                msgGrade.innerHTML = "Please select the student's Class";
                } if (sex.value === "") {
                    msgSex.innerHTML = "Please select the student's sex";
    } else {
        acceptData();
        // Closes modal upon submit
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
          
        (() => {
            add.setAttribute("data-bs-dismiss", "");
            window.location.reload();
        })();
    }
};

let data = [];

let acceptData = () => {
    data.push({
        fullname: fullname.value, 
        studentId: studentId.value,
        grade: grade.value,
        sex: sex.value,
    });
    console.log(data);
    // Store record data in local storage
    localStorage.setItem("data", JSON.stringify(data));
    createRecord();
};

let createRecord = () => {
    studentsRecord.innerHTML = '';
    data.map((x, y) => {
        (studentsRecord.innerHTML += `
          <tr id=${y}>
            <td>${x.fullname}</td>
            <td>${x.studentId}</td>
            <td>${x.grade}</td>
            <td>${x.sex}</td>
            <td class="options">
            <i onClick= "editRecord(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            </td>
            <td class="options">
            <i onClick ="deleteRecord(this);createTasks()" class="fas fa-trash-alt"></i>
            </td>
        </tr>
        `);
    });
    resetRecord();
};


let resetRecord = () => {
    fullname.value = "";
    studentId.value = "";
    grade.value = "";
    sex.value = "";
};

let deleteRecord = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    // Store the record data into local storage
    localStorage.setItem("data", JSON.stringify(data));
};

let editRecord = (e) => {
    let selectedRow = e.parentElement.parentElement;

    fullname.value = selectedRow.cells[0].innerHTML;
    studentId.value = selectedRow.cells[1].innerHTML;
    grade.value = selectedRow.cells[2].innerHTML;
    sex.value = selectedRow.cells[3].innerHTML;
    deleteRecord(e);
};

// Get record data from local storage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createRecord();
})();

