def collect_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        lines = [line.strip() for line in file if line.strip()]

    return [list(map(int, line.split())) for line in lines]


def is_safe_report(lst):
    def is_valid(lst):
        """Vérifie si une liste est valide en suivant les règles."""
        for i in range(1, len(lst)):
            diff = lst[i] - lst[i - 1]

            # Vérifier si la différence est hors de l'intervalle acceptable [-3, 3]
            if diff > 3 or diff < -3:
                return False

            # Vérifier si deux nombres consécutifs sont égaux
            if diff == 0:
                return False

            # Vérifier les alternances croissant/décroissant
            if i > 1:
                prev_diff = lst[i - 1] - lst[i - 2]
                if (prev_diff > 0 and diff < 0) or (prev_diff < 0 and diff > 0):
                    return False

        return True

    # Vérifier si la liste est déjà sûre
    if is_valid(lst):
        return True

    # Vérifier si la liste devient sûre après avoir retiré un seul élément
    for i in range(len(lst)):
        reduced_list = lst[:i] + lst[i + 1:]
        if is_valid(reduced_list):
            return True

    return False


def treat_data():
    data = collect_data("input.txt")

    safe_reports = 0

    for lst in data:
        if is_safe_report(lst):
            safe_reports += 1

    return safe_reports


if __name__ == "__main__":
    print("Le nombre de rapports sûrs est :", treat_data())
