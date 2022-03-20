from src.sorting import sort_by
import pytest

jobs = [
    {
        'min_salary': 1000,
        'max_salary': 2000,
        'date_posted': '2022-01-21',
    },
    {
        'max_salary': 3000,
        'date_posted': '2020-01-21',
    },
    {
        'min_salary': 4000,
        'date_posted': '2021-01-21',
    },
    {
        'min_salary': 5000,
        'max_salary': 8000,
    },
]

sorted_jobs_results = {
    'min_salary': [jobs[0], jobs[2], jobs[3], jobs[1]],
    'max_salary': [jobs[3], jobs[1], jobs[0], jobs[2]],
    'date_posted': [jobs[0], jobs[2], jobs[1], jobs[3]]
}


def test_sort_by_criteria():
    with pytest.raises(TypeError):
        sort_by()
    criterias = ['max_salary', 'min_salary', 'date_posted']

    for criteria in criterias:
        sort_by(jobs, criteria)
        assert jobs == sorted_jobs_results[criteria]
