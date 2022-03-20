from collections import defaultdict
import csv


def reader_of_csv_file(path_to_file):
    with open(path_to_file, "r") as file:
        restaurant_data = csv.reader(file)
        result = []
        for row in restaurant_data:
            result.append(row)
        return result


def make_customer_order_historic(order, day):
    customer_log = {
        "frequency": set(day),
        "orders": defaultdict(int),
    }
    customer_log["orders"][order] += 1
    return customer_log


def make_restaurant_report(order_history):
    report = dict()
    report["days_worked"] = set()
    for client_name, order, day in order_history:
        report["days_worked"].add(day)
        if client_name not in report:
            report[client_name] = make_customer_order_historic(order, day)
        else:
            report[client_name]["orders"][order] += 1
            report[client_name]["frequency"].add(day)
    return report


def analyze_log(path_to_file):
    menu_options = {"hamburguer", "pizza", "coxinha", "misto-quente"}
    order_history = reader_of_csv_file(path_to_file)
    report = make_restaurant_report(order_history)

    days_worked = report["days_worked"]
    maria_orders = report["maria"]["orders"]
    joao_orders = report["joao"]["orders"]
    joao_frequency_days = report["joao"]["frequency"]
    arnaldo_hamburger_ordered = report["arnaldo"]["orders"]["hamburguer"]

    highest_order_of_maria = max(maria_orders, key=maria_orders.get)
    not_ordered_by_joao = menu_options.difference(set(joao_orders))
    days_not_frequented_by_joao = days_worked.difference(joao_frequency_days)

    with open("data/mkt_campaign.txt", "w") as file:
        file.write(
            f"{highest_order_of_maria}\n"
            f"{arnaldo_hamburger_ordered}\n"
            f"{not_ordered_by_joao}\n"
            f"{days_not_frequented_by_joao}\n"
        )
