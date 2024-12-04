import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    return content.split("\n").map(line => line.trim().split(""));
}

// Détecter toutes les occurences de XMAS
function countOccurrences(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;

    const direction = [
        [0, 1], // Droite
        [0, -1], // Gauche
        [1, 0], // Bas
        [-1, 0], //  Haut
        [1, 1], // Diagnonale bas-droite
        [1, -1], // Diagonale bas-gauche
        [-1, 1], // Diagonale haut-droite
        [-1, -1], // Diagonale haut-gauche
    ];

    let count = 0;

    function isWordAt(row, col, dir) {
        for (let i = 0; i < word.length; i++) {
            const newRow = row + i * dir[0];
            const newCol = col + i * dir[1];

            if (newRow < 0 || newRow >= rows || // En dehors de la grille (verticalement)
                newCol < 0 || newCol >= cols || // En dehors de la grille (horizontalement)
                grid[newRow][newCol] !== word[i] // Lettre ne correspond pas
                ) {
                    return false
                }
        }

        return true
    }
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (let dir of direction) {
                if (isWordAt(row, col, dir)) {
                    count++;
                }
            }
        }
    }

    return count;
}

const grid = collectData("Day_4/part_1/input.txt");
const word = "XMAS";
console.log("Le resultat est : ", countOccurrences(grid, word))
