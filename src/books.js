const apiKey = 'AIzaSyAs-S_oQt6TaTAFvqq6SfaDDZWAtEhXL-4';
let currentCategory = 'Architecture';
let startIndex = 0;
const maxResults = 6;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let inCart = 0;




document.addEventListener('DOMContentLoaded', () => {
    loadBooks(currentCategory);
    displayCartItem();

    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelector('.category-item.active').classList.remove('active');
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            startIndex = 0;
            document.querySelector('.books-container').innerHTML = '';
            loadBooks(currentCategory);
        });
    });

    document.getElementById('load-more').addEventListener('click', () => {
        loadBooks(currentCategory);
    });
});

const loadBooks = async (category) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`;

    console.log('Fetching URL:', url);

    try {
        const response = await fetch(url);
        console.log('Response Status:', response.status); // Логирование статуса ответа

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Data:', data); // Логирование полученных данных

        if (data.error) {
            throw new Error(`API error! ${data.error.message}`);
        }

        displayBooks(data.items);
        startIndex += maxResults;
        document.getElementById('load-more').style.display = data.totalItems > startIndex ? 'block' : 'none';
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const displayBooks = (books) => {
    const booksContainer = document.querySelector('.books-container');
    
    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const priceInfo = book.saleInfo.listPrice;
        const bookElement = createBookElement(bookInfo, book.id, priceInfo);
        booksContainer.appendChild(bookElement);
    });
};

const createBookElement = (bookInfo, bookId, priceInfo) => {
    const bookElement = document.createElement('div');
    bookElement.className = 'book-card';

    const thumbnail = bookInfo.imageLinks?.thumbnail || 'placeholder.jpg';
    const authors = bookInfo.authors?.join(', ') || 'Unknown author';
    const title = bookInfo.title || 'No title available';
    const description = truncateText(bookInfo.description || 'No description available', 3);
    const rating = createRatingStars(bookInfo.averageRating);
    const reviewCount = bookInfo.ratingsCount ? `(${bookInfo.ratingsCount})` : Math.floor(Math.random() * 30000) + 1;
    const price = priceInfo ? `${priceInfo.amount} ${priceInfo.currencyCode}` : 'Price not available';

    bookElement.innerHTML = `
        <div class="book-photo-div">
            <img class="book-photo" src="${thumbnail}" alt="${title}">
        </div>
        <div class="book-info-div">
            <p class="author">${authors}</p>
            <h2 class="title">${title}</h2>
            <img class="average-rating" src="${rating}" alt="average rating">
            <span class="review-number">${reviewCount} review </span>
            <p class="description">${description}</p>
            <p class="price">${price}</p>
            <button class="button-buy ${isInCart(bookId) ? 'in-cart' : ''}" data-id="${bookId}">
                ${isInCart(bookId) ? 'Remove from cart' : 'Buy now'}
            </button>
        </div>
    `;

    bookElement.querySelector('.button-buy').addEventListener('click', (e) => {
        toggleCartItem(e.target.dataset.id, e.target);
    });

    return bookElement;
};

const truncateText = (text, lines) => {
    const lineHeight = 1.2; // Approximate line height in rem
    const maxHeight = lines * lineHeight * 16; // Convert to pixels
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.lineHeight = `${lineHeight}rem`;
    el.style.width = '300px';
    el.innerText = text;
    document.body.appendChild(el);
    if (el.offsetHeight > maxHeight) {
        let truncated = text;
        while (el.offsetHeight > maxHeight) {
            truncated = truncated.substring(0, truncated.length - 1);
            el.innerText = truncated + '...';
        }
    }
    document.body.removeChild(el);
    return el.innerText;
};

const createRatingStars = (averageRating) => {
    const rating = averageRating ? Math.round(averageRating) : Math.floor(Math.random() * 5) + 1;
    return `img/stars${rating}.png`; 
};

const isInCart = (id) => {
    return cart.includes(id);
};

const toggleCartItem = (id, button) => {
    if (isInCart(id)) {
        cart = cart.filter(item => item !== id);
        button.classList.remove('in-cart');
        button.innerText = 'Buy now';
    } else {
        cart.push(id);
        button.classList.add('in-cart');
        button.innerText = 'Remove from cart';
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    const inCart = JSON.parse(localStorage.getItem('cart')).length;
    document.getElementById('cart').innerHTML = inCart;
};

const displayCartItem = () => {
    const inCart = JSON.parse(localStorage.getItem('cart')).length;
    document.getElementById('cart').innerHTML = inCart;
}




