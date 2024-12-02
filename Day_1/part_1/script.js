import fs from "node:fs";

function collectData(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    let list_1 = [];
    let list_2 = [];

    for (let line of lines) {
        if (line.trim() === "") continue;

        const [col1, col2] = line.trim().split(/\s+/)

        if (!isNaN(col1)) list_1.push(parseInt(col1, 10));
        if (!isNaN(col2)) list_2.push(parseInt(col2, 10));
    }

    // Trier les listes
    list_1.sort((a, b) => a - b);
    list_2.sort((a, b) => a - b);

    return { list_1, list_2 };
}


function treatData(){
    let data = collectData("Day_1/part_1/input.txt")
    let myResult = []

    // Obtenir les deux listes
    const list1 = Object.values(data)[0];
    const list2 = Object.values(data)[1];

    const minLength = Math.min(list1.length, list2.length);

    for (let i = 0; i < minLength; i++) {
        myResult.push(Math.abs(list1[i] - list2[i]));
    }

    const sum = myResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return "Le résultat est :", sum;
}

console.log(treatData())