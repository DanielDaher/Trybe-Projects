from collections import Counter
from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    def get_products_stocked_by_company(products_list):
        company_names = []
        response = "Produtos estocados por empresa: \n"
        for company in products_list:
            company_names.append(company["nome_da_empresa"])

        companies_stock = Counter(company_names)
        for company in companies_stock:
            response += f"- {company}: {companies_stock[company]}\n"
        return response

    def generate(products_list):
        simple_report = SimpleReport.generate(products_list)
        stocks = CompleteReport.get_products_stocked_by_company(products_list)
        return f"{simple_report}\n" f"{stocks}"
