import os
import re
import sys
import math
import string
from cleantext import clean
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, Response, jsonify
import nltk 

#nltk.download('stopwords')
app = Flask(__name__, static_folder='build', static_url_path='')

@app.route('/', methods = ['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/parse', methods = ['GET', 'POST'])
def api():
    if request.method == 'POST':
        request_json = request.get_json()
        url = request.form.get('url')
        print(request_json)
        print("url", url)
        if request_json:
            url = request_json["url"]
        print("url", url)
        result = parser(url)
        json_result = jsonify(result)
        print(json_result)
        return json_result
    return jsonify(parser('https://nlp.stanford.edu/IR-book/html/htmledition/stemming-and-lemmatization-1.html'))

# Input: a string that represents a url, must have http:// format
# Output: a list of strings that contains sentences (that contain numbers) ordered by importance
def parser(url):
    # text preprocessing
    html_content = get_html(url)
    text_content = remove_html(html_content)
    list_of_sentences = split_into_sentences(text_content)
    stemmed_sentences = stem_sentences(list_of_sentences)
    indexes_with_nums = find_sentences_with_numbers(list_of_sentences)

    num_sentences = len(list_of_sentences)
    idf_vals = {}
    idx_to_tfidf = {}
    for i in indexes_with_nums:
        words = stemmed_sentences[i].split()
        sentence_length = len(words)
        tfidf_vals = count_words(words)
        sentence_tfidf = 0
        for key in tfidf_vals:
            tfidf_vals[key] = tfidf_vals[key]/sentence_length
            if not key in idf_vals:
                idf_vals[key] = math.log1p(num_sentences/word_in_how_many_sentences(key, stemmed_sentences))
            tfidf_vals[key] = tfidf_vals[key] * idf_vals[key]
            sentence_tfidf += tfidf_vals[key]
        idx_to_tfidf[i] = sentence_tfidf
    sorted_indexes = sorted(idx_to_tfidf, key=lambda x: idx_to_tfidf[x])
    sorted_sentences = [list_of_sentences[i] for i in sorted_indexes]
    return sorted_sentences

# Input: a string that represents a url, must have http:// format
# Output: a list that contains the html elements with text content in them
def get_html(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    elementNames = ['h1', 'h2', 'h3', 'h4', 'h5' 'h6', 'p' ,'td', 'li']
    html_elements = []
    for element in elementNames:
        html_elements.extend(soup.find_all(element))
    return html_elements

# Input: a list of strings, where each string is an html element
# Output: a list of strings, where each string is the just of the content with the html removed
def remove_html(list_of_html):
    sentences = []
    for item in list_of_html:
        line = item.get_text()
        if not line.isspace():
            line = line.strip(' ')
            sentences.append(line)
    return sentences

# Input: a list of strings, where each string may contain one or more sentences
# Output: a list of strings, where each string contains just one sentence
def split_into_sentences(list_of_text):
    alphabets= "([A-Za-z])"
    prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
    suffixes = "(Inc|Ltd|Jr|Sr|Co)"
    starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
    acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
    websites = "[.](com|net|org|io|gov)"
    digits = "([0-9])"
    all_sentences = []
    for text in list_of_text:
        text = " " + text + "  "
        text = text.replace("\n"," ")
        text = text.replace("\t", "")
        text = text.replace("–", "-")
        text = re.sub(digits + "[.]", "\\1<prd>", text)
        text = re.sub(digits + "<prd>(?![0-9])", "\\1.",  text)
        text = re.sub(prefixes,"\\1<prd>",text)
        text = re.sub(websites,"<prd>\\1",text)
        if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
        text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
        text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
        text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
        text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
        text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
        text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
        text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
        if "”" in text: text = text.replace(".”","”.")
        if "\"" in text: text = text.replace(".\"","\".")
        if "!" in text: text = text.replace("!\"","\"!")
        if "?" in text: text = text.replace("?\"","\"?")
        text = text.replace(".",".<stop>")
        text = text.replace("?","?<stop>")
        text = text.replace("!","!<stop>")
        text = text.replace("<prd>",".")
        sentences = text.split("<stop>")
        sentences = sentences[:-1]
        sentences = [s.strip() for s in sentences]
        all_sentences.extend(sentences)
    return all_sentences

# Input: a list of strings, where each string is a sentence
# Output: a list of strings, where each string is the input sentence but stemmed and punctuation removed
def stem_sentences(list_of_sentences):
    stemmed = []
    for sentence in list_of_sentences:
        sentence = re.sub("(["+string.punctuation+"])", " ", sentence)
        sentence = clean(sentence,
            all = False,            # Execute all cleaning operations
            extra_spaces = True,    # Remove extra white space 
            stemming = True,        # Stem the words
            stopwords = True,       # Remove stop words
            lowercase = True,       # Convert to lowercase
            numbers = True,        # Remove all digits 
            punct = False,          # Remove all punctuations
            stp_lang ='english'     # Language for stop words
        )
        stemmed.append(sentence)
    return stemmed

# Input: a list of strings where each string contains just one sentence
# Output: a list of indexes for the sentences that contain digits
def find_sentences_with_numbers(list_of_sentences):
    indexes_with_nums = []
    for i in range(len(list_of_sentences)):
        sentence = list_of_sentences[i]
        if any(char.isdigit() for char in sentence) and len(sentence) > 5:
            indexes_with_nums.append(i)
    return indexes_with_nums 

# Input: a list of strings, each string is an indiv lowercase word
# Output: dictionary with key: value as string (word): int (number of occurences of word)
def count_words(arr_of_words):
    dictionary = {}
    for word in arr_of_words:
        if word in dictionary:
            dictionary[word] = dictionary[word] + 1
        else:
            dictionary[word] = 1
    return dictionary

# Input: string representing a single word
# Input: an array of strings, each representing a single sentence
# Output: an integer representing how many sentences contain the word
def word_in_how_many_sentences(word, arr_of_sentences):
    count = 0
    for sentence in arr_of_sentences:
        if word in sentence:
            count +=1
    return count

#print(parse(sys.argv[1]))
# if __name__ == '__main__':
#     app.run(port=3000,debug = True)

if __name__ == "__main__": 
    app.run(host='0.0.0.0', debug=True, port=os.environ.get('PORT', 80)) 
