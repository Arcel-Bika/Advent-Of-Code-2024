import re


def collect_data(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    filter = r"[^\w]?mul\((\d{1,3}),\s*(\d{1,3})\)[^\w]?"

    instructions = re.split(r"(don't\(\)|do\(\))", content)
    active = ...
    results = []

    for instruction in instructions:
        instruction = instruction.strip()

        if instruction == "don't()":
            active = False
        elif instruction == "do()":
            active = True
        elif active:
            for match in re.finditer(filter, instruction):
                x = int(match.group(1))
                y = int(match.group(2))
                results.append(x * y)

    return results


def treat_data():
    data = collect_data("input.txt")
    return sum(data)


if __name__ == "__main__":
    print("Le résultat est : ", treat_data())
