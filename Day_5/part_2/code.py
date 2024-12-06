def collect_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    lines = content.split("\n")

    rules = []
    pages = []

    for line in lines:
        if line.strip() == "":
            continue
        if "|" in line:
            rules.append(line)
        elif "," in line:
            pages.append(line)

    return {"rules": rules, "pages": pages}


def is_order_valid(pages, rules):
    rule_pairs = [list(map(int, rule.split("|"))) for rule in rules]

    for A, B in rule_pairs:
        try:
            index_A = pages.index(A)
            index_B = pages.index(B)
        except ValueError:
            # Si A ou B n'existent pas dans la liste, ignorer cette règle
            continue

        if index_A > index_B:  # Si A est après B, l'ordre est invalide
            return False

    return True


def fix_order(pages, rules):
    rule_pairs = [list(map(int, rule.split("|"))) for rule in rules]
    pages = pages.copy()

    for A, B in rule_pairs:
        try:
            index_A = pages.index(A)
            index_B = pages.index(B)
        except ValueError:
            # Si A ou B n'existent pas dans la liste, ignorer cette règle
            continue

        if index_A > index_B:
            # Réarranger pour que A soit avant B
            element = pages.pop(index_A)
            pages.insert(index_B, element)

    # Vérifier si la liste corrigée est valide
    if not is_order_valid(pages, rules):
        return fix_order(pages, rules)

    return pages


def treat_data(data):
    rules = data["rules"]
    page_groups = [list(map(int, page_group.split(","))) for page_group in data["pages"]]
    invalid_page_groups = [pages for pages in page_groups if not is_order_valid(pages, rules)]

    corrected_page_groups = [fix_order(pages, rules) for pages in invalid_page_groups]

    middle_sum = sum(pages[len(pages) // 2] for pages in corrected_page_groups)
    return middle_sum


if __name__ == "__main__":
    data = collect_data("input.txt")
    result = treat_data(data)

    print("Le resultat est : ", result)
