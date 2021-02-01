'use strict'

const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 4;
var gPageIdx = 0

var gBookId = 100
var gBooks;


// function createBooks() {
//     var books = [{
//             id: 101,
//             title: 'Trump',
//             price: '16.9$',
//             img: 'images\the little mermaid.jpg',
//             rate : getRndInteger(1, 10)
//         },
//         {
//             id: 102,
//             title: 'Lion King',
//             price: '18.9$',
//             img: 'images\lion king.jpg',
//             rate : getRndInteger(1, 10)
//         },
//         {
//             id: 103,
//             title: 'The Firm',
//             price: '10.9$',
//             img: 'images\the firm.jpg',
//             rate : getRndInteger(0, 10)
//         }
//     ]
//     _saveBooksToStorage()
//     return books
// }

function getBooks() {
    var startIdx = gPageIdx*PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length ) {
        gPageIdx = 0;
    }
}

function prevPage() {
    if (gPageIdx < 1) return 
    gPageIdx--;
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        console.log(book)
        console.log(bookId)
        return book.id === bookId
    })
    if (idx === -1) return
    gBooks.splice(idx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {  // can't read the price from the user
    var currBook = gBooks.find(function (book) {
        return book.title === name
    })
    if (name === '' || price === '' || (currBook) ) {
        alert('Enter Again')
        return
    }
    var elPrice = document.querySelector('input[name=bookPrice]')
    
    var book =  {
        id: gBookId++,
        title: name,
        price: elPrice.value,
        rate: 0,
        img: getImg()
    }
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function createBook() {
    var book = {
        id: gBookId++,
        title: makeLorem(),
        price: getRndInteger(10, 25)+'.9$',
        rate: 0,
        img: getImg()
    }
    return book
}


function createBooks() {
    var books = loadFromStorage(STORAGE_KEY) //  check why not working
    if (!books || !books.length) {
        console.log('not from storage')
     books = [] 
    for (var i=0; i<17; i++) {
        
        books.push(createBook())
    }
    }
    gBooks = books
    console.log(gBooks)
    _saveBooksToStorage()
}

function sortBy(txt) { // how to make a clickble th ?
    console.log('hi')
    if (txt === title) gBooks.sort((a, b) => (a.title > b.title) ? 1 : -1)
    if (txt === price) gBooks.sort((a, b) => (a.price > b.price) ? 1 : -1)
}

function updateBook(bookId, bookPrice) {
    var currBook = gBooks.find(function(book) {
        return book.id === bookId
    })
    currBook.price = bookPrice
    _saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// var value = 0;
// function addRate() {
//     value++;
//     document.querySelector('.add').innerHTML = value;
// }

// function decrease() {
//     value--;
//     document.querySelector('.decrease').innerHTML = value;
// }

function getImg() {
    var rndImg = getRndInteger(1 ,6)
    return `images/${rndImg}.png`
}

    function makeLorem(size = 1) {
        var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', 'ball','cow','horse','rain', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
        var txt = '';
        while (size > 0) {
            size--;
            txt += words[Math.floor(Math.random() * words.length)] + ' ';
        }
        return txt;
    }
