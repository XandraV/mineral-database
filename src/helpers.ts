export const getDarkColor = (myColor: string) => {
  switch (myColor) {
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
