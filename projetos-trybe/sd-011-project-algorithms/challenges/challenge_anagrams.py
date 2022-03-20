def check_if_is_anagram(first_string, second_string):
    all_letters = list(first_string.lower() + second_string.lower())
    letters = []
    repeated_letters = []
    turn = 0
    added = True

    while all_letters:
        added = False
        low_letter = min(all_letters)
        current_index = all_letters.index(low_letter)
        while turn % 2 == 0:
            letters.append(low_letter)
            added = True
            turn += 1
        while turn % 2 != 0 and not added:
            repeated_letters.append(low_letter)
            turn += 1
        all_letters.pop(current_index)

    if letters == repeated_letters:
        return True
    return False


def is_anagram(first_string, second_string):
    if len(first_string) != len(second_string):
        return False

    if not first_string or not second_string:
        return False

    if check_if_is_anagram(first_string, second_string):
        return True
    return False
