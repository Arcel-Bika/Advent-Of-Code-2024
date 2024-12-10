def collect_input(file_path: str) -> list:
    with open(file_path, "r") as f:
        content = f.read()
    return [line.strip() for line in content.splitlines() if line.strip()]


def process_disk_data(line: str) -> list:
    disk = []
    line += "0"
    for i in range(0, len(line) // 2):
        n_files = int(line[2 * i])
        n_spaces = int(line[2 * i + 1])
        disk.extend([i] * n_files)
        disk.extend([-1] * n_spaces)
    return disk


def compute_solution(disk: list) -> int:
    i = 0
    # Traiter la liste avec précaution pour éviter l'index hors limites
    while i < len(disk):
        if disk[i] == -1:
            if len(disk) > 0:
                value = disk.pop()
                disk[i] = value
            else:
                break
        i += 1

    result_sum = sum(disk[i] * i for i in range(len(disk)) if i < len(disk))
    return result_sum


def search_for_gap(disk: list, length: int) -> int:
    for i in range(len(disk) - length):
        if all(disk[j] == -1 for j in range(i, i + length)):
            return i
    return -1


def process_disk_moves(disk: list) -> int:
    current_pos = len(disk) - 1

    while current_pos > 0:
        # Trouver la prochaine position valide
        while current_pos > 0 and disk[current_pos] == -1:
            current_pos -= 1

        if current_pos == 0:  # Si on a atteint le début du disque, arrêter
            break

        file_nr = disk[current_pos]
        n_len = 1

        while current_pos > 0 and disk[current_pos - 1] == file_nr:
            current_pos -= 1
            n_len += 1

        # Chercher un emplacement libre pour déplacer les données
        gap_pos = search_for_gap(disk, n_len)
        if gap_pos != -1 and gap_pos < current_pos:
            # Déplacer les données dans l'emplacement trouvé
            for i in range(n_len):
                disk[current_pos + i] = -1
                disk[gap_pos + i] = file_nr

        current_pos -= 1

    return sum(disk[i] * i for i in range(len(disk)) if disk[i] != -1)


def result(file_path: str) -> None:
    input_lines = collect_input(file_path)

    for line in input_lines:
        disk = process_disk_data(line)
        solution = process_disk_moves(disk)
        print("Part 2 Solution:", solution)


if __name__ == "__main__":
    input_path = "input.txt"
    print("--- PART II ---")
    print("Le resultat est ", result(input_path))
