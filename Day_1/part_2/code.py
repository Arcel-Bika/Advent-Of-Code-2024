def collect_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    lines = content.split("\n")

    list_1 = []
    list_2 = []

    for line in lines:
        if line.strip() == "":
            continue

        cols = line.strip().split()
        if len(cols) >= 2:
            col1, col2 = cols[0], cols[1]

            if col1.isdigit():
                list_1.append(int(col1))
            if col2.isdigit():
                list_2.append(int(col2))

    # Trier les listes
    list_1.sort()
    list_2.sort()

    return {"list_1": list_1, "list_2": list_2}


def treat_data():
    data = collect_data("input.txt")
    my_result = []

    for i in data.get("list_1", "N'existe pas"):
        my_result.append(i * data.get("list_2", "N'existe pas").count(i))

    return sum(my_result)


print("Le resultat est : ", treat_data())
