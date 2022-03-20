from src.jobs import read


def get_unique_job_types(path):
    result = set()
    for row in read(path):
        result.add(row["job_type"])
    return result


def filter_by_job_type(jobs, job_type):
    filtered_jobs = []
    for job in jobs:
        if job["job_type"] == job_type:
            filtered_jobs.append(job)
    return filtered_jobs


def get_unique_industries(path):
    result = set()
    for row in read(path):
        industry = row["industry"]
        if not industry.strip() == '':
            result.add(row["industry"].strip())
    return result


def filter_by_industry(jobs, industry):
    return [job for job in jobs if job["industry"] == industry]


def get_max_salary(path):
    biggest_salary = 0
    for row in read(path):
        salary = row["max_salary"]
        if not salary.strip() == '':
            if not salary == 'invalid':
                if int(salary) > int(biggest_salary):
                    biggest_salary = salary
    print(biggest_salary)
    return int(biggest_salary)


def get_min_salary(path):
    data = read(path)
    current = 0
    min_salary = data[current]["min_salary"]

    while min_salary == '' or min_salary == 'invalid':
        current = current + 1
        min_salary = data[current]["min_salary"]

    for row in data:
        current_salary = row["min_salary"]
        if current_salary.strip() != '' and not current_salary == 'invalid':
            if int(current_salary) < int(min_salary):
                min_salary = current_salary
    return int(min_salary)


def matches_salary_range(job, salary):
    try:
        job_is_valid = True
        if (
            type(job["min_salary"]) != int
            or type(job["max_salary"]) != int
            or job["min_salary"] > job["max_salary"]
            or type(salary) != int
        ):
            job_is_valid = False
        if not job_is_valid:
            raise ValueError()

        return job["min_salary"] <= salary <= job["max_salary"]
    except KeyError:
        raise ValueError()


def filter_by_salary_range(jobs, salary):
    if type(salary) != int:
        return []
    results = []
    for job in jobs:
        if (
            type(job["min_salary"]) == int
            or type(job["max_salary"]) == int
            or job["min_salary"] <= job["max_salary"]
        ):
            if job["min_salary"] <= salary <= job["max_salary"]:
                results.append(job)
    return results
