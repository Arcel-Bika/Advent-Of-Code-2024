class Direction:
    """Définir les directions cardinales pour permettre le mouvement."""
    N = (0, -1)
    E = (1, 0)
    S = (0, 1)
    W = (-1, 0)

    @staticmethod
    def rotate_clockwise(direction):
        """Simule un virage dans le sens des aiguilles d'une montre."""
        if direction == Direction.N:
            return Direction.E
        if direction == Direction.E:
            return Direction.S
        if direction == Direction.S:
            return Direction.W
        if direction == Direction.W:
            return Direction.N


def collect_data(file_path):
    """Lit la grille depuis un fichier."""
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.read().splitlines()
    return { (x, y): char for y, line in enumerate(lines) for x, char in enumerate(line) }


def find_start(grid):
    """Trouve la position de départ marquée par le symbole ^ dans la grille."""
    for (x, y), value in grid.items():
        if value == "^":
            return x, y
    raise ValueError("Impossible de trouver le point de départ '^' dans la grille.")


def simulate_path(grid, start):
    """
    Simule le chemin emprunté depuis le point de départ jusqu'à une fin
    en prenant en compte la logique de rotation.
    """
    current_position = start
    direction = Direction.N
    visited = set([current_position])

    while True:
        next_position = (current_position[0] + direction[0], current_position[1] + direction[1])
        if next_position not in grid:
            return visited  # Fin du chemin si on sort de la grille
        if grid[next_position] == "#":
            direction = Direction.rotate_clockwise(direction)  # Rotation en cas d'obstacle
        elif grid[next_position] in [".", "^"]:
            visited.add(next_position)
            current_position = next_position
        else:
            raise Exception("Caractère inconnu dans la simulation")
    return visited


def count_loops(grid, start, area):
    """
    Compte le nombre de boucles possibles avec simulation dynamique d'obstacles.
    Simule chaque position sur le chemin en tant qu'obstacle.
    """
    path = simulate_path(grid, start)
    path.discard(start)  # On enlève le point de départ

    loops = 0

    for point in path:
        temp_grid = grid.copy()
        temp_grid[point] = "#"  # Placer un obstacle temporaire à la position donnée
        current_position = start
        direction = Direction.N
        steps = 0

        while True:
            next_position = (current_position[0] + direction[0], current_position[1] + direction[1])
            if next_position not in temp_grid:
                break  # Arrêter si on est sorti de la grille
            if temp_grid[next_position] == "#":
                direction = Direction.rotate_clockwise(direction)  # Rotation en cas d'obstacle
            elif temp_grid[next_position] in [".", "^"]:
                steps += 1
                current_position = next_position
            else:
                break

            # Vérifier s'il y a trop de pas pour conclure qu'une boucle est atteinte
            if steps > area:
                loops += 1
                break

    return loops


def main():
    # Lecture de l'entrée
    file_path = "input.txt"
    grid = collect_data(file_path)

    # Localiser la position de départ
    start = find_start(grid)

    # Définir la taille dynamique de l'aire
    area = len(grid) + 1

    # Compter le nombre de boucles valides
    loops = count_loops(grid, start, area)

    print(f"Nombre d'options trouvées : {loops}")


if __name__ == "__main__":
    main()
