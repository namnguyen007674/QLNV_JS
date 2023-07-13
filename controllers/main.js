//=========== DOM ================
function getElement(selector) {
  return document.querySelector(selector);
}

// Danh sách nhân viên
let employees = [];

init();
function init() {
  employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees = employees.map((value) => {
    return new Employee(
      value.username,
      value.name,
      value.email,
      value.password,
      value.date,
      value.basicSalary,
      value.position,
      value.time
    );
  });
  employees.sort((a, b) => {
   return a.username - b.username
  });
  // employees.sort(username)
  display(employees);
}
//Hàm lưu thông tin trong Local và hiển thị cho người dùng
// Biến để kiểm tra xem đã submit chưa
let isSubmitted = false;
// Thêm nhân viên
function addEmployee() {
  isSubmitted = true;
  // Kiểm tra thông tin input và tạo đối tượng nhân viên

  let employee = validate();
  if (!validate) {
    return;
  }

  //Đẩy employee vào danh sách nhân viên
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  //Ẩn Modal
  $("#myModal").modal("hide");
  //Hiển thị danh sách nhân viên
  display(employees);
  //Reset Form
  resetForm();
  
}

function resetForm() {
  isSubmitted = true;
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "";
  getElement("#gioLam").value = "";

  getElement("#tbTKNV").innerHTML = "";
  getElement("#tbTen").innerHTML = "";
  getElement("#tbEmail").innerHTML = "";
  getElement("#tbMatKhau").innerHTML = "";
  getElement("#tbNgay").innerHTML = "";
  getElement("#tbLuongCB").innerHTML = "";
  getElement("#tbChucVu").innerHTML = "";
  getElement("#tbGiolam").innerHTML = "";

  getElement("#btnThemNV").disabled = false;
  getElement("#tknv").disabled = false;
}

function deleteEmployee(employeeId) {
  let newEmployees = employees.filter((value) => {
    return value.username !== employeeId;
  });
  employees = newEmployees;
  localStorage.setItem("employees", JSON.stringify(employees));
  display(employees);
}

function selectEmployee(employeeId) {
  //Hiển thị Modal
  $("#myModal").modal("show");
  document.getElementById("header-title").innerHTML = "UPDATE"
  document.getElementById("btnCapNhat").classList.remove("d-none") 
  let employee = employees.find((value) => {
    return value.username === employeeId;
  });
  getElement("#tknv").value = employee.username;
  getElement("#name").value = employee.name;
  getElement("#email").value = employee.email;
  getElement("#password").value = employee.password;
  getElement("#datepicker").value = employee.date;
  getElement("#luongCB").value = employee.basicSalary;
  getElement("#chucvu").value = employee.position;
  getElement("#gioLam").value = employee.time;

  getElement("#btnThemNV").disabled = true;
  getElement("#tknv").disabled = true;
}

function uppdateEmployee() {
  isSubmitted = true;
  let employee = validate();
  if (!validate) {
    return;
  }
  //Tìm index của employee cần cập nhật
  let index = employees.findIndex((value) => {
    return value.username === employee.username;
  });
  //Gán giá trị mới
  employees[index] = employee;
  localStorage.setItem("employees", JSON.stringify(employees));
  //Đóng Modal
  $("#myModal").modal("hide");
  //Hiển thị
  display(employees);
  //resetForm
  resetForm();
}

function add(){
  document.getElementById("header-title").innerHTML = "LOG IN"
    // Disabled Updatte
    document.getElementById("btnCapNhat").classList.add("d-none") 
  resetForm()
}
function closeModal() {
  resetForm();
}




function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
        <tr>
            <td>${value.username}</td>
            <td class="td-name">${value.name}</td>
            <td class="td-email ">${value.email}</td>
            <td>${value.date}</td>
            <td >${value.position}</td>
            <td>${value.totalSalary()}</td>
            <td>${value.rankForEmloyees()}</td>
            <td>
            <button class="btn btn-warning" onclick="selectEmployee('${
              value.username
            }')"  >Xem</button>  
            <button class="btn btn-danger" onclick="deleteEmployee('${
              value.username
            }')">Xoá</button>
            </td>
        </tr>    
      `
    );
  }, "");
  document.getElementById("tableDanhSach").innerHTML = html;
}

// function findEmloyee(){
//   let search = document.getElementById("searchName").value
//   search = search.trim().toLowerCase()

//   let employee = employees.filter((value)=>{
//     let typeOfUser = value.rankForEmloyees().trim().toLowerCase()
//     return typeOfUser.includes(search)

//   })

//   display(employee)

// }
// Sự kiệN onkeypress và hàm tìm kiếm
getElement("#searchName").onkeypress = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();
  let employee = employees.filter((value) => {
    let typeOfUser = value.rankForEmloyees().trim().toLowerCase();
    return typeOfUser.includes(search);
  });

  display(employee);
};

//Check thông tin
// Kiểm tra các điều kiện input
//Kiểm tra chuỗi rỗng
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}
// Kiểm tra tài khoản
function isUser(value) {
  let regex = /^\d{4,6}$/;
  return regex.test(value);
}
// Kiểm tra tên người dùng
function isUserName(value) {
  let regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if (!isNaN(value)) {
    return false;
  } else if (regex.test(value)) {
    return false;
  }
  return true;
}
// Kiểm tra mail
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}
// Kiểm tra password
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;
  return regex.test(value);
}
// Kiểm tra date
function isDate(value) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;
  return regex.test(value);
}
//Kiểm tra hợp lệ input
function validate() {
  let username = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let basicSalary = getElement("#luongCB").value;
  let position = getElement("#chucvu").value;
  let time = getElement("#gioLam").value;

  let employee = new Employee(
    username,
    name,
    email,
    password,
    date,
    +basicSalary,
    position,
    +time
  );

  let isValid = true;

  let spanUserName = document.getElementById("tbTKNV");
  spanUserName.classList.add("d-block");
  if (!isRequired(username)) {
    //Chuỗi rỗng
    isValid = false;
    spanUserName.innerHTML = `Tài khoản không được để trống`;
  } else if (!isUser(username)) {
    isValid = false;
    spanUserName.innerHTML.innerHTML = ` Tài khoản tối đa 4 - 6 ký số`;
  }

  let spanName = document.getElementById("tbTen");
  spanName.classList.add("d-block");
  if (!isRequired(name)) {
    //Chuỗi rỗng
    isValid = false;
    spanName.innerHTML = ` Tên không được để trống`;
  } else if (!isUserName(name)) {
    isValid = false;
    spanName.innerHTML = `Tên nhân viên phải là chữ`;
  }

  let spanEmail = document.getElementById("tbEmail");
  spanEmail.classList.add("d-block");
  if (!isRequired(email)) {
    isValid = false;
    spanEmail.innerHTML = `Email không được để trống`;
  } else if (!isEmail(email)) {
    isValid = true;
    spanEmail.innerHTML = `Email không hợp lệ`;
  }

  let spanPw = document.getElementById("tbMatKhau");
  spanPw.classList.add("d-block");
  if (!isRequired(password)) {
    isValid = false;
    spanPw.innerHTML = `Mật khẩu không được để trống`;
  } else if (!isPassword(password)) {
    isValid = true;
    spanPw.innerHTML = ` Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)`;
  }

  let spanDate = document.getElementById("tbNgay");
  spanDate.classList.add("d-block");
  if (!isRequired(date)) {
    isValid = false;
    spanDate.innerHTML = `Ngày làm không được để trống`;
  } else if (!isDate(date)) {
    isValid = false;
    spanDate.innerHTML = `mm/dd/yyyy`;
  }

  let spanBasicSalary = document.getElementById("tbLuongCB");
  spanBasicSalary.classList.add("d-block");
  if (!isRequired(basicSalary)) {
    isValid = false;
    spanBasicSalary.innerHTML = ` Lương không được để trống`;
  } else if (+basicSalary < 1e6 || basicSalary > 20e6) {
    isValid = false;
    spanBasicSalary.innerHTML = ` Lương cơ bản 1 000 000 - 20 000 000 `;
  }

  let spanPosition = document.getElementById("tbChucVu");
  spanPosition.classList.add("d-block");
  if (!isRequired(position)) {
    isValid = false;
    spanPosition.innerHTML = `Chức vụ không được để trống`;
  }

  let spanTime = document.getElementById("tbGiolam");
  spanTime.classList.add("d-block");
  if (!isRequired(time)) {
    isValid = false;
    spanTime.innerHTML = ` Giờ làm không được để trống`;
  } else if (+time < 80 || time > 200) {
    isValid = false;
    spanTime.innerHTML = ` Số giờ làm trong tháng 80 - 200 giờ `;
  }

  if (isValid) {
    return employee;
  }
  return undefined;
}

// Sự kiện oninput

document.getElementById("tknv").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbTKNV").innerHTML = "";
  } else {
    document.getElementById(
      "tbTKNV"
    ).innerHTML = ` Tài khoản không được bỏ trống`;
  }
};

document.getElementById("name").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbTen").innerHTML = "";
  } else {
    document.getElementById("tbTen").innerHTML = ` Tên không được bỏ trống`;
  }
};

document.getElementById("email").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbEmail").innerHTML = "";
  } else {
    document.getElementById("tbEmail").innerHTML = ` Mail không được bỏ trống`;
  }
};

document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbMatKhau").innerHTML = "";
  } else {
    document.getElementById(
      "tbMatKhau"
    ).innerHTML = ` Mật khẩu không được bỏ trống`;
  }
};

document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbMatKhau").innerHTML = "";
  } else {
    document.getElementById(
      "tbMatKhau"
    ).innerHTML = ` Mật khẩu không được bỏ trống`;
  }
};

document.getElementById("datepicker").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbNgay").innerHTML = "";
  } else {
    document.getElementById("tbNgay").innerHTML = ` Ngày không được bỏ trống`;
  }
};

document.getElementById("luongCB").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbLuongCB").innerHTML = "";
  } else {
    document.getElementById(
      "tbLuongCB"
    ).innerHTML = ` Lương không được bỏ trống`;
  }
};

document.getElementById("chucvu").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbChucVu").innerHTML = "";
  } else {
    document.getElementById(
      "tbChucVu"
    ).innerHTML = ` Chức vụ không được bỏ trống`;
  }
};

document.getElementById("gioLam").oninput = (event) => {
  if (!isSubmitted) {
    return;
  }
  if (isRequired(event.target.value)) {
    document.getElementById("tbGiolam").innerHTML = "";
  } else {
    document.getElementById(
      "tbGiolam"
    ).innerHTML = ` Giờ làm không được bỏ trống`;
  }
};
