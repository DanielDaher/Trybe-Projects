def study_schedule(permanence_period, target_time):
    if type(target_time) is not int:
        return None
    students_online = 0
    for beggining, ending in permanence_period:
        if (
            type(beggining) is not int
            or type(ending) is not int
        ):
            students_online = None
            break
        if beggining <= target_time <= ending:
            students_online += 1
    return students_online
