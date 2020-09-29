export function getAllMinerals() {
  const data = require("./data/data.json");
  const allMineralsList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    allMineralsList.push(data.minerals[i]);
  }
  return allMineralsList;
}

export function jsonToArray(jsonData) {
  const result = [];
  for (let i in jsonData) result.push(jsonData[i]);
  return result;
}

export function handleSearchMineralsList(input) {
  const data = require("./data/data.json");
  const resultList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    if (data.minerals[i].name.toLowerCase().includes(input.toLowerCase())) {
      resultList.push(data.minerals[i]);
    }
  }
  return resultList;
}

export function searchMineralsByElements(arrayOfElements) {
  const resultList = [];
  const allMinerals = jsonToArray(require("./data/data.json"));
  if (arrayOfElements.length > 0) {
    for (let mineralObj of allMinerals[0]) {
      if (arrayOfElements.every(elem => mineralObj.formula.includes(elem))) {
        resultList.push(mineralObj);
      }
    }
  }
  return resultList;
}

export function getColorInTable(symbol) {
  switch (symbol) {
    case "H":
    case "C":
    case "N":
    case "O":
    case "P":
    case "S":
    case "Se":
      return "hsl(302, 100%, 76%)";
    case "Li":
    case "Na":
    case "K":
    case "Rb":
    case "Cs":
    case "Fr":
      return "hsl(174, 72%, 56%)";
    case "Be":
    case "Mg":
    case "Ca":
    case "Sr":
    case "Ba":
    case "Ra":
      return "hsl(333, 100%, 62%)";
    case "Al":
    case "Ga":
    case "In":
    case "Sn":
    case "Tl":
    case "Pb":
    case "Bi":
    case "Nh":
    case "Fl":
    case "Mc":
    case "Lv":
      return "hsl(40, 100%, 53%)";
    case "B":
    case "Si":
    case "Ge":
    case "As":
    case "Te":
    case "Po":
    case "Sb":
      return "hsl(181, 100%, 41%)";
    case "F":
    case "Cl":
    case "Br":
    case "I":
    case "At":
    case "Ts":
      return "hsl(66, 75%, 54%)";
    case "He":
    case "Ne":
    case "Ar":
    case "Kr":
    case "Xe":
    case "Rn":
    case "Og":
      return "hsl(194, 87%, 67%)";
    default:
      return "hsl(210, 99%, 69%)";
  }
}
