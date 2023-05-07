from random_word import RandomWords


def generate_words(count=1):
    lst = list()
    r = RandomWords()
    for i in range(0, count):
        lst.append(r.get_random_word())
    return lst
