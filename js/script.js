'use strict'

var prefix = "https://cors-anywhere.herokuapp.com/";

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "http://api.icndb.com/jokes/random";

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});

function getQuote() {
    fetch(prefix + quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
};

function createTweet(input) {
    
    var dataElement = document.createElement('div');
    dataElement.innerHTML = input.value.joke;

    var quoteText = dataElement.innerText.trim();
    var tweetText = "Quote of the day - " + quoteText;
    
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
};


