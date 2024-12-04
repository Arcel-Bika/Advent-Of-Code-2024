import re


def collect_data(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = file.readlines()
        return [line.strip() for line in data]
    except FileNotFoundError:
        print(f"Erreur : Le fichier '{file_path}' est introuvable.")
        return []


def count_x_mas():
    data = collect_data("input.txt")

    # Dictionnaires pour les motifs à chercher
    my_dict_1 = {"line_1": r"(M{1})([A-Z]{1})(M{1})", "line_2": r"([A-Z]{1})(A{1})([A-Z]{1})", "line_3": r"(S{1})([A-Z]{1})(S{1})"}
    my_dict_2 = {"line_1": r"(S{1})([A-Z]{1})(S{1})", "line_2": r"([A-Z]{1})(A{1})([A-Z]{1})", "line_3": r"(M{1})([A-Z]{1})(M{1})"}
    my_dict_3 = {"line_1": r"(M{1})([A-Z]{1})(S{1})", "line_2": r"([A-Z]{1})(A{1})([A-Z]{1})", "line_3": r"(M{1})([A-Z]{1})(S{1})"}
    my_dict_4 = {"line_1": r"(S{1})([A-Z]{1})(M{1})", "line_2": r"([A-Z]{1})(A{1})([A-Z]{1})", "line_3": r"(S{1})([A-Z]{1})(M{1})"}

    count = 0

    # Parcourir la grille pour vérifier les motifs
    n, m = len(data), len(data[0])

    for i in range(1, n - 1):
        for j in range(1, m - 1):
            # Vérifier le premier motif
            line_1 = data[i - 1][j - 1:j + 2]
            line_2 = data[i][j - 1:j + 2]
            line_3 = data[i + 1][j - 1:j + 2]

            # Appliquer les regex pour chaque motif
            if re.match(my_dict_1["line_1"], line_1) and re.match(my_dict_1["line_2"], line_2) and re.match(
                    my_dict_1["line_3"], line_3):
                count += 1
            elif re.match(my_dict_2["line_1"], line_1) and re.match(my_dict_2["line_2"], line_2) and re.match(
                    my_dict_2["line_3"], line_3):
                count += 1
            elif re.match(my_dict_3["line_1"], line_1) and re.match(my_dict_3["line_2"], line_2) and re.match(
                    my_dict_3["line_3"], line_3):
                count += 1
            elif re.match(my_dict_4["line_1"], line_1) and re.match(my_dict_4["line_2"], line_2) and re.match(
                    my_dict_4["line_3"], line_3):
                count += 1

    return count


if __name__ == "__main__":
    print("Nombre de X-MAS trouvés :", count_x_mas())
