export function getAllMinerals() {
  const data = require("./mineral-data.json");
  const allMineralsList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    allMineralsList.push(data.minerals[i]);
  }
  return allMineralsList;
}

export function demoAsyncCall() {
  return new Promise(resolve => setTimeout(() => resolve(), 2500));
}

export function handleSearch(input) {
  const data = require("./mineral-data.json");
  const resultList = [];
  for (let i = 0; i < Object.keys(data.minerals).length; i++) {
    if (data.minerals[i].name.toLowerCase().includes(input.toLowerCase())) {
      resultList.push(data.minerals[i]);
    }
  }
  return resultList;
}

export function getColor(symbol) {
  switch (symbol) {
    case "H":
    case "C":
    case "N":
    case "O":
    case "P":
    case "S":
    case "Se":
      return "#9575cd";
    case "Li":
    case "Na":
    case "K":
    case "Rb":
    case "Cs":
    case "Fr":
      return "#14cba8";
    case "Be":
    case "Mg":
    case "Ca":
    case "Sr":
    case "Ba":
    case "Ra":
      return "#ff1744";
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
      return "#ffb300";
    case "B":
    case "Si":
    case "Ge":
    case "As":
    case "Te":
    case "Po":
    case "Sb":
      return "#00838f";
    case "F":
    case "Cl":
    case "Br":
    case "I":
    case "At":
    case "Ts":
      return "#ff6d00";
    case "He":
    case "Ne":
    case "Ar":
    case "Kr":
    case "Xe":
    case "Rn":
    case "Og":
      return "#673ab7";
    default:
      return "#1565c0";
  }
}
