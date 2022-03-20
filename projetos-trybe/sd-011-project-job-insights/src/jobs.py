from functools import lru_cache
import csv


@lru_cache
def read(path):
    # https://docs.python.org/3/library/csv.html#csv.DictReader
    with open(path, "r") as file:
        jobs_reader = csv.DictReader(file)
        result = []
        for row in jobs_reader:
            result.append(row)
    return result
