/**
 * Created by admin on 01.11.16.
 */
var tempJSON = '{"firstName":"Vasya","secondName":"Pupkin","thirdName":"Ignatyevich","phoneNumb":569874123,"role":"STUDENT","library":"null","studentCardId":8068984287,"group":"pm-15-2","faculty":"Primat","university":"DNU","books":[{"bookId":1,"bookName":"Sbornik_zadach","authorName":"Demidovich I. V.","publYear":1987,"number":25988,"onlyHere":null,"dateFrom":1473368400000,"dateTo":1504904400000}]}';
var result = JSON.parse(tempJSON);
var user = {};
var idCard = null;
user.firstName = result.firstName;
user.thirdName = result.thirdName;
user.secondName = result.secondName;
user.phoneNumb = result.phoneNumb;
user.cardId = result.studentCardId;
user.university = result.university;
user.faculty = result.faculty;
user.group = result.group;
user.role = result.role;
user.library = result.library;

if (user.role != "STUDENT") {   //довать или убрать кнопку добавить книгу(только для библиотекорей и админовв)
    document.getElementById('addBook1').style.display='none';
    document.getElementById('addBookToUser1').style.display='none';
    document.getElementById('addNewUser1').style.display='none';
}

document.getElementById('firstName').value = "Имя: " + user.firstName;
document.getElementById('thirdName').value = "Отчество: " + user.thirdName;
document.getElementById('secondName').value = "Фамилия: " + user.secondName;
document.getElementById('phone').value = "Телефон: " + user.phoneNumb;
document.getElementById('idStudent').value = "Id: " + user.cardId;
document.getElementById('university').value = "Университет: " + user.university;
document.getElementById('faculty').value = "Факультет : " + user.faculty;
document.getElementById('group').value = "Группа: " + user.group;

var countBooks = result.books.length;

var newElem=document.getElementById('books');
newElem.setAttribute('width','auto');
newElem.setAttribute('border','1');
var newRow=newElem.insertRow(0);
var newCell = newRow.insertCell(0);
newCell.width="150";
newCell.innerHTML="<b>Название книги</b>";

var newCell = newRow.insertCell(1);
newCell.width="150";
newCell.innerHTML="<b>Автор</b>";

var newCell = newRow.insertCell(2);
newCell.width="150";
newCell.innerHTML="<b>Год публикации</b>";

var newCell = newRow.insertCell(3);
newCell.width="150";
newCell.innerHTML="<b>id книги</b>";

var newCell = newRow.insertCell(4);
newCell.width="150";
newCell.innerHTML="<b>Количество страниц</b>";

var newCell = newRow.insertCell(5);
newCell.width="150";
newCell.innerHTML="<b>Ключевые слова</b>";

var newCell = newRow.insertCell(6);
newCell.width="150";
newCell.innerHTML="<b>Дата выдачи</b>";

var newCell = newRow.insertCell(7);
newCell.width="150";
newCell.innerHTML="<b>Дата возврата</b>";

for (var i = 1; i < countBooks + 1; i++) {
    var newRow = newElem.insertRow(i);
    var book = result.books[i - 1];

    var newCell0 = newRow.insertCell(0);
    newCell0.width = "150";
    newCell0.innerHTML = book.bookName;

    var newCell1 = newRow.insertCell(1);
    newCell1.width = "150";
    newCell1.innerHTML = book.authorName;

    var newCell2 = newRow.insertCell(2);
    newCell2.width = "150";
    newCell2.innerHTML = book.publYear;

    var newCell3 = newRow.insertCell(3);
    newCell3.width = "150";
    newCell3.innerHTML = book.number;

    var newCell4 = newRow.insertCell(4);
    newCell4.width = "150";
    newCell4.innerHTML = 300;

    var newCell5 = newRow.insertCell(5);
    newCell5.width = "150";
    newCell5.innerHTML = "Math Demidovich Task";

    var dateFrom = new Date(book.dateFrom);
    var newCell4 = newRow.insertCell(6);
    newCell4.width = "150";
    newCell4.innerHTML = dateFrom.getDay() + "." + dateFrom.getMonth() + "." + dateFrom.getFullYear();

    var dateTo = new Date(book.dateTo);
    var newCell5 = newRow.insertCell(7);
    newCell5.width = "150";
    newCell5.innerHTML = dateTo.getDay() + "." + dateTo.getMonth() + "." + dateTo.getFullYear();
}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:1488/", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            idCard = xhr.responseText;
            document.getElementById('idRFID').value = idCard;
        }
    };
    xhr.send();
};

function getID() {
    alert("zaebza");
    idCard = undefined;
    while (idCard == undefined) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:1488/", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                idCard = xhr.responseText;
                alert( idCard);
                document.getElementById('idRFID').value = idCard;
            }
        };
        xhr.send();
    }

}