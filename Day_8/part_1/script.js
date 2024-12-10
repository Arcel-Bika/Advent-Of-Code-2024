import fs from "fs";

// Initialisation des données
let antennaPositions = new Map();

// Fonction pour collecter les données depuis un fichier
function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    return content.split("\n").map(line => line.trim());
}

// Fonction pour traiter les données et identifier les antennes
function treatData(data) {
    const processedAntennas = new Map();

    data.forEach((rowContent, rowIndex) => {
        for (let colIndex = 0; colIndex < rowContent.length; colIndex++) {
            const cellContent = rowContent[colIndex];
            if (cellContent !== ".") {
                if (!processedAntennas.has(cellContent)) {
                    processedAntennas.set(cellContent, []);
                }
                processedAntennas.get(cellContent).push([colIndex, rowIndex]);
            }
        }
    });

    return processedAntennas;
}

// Fonction pour analyser les données avec une plage d'échelles
function parseData(scaleMin, scaleMax) {
    const antinodeSet = new Set();

    for (const [antennaId, antennaCoords] of antennaPositions.entries()) {
        for (let idx1 = 0; idx1 < antennaCoords.length; idx1++) {
            const [xStart, yStart] = antennaCoords[idx1];

            for (let idx2 = idx1 + 1; idx2 < antennaCoords.length; idx2++) {
                const [xEnd, yEnd] = antennaCoords[idx2];
                const deltaX = xEnd - xStart;
                const deltaY = yEnd - yStart;

                for (let scaleFactor = scaleMin; scaleFactor < scaleMax; scaleFactor++) {
                    const scaledX = deltaX * scaleFactor;
                    const scaledY = deltaY * scaleFactor;

                    const pointA = [xStart + scaledX, yStart + scaledY];
                    const pointB = [xEnd - scaledX, yEnd - scaledY];

                    // Vérifier si les points sont dans la grille
                    if (
                        pointA[0] >= 0 && pointA[0] < rawData[0].length &&
                        pointA[1] >= 0 && pointA[1] < rawData.length
                    ) {
                        antinodeSet.add(JSON.stringify(pointA));
                    }

                    if (
                        pointB[0] >= 0 && pointB[0] < rawData[0].length &&
                        pointB[1] >= 0 && pointB[1] < rawData.length
                    ) {
                        antinodeSet.add(JSON.stringify(pointB));
                    }
                }
            }
        }
    }

    return antinodeSet;
}

// Résolution de la partie 1
function solveDay1() {
    return parseData(2, 3).size;
}

// Résolution de la partie 2
function solveDay2() {
    return parseData(0, 100).size;
}

// Main
const filePath = "Day_8/part_1/input.txt";
const rawData = collectData(filePath);
antennaPositions = treatData(rawData);

// Affichage des résultats
console.log(solveDay1());
console.log(solveDay2());
