import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    file_rows = txt_importer(path_file)

    file_info = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(file_rows),
        "linhas_do_arquivo": file_rows
    }

    repeated_file = False

    for index, _item in enumerate(instance.all_queue()):
        current_file = instance.search(index)
        if current_file == file_info:
            repeated_file = True

    if not repeated_file:
        instance.enqueue(file_info)
        print(f"{file_info}", file=sys.stdout)


def remove(instance):
    if instance.__len__() < 1:
        return print("Não há elementos")

    file_excluded = instance.search(0)["nome_do_arquivo"]
    instance.dequeue()
    return print(f"Arquivo {file_excluded} removido com sucesso")


def file_metadata(instance, position):
    try:
        file_info = instance.search(position)
        print(f"{file_info}", file=sys.stdout)
    except IndexError:
        print("Posição inválida", file=sys.stderr)
