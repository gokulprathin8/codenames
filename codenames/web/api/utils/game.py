
def player_sequence_generator(seq):
    first = "BLUE SPY MASTER IS PLAYING"
    second = "BLUE OPERATIVE IS PLAYING"
    third = "RED SPY MASTER IS PLAYING"
    fourth = "RED OPERATIVE IS PLAYING"

    if seq == first:
        return second
    if seq == second:
        return third
    if seq == third:
        return fourth
    if seq == fourth:
        return first

