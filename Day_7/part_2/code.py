# Fonction pour collecter les données depuis le fichier
def collect_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        contents = file.read().splitlines()
    # Séparation en paires clé/valeur
    data = [line.strip().split(":") for line in contents if line.strip()]
    return data


# Fonction pour générer toutes les combinaisons possibles avec + et *
def calc_val_1(num_seq):
    val_last = num_seq[-1]
    
    if len(num_seq) == 1:
        yield val_last
    else:
        for val_left in calc_val_1(num_seq[:-1]):
            yield val_left + val_last  # Test avec l'opérateur +
            yield val_left * val_last  # Test avec l'opérateur *


# Fonction pour générer toutes les combinaisons avec +, *, et || (concaténation de chiffres)
def calc_val_2(num_seq):
    val_last = num_seq[-1]
    
    if len(num_seq) == 1:
        yield val_last
    else:
        for val_left in calc_val_2(num_seq[:-1]):
            yield val_left + val_last  # Test avec l'opérateur +
            yield val_left * val_last  # Test avec l'opérateur *
            # Simule l'opérateur de concaténation en transformant les valeurs en entier
            yield int(f"{val_left}{val_last}")  


# Vérifier si la valeur cible peut être atteinte avec une fonction génératrice
def check_val(gen_func, test_val, num_seq):
    for result in gen_func(num_seq):
        if result == test_val:
            return True
    return False


# Résumer les traitements avec les données collectées
def calculate_results(data):
    sum1 = 0
    sum2 = 0
    
    for test_val_str, num_str in data:
        try:
            test_val = int(test_val_str)
            num_seq = list(map(int, num_str.split(" ")))

            if check_val(calc_val_1, test_val, num_seq):
                sum1 += test_val

            if check_val(calc_val_2, test_val, num_seq):
                sum2 += test_val

        except ValueError:
            print(f"Erreur de traitement pour la ligne : {test_val_str}:{num_str}")

    print(f"Le résultat de la part 1 : {sum1}")
    print(f"Le résultat de la part 2 : {sum2}")


# Main
def main():
    file_path = "input.txt"  # Chemin vers le fichier d'entrée
    raw_data = collect_data(file_path)

    print(f"Nombre d'entrées : {len(raw_data)}")
    calculate_results(raw_data)


if __name__ == "__main__":
    main()
