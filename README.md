# statfinder

Web app that allows users to quickly find relevant statistics from a webpage

## how the api works
1. Recieve a post request from the client with the url the user wants to parse
2. Use bs4 to scrape the webpage
3. Do text preprocessing which consists of stemming the words with a Porter Stemmer, lowercasing, and removing stopwords
4. Seperate into sentences
5. Calculate a term frequency inverse document frequency (tfidf) score for each sentence
6. Use the tfidf score to order the sentences by importance
7. Return that ordered list back to the client

Can also be used with curl in the terminal
```
curl -d "url=http://google.com" -X POST https://statfinder.herokuapp.com/parse
```

Built with React and Flask
