def is_palindrome_recursive(word, low_index, high_index):
    if not word:
        return False
    if word[low_index] != word[high_index]:
        return False
    if low_index >= high_index:
        return True
    next = low_index + 1
    before = high_index - 1
    return True and is_palindrome_recursive(word, next, before)
