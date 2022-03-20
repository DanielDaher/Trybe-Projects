from collections import Counter
import datetime


class SimpleReport:
    def get_company_with_more_products(products_list):
        company_names = []
        company_with_more_repetitinos = ""
        total = 0
        for company in products_list:
            company_names.append(company["nome_da_empresa"])
        for company in company_names:
            repetitions = Counter(company_names)[company]

            if repetitions > total:
                company_with_more_repetitinos = company
                total = total + 1
        return company_with_more_repetitinos

    def get_product_with_oldest_fabrication_date(products_list):
        fabrication_dates = []
        for date in products_list:
            fabrication_dates.append(date["data_de_fabricacao"])
        oldest_date = sorted(fabrication_dates)[0]
        return oldest_date

    def get_product_with_closest_validate_date(products_list):
        data = datetime.datetime.now()
        validate_dates = []
        for date in products_list:
            if date["data_de_validade"] > str(data):
                validate_dates.append(date["data_de_validade"])
        nearest_date = min(validate_dates)
        return nearest_date

    def generate(products_list):
        company_with_more_products = (
            SimpleReport.get_company_with_more_products(products_list)
        )
        oldest_fabrication_date = (
            SimpleReport.get_product_with_oldest_fabrication_date(
                products_list
            )
        )
        nearest_validation_date = (
            SimpleReport.get_product_with_closest_validate_date(products_list)
        )
        return (
            f"Data de fabricação mais antiga: {oldest_fabrication_date}\n"
            f"Data de validade mais próxima: {nearest_validation_date}\n"
            f"Empresa com maior quantidade de produtos estocados: "
            f"{company_with_more_products}\n"
        )
