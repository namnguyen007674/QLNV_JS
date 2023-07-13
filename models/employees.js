function Employee(
  username,
  name,
  email,
  password,
  date,
  basicSalary,
  position,
  time
) {
  this.username = username;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.basicSalary = basicSalary;
  this.position = position;
  this.time = time;
}

Employee.prototype.totalSalary = function (){
    let sum = 0
    if(this.position === "Sếp"){
        sum = this.basicSalary * 3
    }else if(this.position === "Trưởng phòng"){
        sum = this.basicSalary * 2
    }else{
        sum =this.basicSalary * 1
    }
    return sum.toLocaleString()
}

Employee.prototype.rankForEmloyees = function (){
    let rank = ""
    if(this.time >= 192){
        rank = `Xuất sắc`
    }else if(this.time >= 176){
        rank = `Giỏi`
    }else if(this.time >= 160){
        rank = `Khá`
    }else{
        rank = `Trung bình`
    }
    return rank
}















