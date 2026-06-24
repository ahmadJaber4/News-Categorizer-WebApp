import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.corpus import stopwords

# define stopwords
stop_words = set(stopwords.words('english'))

# define lemmatizer
lemmatizer = WordNetLemmatizer()

# wordnet pos function
def get_wordnet_pos(pos_tag):
    first_letter = pos_tag[0]

    if first_letter == 'J':
        return wordnet.ADJ
    elif first_letter == 'V':
        return wordnet.VERB
    elif first_letter == 'R':
        return wordnet.ADV
    else:
        return wordnet.NOUN

# text cleaning function
def cleaned_text(headline):
    clean_headline = headline.lower() # lowercase
    clean_headline = re.sub(r'[^A-Za-z]', ' ', clean_headline) # remove punctuation, numbers, and special characters
    clean_headline = word_tokenize(clean_headline) # tokenization
    clean_headline = [w for w in clean_headline if w not in stop_words] # remove stop words
    clean_headline = [lemmatizer.lemmatize(word, get_wordnet_pos(pos_tag)) # lemmatization
                      for (word, pos_tag) in nltk.pos_tag(clean_headline)]
    clean_headline = ' '.join(clean_headline)

    return clean_headline 