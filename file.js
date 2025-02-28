// Used to make array and get the data
let ArrayData = localStorage.getItem("studentData") ? JSON.parse(localStorage.getItem("studentData")) : [];

// Select input fields and button

let studentForm = document.getElementById("StudForm");
let studentName = document.getElementById("StudName");
let id = document.getElementById("StudID");
let email = document.getElementById("EmailID");
let contact = document.getElementById("TelNo");

// Adding Listeners
studentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents page refresh

  // For Check for the empty and validation
    if (studentName.value.trim() === "" || id.value.trim() === "" || email.value.trim() === "" || contact.value.trim() === "") {
        alert("Please fill all the fields");
        return;
    }

    let data = {
        name: studentName.value,
        id: id.value,
        email: email.value,
        contact: contact.value
    };

  
    ArrayData.push(data);
    localStorage.setItem("studentData", JSON.stringify(ArrayData));


    studentForm.reset();

  
    MainFunc();
});

// Function to display records
function MainFunc() {
    let records = document.getElementById("add");
    records.innerHTML = ArrayData.map((data) => {
        return `<tr>
            <td>${data.name}</td>
            <td>${data.id}</td>
            <td>${data.email}</td>
            <td>${data.contact}</td>
            <td>
                <button class="delete" onClick="Del('${data.id}')">Delete</button>
                <button class="edit" onClick="Editor('${data.id}')">Edit</button>
            </td>
        </tr>`;
    }).join('');
}

// Function for delete the record 
function Del(studentId) {
    let index = ArrayData.findIndex((data) => data.id === studentId);
    if (index !== -1) {
        ArrayData.splice(index, 1); 
    }
    localStorage.setItem("studentData", JSON.stringify(ArrayData));
    MainFunc();
}

// Function to edit a record
function Editor(studentId) {
    let data = ArrayData.find((data) => data.id === studentId);
    
    if (data) {
        studentName.value = data.name;
        id.value = data.id;
        email.value = data.email;
        contact.value = data.contact;
    }
}

// to load the function 
window.onload = MainFunc;
