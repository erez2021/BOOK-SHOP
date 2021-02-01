'use strict'



function init() {
    createBooks()
    renderBooks()
}

function renderBooks() {
    var books = getBooks() //  getBooksForDislay() loadFromStorage(STORAGE_KEY)
    var strHtml = books.map(function (book) {
        return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td> <button onclick="onReadBook(${book.id})" class="read">Read</button></td>
            <td> <button onclick="onUpdateBook(${book.id})" class="update">Update</button></td>
            <td> <button onclick="onRemoveBook(${book.id})" class="remove">Remove</button></td> 
        </tr>
        <img src=${book.title} hidden>`
    })
    var elBooks = document.querySelector('.booksdata')
    elBooks.innerHTML = strHtml

}

// function sortById () {
//     return gBooks.sort((a ,b) => (a.id > b.id) ? 1 :-1)
// }


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook(ev) {
    ev.preventDefault()
    var elbookName = document.querySelector('input[name=bookName]');
    var elprice = document.querySelector('input[name=bookPrice]');
    var bookName = elbookName.value;
    var bookPrice = elprice.value;

    addBook(bookName, bookPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    var updateBookPrice = prompt('Enter New Price')
    updateBook(bookId, updateBookPrice)
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.title
    elModal.querySelector('h5').innerText = book.price
    elModal.querySelector('.bookImg').src = book.img
    elModal.hidden = false;
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage()
    renderBooks()
}

function onSortTable(type) {

    function swap(a, b) {
        if (type === 'price') {
            let priceA = +a.price.slice(0, a.price.length-1)
            let priceB = +b.price.slice(0, b.price.length-1)
            return priceA - priceB;
        } else {
            if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
            else return 1
        }
    }
    gBooks = gBooks.sort(swap)
    console.log('type', type, gBooks)

    renderBooks()
}