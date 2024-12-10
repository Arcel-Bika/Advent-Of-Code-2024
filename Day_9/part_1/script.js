import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8")
    return content.split("").map(line => line.trim())
}

function remplacerIndices(tableau) {
    let id = 0;
    return tableau.flatMap((number, index) => {
        if ((index + 1) % 2 === 0) { 
            return Array(number).fill('.');
        } else {
            return Array(number).fill(id++);
        }
    });
}

function treatData() {
    const data = collectData("Day_9/part_1/input.txt").map(Number);
    let id = 0;

    return data
}

function tri(arr) {
    let n = arr.length;
    let theEnd = n - 1;

    // Vérifier s'il reste des éléments non triés
    while (true) {
        // Vérifie si tous les points sont à la fin
        let allDotsAtEnd = true;
        for (let i = 0; i < theEnd; i++) {
            if (arr[i] === ".") {
                allDotsAtEnd = false;
                break;
            }
        }

        if (allDotsAtEnd) break; // Sortir de la boucle principale si tri terminé

        for (let i = 0; i <= theEnd; i++) {
            if (arr[i] === ".") {
                // Trouver la dernière valeur valide pour l'échange
                while (arr[theEnd] === "." && theEnd > i) {
                    theEnd--;
                }

                // Effectuer l'échange
                if (i < theEnd) {
                    [arr[i], arr[theEnd]] = [arr[theEnd], arr[i]];
                }
            }
        }
    }

    return arr;
}

function result() {
    let res = tri(remplacerIndices(collectData("Day_9/part_1/input.txt").map(Number)));
    let add = 0;
    for (let i = 0; i < res.length; i++) {
        if (res[i] === ".") {
            break;
        } else {
            add = add + (res[i] * i);
        }
    }
    
    return add;
}

console.log("Le resultat est ", result())