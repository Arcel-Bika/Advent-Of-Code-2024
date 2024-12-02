import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter(line => line.trim() !== "");

    // Convertir chaque ligne en un tableau d'entiers
    return lines.map(line => line.trim().split(/\s+/).map(Number));
}

function isSafeReport(list) {
    for (let i = 1; i < list.length; i++) {
        const diff = list[i] - list[i - 1];

        // Vérifier si la différence est hors de l'intervalle acceptable [-3, 3]
        if (diff > 3 || diff < -3) {
            return false;
        }

        // Vérifier si deux nombres consécutifs sont égaux
        if (diff === 0) {
            return false;
        }

        // Vérifier les alternances croissant/décroissant
        if (i > 1) {
            const prevDiff = list[i - 1] - list[i - 2];
            if ((prevDiff > 0 && diff < 0) || (prevDiff < 0 && diff > 0)) {
                return false;
            }
        }
    }

    return true;
}

function treatData() {
    const data = collectData("Day_2/part_1/input.txt");

    let safeReports = 0;

    for (const list of data) {
        if (isSafeReport(list)) {
            safeReports++;
        }
    }

    return safeReports;
}

console.log("Le nombre de rapports sûrs est :", treatData());
