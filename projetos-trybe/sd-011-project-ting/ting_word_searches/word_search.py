def exists_word(word, instance):
    all_queue = instance.all_queue()
    word_info = list()
    word_occurencies = list()

    for file_info in all_queue:
        file_rows = file_info["linhas_do_arquivo"]
        file_name = file_info['nome_do_arquivo']
        for index, line in enumerate(file_rows):
            if word in line:
                word_occurencies.append({"linha": index + 1})

        if len(word_occurencies) >= 1:
            new_info = dict()
            new_info["palavra"] = word
            new_info["arquivo"] = file_name
            new_info["ocorrencias"] = word_occurencies

            word_info.append(new_info)
    return word_info


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
