import fs from "fs";
import path from "path";

// Fonction pour collecter les données depuis le fichier
function collectData(filePath) {
    const absolutePath = path.resolve(filePath); // Résoudre le chemin absolu
    const content = fs.readFileSync(absolutePath, "utf-8");
    const data = content.split("\n").filter(line => line.trim() !== "").map(line => line.trim().split(":"));

    return data;
}

// Fonction pour générer toutes les combinaisons possibles avec + et *
function* calc_val_1(num_seq) {
    const val_last = num_seq[num_seq.length - 1];

    if (num_seq.length === 1) {
        yield val_last;
    } else {
        for (const val_left of calc_val_1(num_seq.slice(0, -1))) {
            yield val_left + val_last; // Test avec l'opérateur +
            yield val_left * val_last; // Test avec l'opérateur *
        }
    }
}

// Fonction pour générer toutes les combinaisons avec +, *, et ||
function* calc_val_2(num_seq) {
    const val_last = num_seq[num_seq.length - 1];

    if (num_seq.length === 1) {
        yield val_last;
    } else {
        for (const val_left of calc_val_2(num_seq.slice(0, -1))) {
            yield val_left + val_last; // Test avec l'opérateur +
            yield val_left * val_last; // Test avec l'opérateur *
            yield parseInt(`${val_left}${val_last}`); // Test avec l'opérateur ||
        }
    }
}

// Vérifier si la valeur cible peut être atteinte avec une fonction génératrice
function checkVal(genFunc, testVal, numSeq) {
    for (const result of genFunc(numSeq)) {
        if (result === testVal) {
            return true;
        }
    }
    return false;
}

// Résumer les traitements avec les données collectées
function calculateResults(data) {
    let sum1 = 0;
    let sum2 = 0;

    for (const [testValStr, numStr] of data) {
        const testVal = Number(testValStr);
        const numSeq = numStr.split(" ").map(Number);

        if (checkVal(calc_val_1, testVal, numSeq)) {
            sum1 += testVal;
        }

        if (checkVal(calc_val_2, testVal, numSeq)) {
            sum2 += testVal;
        }
    }

    console.log(`Le résultat de la part 1 : ${sum1}`);
    console.log(`Le résultat part 2 : ${sum2}`);
}

// Main
function main() {
    const filePath = "Day_7/part_1/input.txt";
    const rawData = collectData(filePath);

    console.log(`Nombre d'entrées : ${rawData.length}`);
    calculateResults(rawData);
}

main();
