import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    let rules = [];
    let pages = [];

    for (let line of lines) {
        if (line.trim() === "") continue;
        if (line.includes("|")) {
            rules.push(line);
        } else if (line.includes(",")) {
            pages.push(line);
        }
    }
    return { rules, pages };
}

function isOrderValid(pages, rules) {
    const rulePairs = rules.map(rule => rule.split("|").map(Number));

    // Parcourir chaque règle et vérifier si elle est respectée
    for (let [A, B] of rulePairs) {
        const indexA = pages.indexOf(A);
        const indexB = pages.indexOf(B);

        // Si A ou B n'existent pas, ignorer cette règle
        if (indexA === -1 || indexB === -1) continue;

        // Si A est après B, l'ordre est invalide
        if (indexA > indexB) {
            return false;
        }
    }

    return true;
}

function treatData() {
    const data = collectData("Day_5/part_1/input.txt");
    const rules = data.rules.map(r => r.replace("\r", ""));
    const pages = data.pages.map(p => p.replace("\r", "").split(",").map(Number));

    let results = [];

    for (let pageList of pages) {
        const isValid = isOrderValid(pageList, rules);
        results.push({ pages: pageList, valid: isValid });
    }

    return results;
}

const results = treatData();
let main_result = 0;

for (let result of results) {
    if (result.valid === true) {
        let medium = parseInt(result.pages.length / 2);
        main_result += result.pages[medium];
    };
}

console.log("Le resultat est : ", main_result)

