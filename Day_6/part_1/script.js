const fs = require("fs");

// Fonction pour collecter les données depuis un fichier
function collectData(filePath) {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        return content.split("\n").map(line => line.trim().split(""));
    } catch (error) {
        console.error("Erreur lors de la lecture du fichier :", error.message);
        process.exit(1);
    }
}

// Fonction pour trouver la position de départ marquée par "^"
function findStartingPosition(grid) {
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === "^") {
                return { x, y };
            }
        }
    }
    throw new Error("Position de départ '^' non trouvée dans la grille !");
}

// Fonction principale pour exécuter la logique de déplacement
function walking(filePath) {
    const grid = collectData(filePath);
    const startingPosition = findStartingPosition(grid);
    const path = grid.map(row => [...row]); 
    let guardian = { ...startingPosition }; 
    let count = 1;

    const directions = [
        { name: "up", dx: 0, dy: -1 },
        { name: "right", dx: 1, dy: 0 },
        { name: "down", dx: 0, dy: 1 },
        { name: "left", dx: -1, dy: 0 },
    ];
    let directionIndex = 0;
    let outOfBounds = false;

    console.log("Grille initiale :");
    grid.forEach(line => console.log(line.join("")));
    console.log();

    while (!outOfBounds) {
        const direction = directions[directionIndex];
        const newX = guardian.x + direction.dx;
        const newY = guardian.y + direction.dy;

        // Vérifier si le guardian sort de la grille
        outOfBounds =
            newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length;

        if (!outOfBounds) {
            const isObstacle = grid[newY][newX] === "#";
            if (isObstacle) {
                // Changer de direction si obstacle
                directionIndex = (directionIndex + 1) % directions.length;
            } else {
                // Déplacer le guardian
                guardian = { x: newX, y: newY };
                if (path[newY][newX] !== "X") {
                    path[newY][newX] = "X";
                    count++;
                }
            }
        }
    }

    console.log("Nombre total de déplacements :", count);

    return count;
}

const filePath = "Day_6/part_1/input.txt";
walking(filePath);
