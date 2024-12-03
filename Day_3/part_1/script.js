import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    
    // Expression régulière pour capturer `mul(X, Y)` avec X et Y comme nombres
    let filter = /[^\w]?mul\((\d{1,3}),\s*(\d{1,3})\)[^\w]?/gm;

    const matches = [];
    let match;
    while ((match = filter.exec(content)) !==null) {
        matches.push({x: parseInt(match[1], 10), y: parseInt(match[2], 10)});
    }

    return matches;
}

function treatData() {
    const data = collectData("Day_3/part_1/input.txt");
    let i = 0
    let myList = []

    for (i of data) {
        myList.push(Object.values(i)[0] * Object.values(i)[1])
    }

    return myList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

console.log("Résultat est :", treatData())