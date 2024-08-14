const apiKey = 'AIzaSyAs-S_oQt6TaTAFvqq6SfaDDZWAtEhXL-4';
let currentCategory = 'Architecture';
let startIndex = 0;
const maxResults = 6;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    loadBooks(currentCategory);

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
        console.log('Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Data:', data);

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
        const bookElement = createBookElement(bookInfo, book.id);
        booksContainer.appendChild(bookElement);
    });
};

const createBookElement = (bookInfo, bookId) => {
    const template = document.querySelector('.book-card').cloneNode(true);

    template.style.display = 'block';
    template.querySelector('.book-photo').src = bookInfo.imageLinks?.thumbnail || 'placeholder.jpg';
    template.querySelector('.author').textContent = bookInfo.authors?.join(', ') || 'Unknown author';
    template.querySelector('.title').textContent = bookInfo.title || 'No title available';
    template.querySelector('.average-rating').textContent = bookInfo.averageRating ? createRatingStars(bookInfo.averageRating) : '';
    template.querySelector('.review-number').textContent = bookInfo.ratingsCount ? `(${bookInfo.ratingsCount})` : '';
    template.querySelector('.description').textContent = truncateText(bookInfo.description || 'No description available', 3);
    template.querySelector('.price').textContent = bookInfo.saleInfo?.listPrice ? `${bookInfo.saleInfo.listPrice.amount} ${bookInfo.saleInfo.listPrice.currencyCode}` : '';
    
    template.querySelector('.button-buy').addEventListener('click', () => toggleCartItem(bookId, template.querySelector('.button-buy')));

    return template;
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
    const stars = Math.round(averageRating);
    return `stars${stars}.png`; // Placeholder, replace with actual star images.
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
};
