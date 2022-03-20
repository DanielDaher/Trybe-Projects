import sys


def txt_importer(path_file):
    stderr = sys.stderr

    if path_file.endswith("txt"):
        try:
            with open(path_file, "r") as file:
                return file.read().splitlines()
        except FileNotFoundError:
            return print(f"Arquivo {path_file} não encontrado", file=stderr)

    print('Formato inválido', file=stderr)
