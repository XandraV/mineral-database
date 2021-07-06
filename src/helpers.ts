export const getDarkColor = (color: string) => {
  switch (color) {
    case "yellow":
      return "#ffe082";
    case "green":
    case "greenish-blue":
      return "#c5e1a5";
    case "red":
      return "#ef5350";
    case "blue":
      return "#81d4fa";
    case "black":
    case "grey":
      return "#9fa8da";
    case "Colourless":
    case "white":
      return "#c9c2d4";
    case "pink":
      return "#f48fb1";
    case "violet":
    case "purple":
      return "#ce93d8";
    case "brown":
      return "#bcaaa4";
    case "orange":
      return "#ffab91";
    default:
      return "#80deea";
  }
};

export const getGroupMolecule = (group: string) => {
  switch (group) {
    case "Silicates":
      return "<span>SiO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Oxides":
      return "<span>O<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup></span></span>";
    case "Sulfates":
      return "<span>SO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Sulfides":
      return "<span>S<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup></span></span>";
    case "Carbonates":
      return "<span>CO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>2−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>3</sub></span></span>";
    case "Halides":
      return "<span>F, Cl</span>";
    case "Phosphates":
      return "<span>PO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sup style='font-size:inherit;line-height:inherit;vertical-align:baseline'>3−</sup><br><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Borates":
      return "<span>BO<span style='display:inline-block;margin-bottom:-0.3em;vertical-align:-0.4em;line-height:1em;font-size:80%;text-align:left'><sub style='font-size:inherit;line-height:inherit;vertical-align:baseline'>4</sub></span></span>";
    case "Organic":
    default:
      return "<span>C</span>";
  }
};

export const getElementColor = (symbol: string) => {
  switch (symbol) {
    case "H":
    case "C":
    case "N":
    case "O":
    case "P":
    case "S":
    case "Se":
      return "rgba(255, 203, 221, 0.6)";
    case "Li":
    case "Na":
    case "K":
    case "Rb":
    case "Cs":
    case "Fr":
      return "rgba(211, 79, 115, 0.6)";
    case "Be":
    case "Mg":
    case "Ca":
    case "Sr":
    case "Ba":
    case "Ra":
      return "rgba(255, 180, 91, 0.7)";
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
      return "rgba(126,142,201,0.6)";
    case "B":
    case "Si":
    case "Ge":
    case "As":
    case "Te":
    case "Po":
    case "Sb":
      return "rgba(249,131,194,0.6)";
    case "F":
    case "Cl":
    case "Br":
    case "I":
    case "At":
    case "Ts":
      return "rgba(255,63,165,0.6)";
    case "He":
    case "Ne":
    case "Ar":
    case "Kr":
    case "Xe":
    case "Rn":
    case "Og":
      return "rgb(244, 205, 252, 0.6)";
    default:
      return "rgba(101, 79, 139, 0.9)";
  }
};

export const getMainGroupColor = (groupName: string) => {
  switch (groupName) {
    case "Silicates":
      return "#ff4081";
    case "Arsenates":
      return "#ffd54f";
    case "Phosphates":
      return "#aeea00";
    case "Sulfates":
      return "#eeff41";
    case "Vanadates":
      return "#ff8a65";
    case "Oxides":
      return "#448aff";
    case "Sulfides":
      return "#ffea00";
    case "Carbonates":
      return "#a1887f";
    case "Borates":
      return "#ff1744";
    case "Nitrates":
      return "#64ffda";
    default:
      return "lightgrey";
  }
};
