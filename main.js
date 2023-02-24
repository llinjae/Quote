const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// 새 명언 추가해야함

function newQuote() {
    // quoteContainer을 보여주고, loader는 숨긴다.
    showLoadingSpinner();
    // 랜덤하게 나오도록 Math.random 메서드로 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // author이 없으면 Unknown이 표시되고 아니면 author이 표시되게
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // 글자수가 120자 초과이면 long-quote를 추가해줌으로써 글자 크기가 조절되도록!!
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}



async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    } catch (error) {

    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();