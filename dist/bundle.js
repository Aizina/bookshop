/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/styles/main.css?");

/***/ }),

/***/ "./src/books.js":
/*!**********************!*\
  !*** ./src/books.js ***!
  \**********************/
/***/ (() => {

eval("const apiKey = 'AIzaSyAs-S_oQt6TaTAFvqq6SfaDDZWAtEhXL-4';\r\nlet currentCategory = 'Architecture';\r\nlet startIndex = 0;\r\nconst maxResults = 6;\r\nlet cart = JSON.parse(localStorage.getItem('cart')) || [];\r\nlet inCart = 0;\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    loadBooks(currentCategory);\r\n    displayCartItem();\r\n\r\n    const categoryItems = document.querySelectorAll('.category-item');\r\n    categoryItems.forEach(item => {\r\n        item.addEventListener('click', (e) => {\r\n            document.querySelector('.category-item.active').classList.remove('active');\r\n            e.target.classList.add('active');\r\n            currentCategory = e.target.dataset.category;\r\n            startIndex = 0;\r\n            document.querySelector('.books-container').innerHTML = '';\r\n            loadBooks(currentCategory);\r\n        });\r\n    });\r\n\r\n    document.getElementById('load-more').addEventListener('click', () => {\r\n        loadBooks(currentCategory);\r\n    });\r\n});\r\n\r\nconst loadBooks = async (category) => {\r\n    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`;\r\n\r\n    console.log('Fetching URL:', url);\r\n\r\n    try {\r\n        const response = await fetch(url);\r\n        console.log('Response Status:', response.status); // Логирование статуса ответа\r\n\r\n        if (!response.ok) {\r\n            throw new Error(`HTTP error! Status: ${response.status}`);\r\n        }\r\n\r\n        const data = await response.json();\r\n        console.log('API Data:', data); // Логирование полученных данных\r\n\r\n        if (data.error) {\r\n            throw new Error(`API error! ${data.error.message}`);\r\n        }\r\n\r\n        displayBooks(data.items);\r\n        startIndex += maxResults;\r\n        document.getElementById('load-more').style.display = data.totalItems > startIndex ? 'block' : 'none';\r\n    } catch (error) {\r\n        console.error('Error:', error.message);\r\n    }\r\n};\r\n\r\nconst displayBooks = (books) => {\r\n    const booksContainer = document.querySelector('.books-container');\r\n    \r\n    books.forEach(book => {\r\n        const bookInfo = book.volumeInfo;\r\n        const priceInfo = book.saleInfo.listPrice;\r\n        const bookElement = createBookElement(bookInfo, book.id, priceInfo);\r\n        booksContainer.appendChild(bookElement);\r\n    });\r\n};\r\n\r\nconst createBookElement = (bookInfo, bookId, priceInfo) => {\r\n    const bookElement = document.createElement('div');\r\n    bookElement.className = 'book-card';\r\n\r\n    const thumbnail = bookInfo.imageLinks?.thumbnail || 'placeholder.jpg';\r\n    const authors = bookInfo.authors?.join(', ') || 'Unknown author';\r\n    const title = bookInfo.title || 'No title available';\r\n    const description = truncateText(bookInfo.description || 'No description available', 3);\r\n    const rating = createRatingStars(bookInfo.averageRating);\r\n    const reviewCount = bookInfo.ratingsCount ? `(${bookInfo.ratingsCount})` : Math.floor(Math.random() * 30000) + 1;\r\n    const price = priceInfo ? `${priceInfo.amount} ${priceInfo.currencyCode}` : 'Price not available';\r\n\r\n    bookElement.innerHTML = `\r\n        <div class=\"book-photo-div\">\r\n            <img class=\"book-photo\" src=\"${thumbnail}\" alt=\"${title}\">\r\n        </div>\r\n        <div class=\"book-info-div\">\r\n            <p class=\"author\">${authors}</p>\r\n            <h2 class=\"title\">${title}</h2>\r\n            <img class=\"average-rating\" src=\"${rating}\" alt=\"average rating\">\r\n            <span class=\"review-number\">${reviewCount} review </span>\r\n            <p class=\"description\">${description}</p>\r\n            <p class=\"price\">${price}</p>\r\n            <button class=\"button-buy ${isInCart(bookId) ? 'in-cart' : ''}\" data-id=\"${bookId}\">\r\n                ${isInCart(bookId) ? 'Remove from cart' : 'Buy now'}\r\n            </button>\r\n        </div>\r\n    `;\r\n\r\n    bookElement.querySelector('.button-buy').addEventListener('click', (e) => {\r\n        toggleCartItem(e.target.dataset.id, e.target);\r\n    });\r\n\r\n    return bookElement;\r\n};\r\n\r\nconst truncateText = (text, lines) => {\r\n    const lineHeight = 1.2; // Approximate line height in rem\r\n    const maxHeight = lines * lineHeight * 16; // Convert to pixels\r\n    const el = document.createElement('div');\r\n    el.style.position = 'absolute';\r\n    el.style.visibility = 'hidden';\r\n    el.style.lineHeight = `${lineHeight}rem`;\r\n    el.style.width = '300px';\r\n    el.innerText = text;\r\n    document.body.appendChild(el);\r\n    if (el.offsetHeight > maxHeight) {\r\n        let truncated = text;\r\n        while (el.offsetHeight > maxHeight) {\r\n            truncated = truncated.substring(0, truncated.length - 1);\r\n            el.innerText = truncated + '...';\r\n        }\r\n    }\r\n    document.body.removeChild(el);\r\n    return el.innerText;\r\n};\r\n\r\nconst createRatingStars = (averageRating) => {\r\n    const rating = averageRating ? Math.round(averageRating) : Math.floor(Math.random() * 5) + 1;\r\n    return `img/stars${rating}.png`; \r\n};\r\n\r\nconst isInCart = (id) => {\r\n    return cart.includes(id);\r\n};\r\n\r\nconst toggleCartItem = (id, button) => {\r\n    if (isInCart(id)) {\r\n        cart = cart.filter(item => item !== id);\r\n        button.classList.remove('in-cart');\r\n        button.innerText = 'Buy now';\r\n    } else {\r\n        cart.push(id);\r\n        button.classList.add('in-cart');\r\n        button.innerText = 'Remove from cart';\r\n    }\r\n    localStorage.setItem('cart', JSON.stringify(cart));\r\n    const inCart = JSON.parse(localStorage.getItem('cart')).length;\r\n    document.getElementById('cart').innerHTML = inCart;\r\n};\r\n\r\nconst displayCartItem = () => {\r\n    const cart = JSON.parse(localStorage.getItem('cart')) || [];\r\n    const inCart = cart.length;\r\n    document.getElementById('cart').innerHTML = inCart;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/books.js?");

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ (() => {

eval("let navButton = document.getElementById('navButtonId');\r\nlet navList = document.getElementById('navListId');\r\n\r\nnavButton.addEventListener('click', () => {\r\n    navList.classList.toggle('hide');\r\n});\r\n\n\n//# sourceURL=webpack://bookshop/./src/header.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ \"./src/styles/main.css\");\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.js */ \"./src/header.js\");\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_header_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _books_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./books.js */ \"./src/books.js\");\n/* harmony import */ var _books_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_books_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider.js */ \"./src/slider.js\");\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_slider_js__WEBPACK_IMPORTED_MODULE_3__);\n // Ensure the path starts with './'\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/main.js?");

/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\r\n    const slides = document.querySelectorAll('.slide');\r\n    const sliderButtons = document.querySelectorAll('.slider-button');\r\n    let currentIndex = 0;\r\n    const intervalTime = 6000; // 6 секунд\r\n    let autoSlideInterval; // Объявление переменной для хранения идентификатора интервала\r\n  \r\n    function showSlide(index) {\r\n      if (index < 0) {\r\n        index = slides.length - 1;\r\n      } else if (index >= slides.length) {\r\n        index = 0;\r\n      }\r\n\r\n      slides.forEach((slide) => {\r\n      slide.style.display = 'none';\r\n      });\r\n      sliderButtons.forEach((button) => {\r\n        button.classList.remove('active');\r\n      });\r\n  \r\n      slides[index].style.display = 'block';\r\n      sliderButtons[index].classList.add('active');\r\n      currentIndex = index;\r\n    }\r\n  \r\n    sliderButtons.forEach((button, index) => {\r\n      button.addEventListener('click', () => {\r\n        showSlide(index);\r\n        resetInterval();\r\n      });\r\n    });\r\n  \r\n    function startAutoSlide() {\r\n      autoSlideInterval = setInterval(() => {\r\n        currentIndex++;\r\n        showSlide(currentIndex);\r\n      }, intervalTime);\r\n    }\r\n\r\n    function resetInterval() {\r\n      clearInterval(autoSlideInterval);\r\n      startAutoSlide();\r\n    }\r\n\r\n    showSlide(currentIndex);\r\n    startAutoSlide();\r\n  });\r\n  \n\n//# sourceURL=webpack://bookshop/./src/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;