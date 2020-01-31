export const sunburstDescription = `
Silicate mineral, any of a large group of silicon-oxygen compounds
that are widely distributed throughout much of the solar system. The
basic structural unit of all silicate minerals is the silicon
tetrahedron in which one silicon atom is surrounded by and bonded to
(i.e., coordinated with) four oxygen atoms, each at the corner of a
regular tetrahedron. These SiO4 tetrahedral units can share oxygen
atoms and be linked in a variety of ways, which results in different
structures.`;
export const dataSunburst = {
  title: "",
  color: 1,
  children: [
    {
      category: "Group",
      title: "Elements",
      children: [
        {
          color: "#f44336",
          stroke: "black",
          category: "Subgroup",
          title: "Metals",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ef5350",
          category: "Subgroup",
          title: "Non-metals",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#e53935",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Sulfides",
      children: [
        {
          color: "#ff7043",
          category: "Subgroup",
          title: "Sulfides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff8a65",
          category: "Subgroup",
          title: "Selenides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff6e40",
          category: "Subgroup",
          title: "Tellurides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff7d47",
          category: "Subgroup",
          title: "Arsenides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff844c",
          category: "Subgroup",
          title: "Antimonides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#f4511e",
          category: "Subgroup",
          title: "Bismuthides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff6f00",
          category: "Subgroup",
          title: "Sulfosalts",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffbb93",
          category: "Subgroup",
          title: "Sulfarsenites",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffa270",
          category: "Subgroup",
          title: "Sulfantimonites",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff8a50",
          category: "Subgroup",
          title: "Sulfbismuthites",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#ff7043",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Halides",
      children: [
        {
          color: "fb8c00",
          category: "Subgroup",
          title: "FL",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffa726",
          category: "Subgroup",
          title: "CL",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffb74d",
          category: "Subgroup",
          title: "Br",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffcc80",
          category: "Subgroup",
          title: "I",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ffe0b2",
          category: "Subgroup",
          title: "At",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#f57c00",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Oxides",
      children: [
        {
          color: "#ffeb3b",
          category: "Subgroup",
          title: "Simple Oxides",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#fff176",
          category: "Subgroup",
          title: "Hydroxides",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#fbc02d",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Carbonates",
      children: [
        {
          color: "#cddc39",
          category: "Subgroup",
          title: "Carbonates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#d4e157",
          category: "Subgroup",
          title: "Nitrates",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#afb42b",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Borates",
      children: [
        {
          color: "#039be5",
          category: "Subgroup",
          title: "Nesoborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#29b6f6",
          category: "Subgroup",
          title: "Soroborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#81d4fa",
          category: "Subgroup",
          title: "Cycloborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#bbdefb",
          category: "Subgroup",
          title: "Inoborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#b2ebf2",
          category: "Phylloborates",
          title: "Phylloborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#e1f5fe",
          category: "Subgroup",
          title: "Tectoborates",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#0288d1",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Sulfates",
      children: [
        {
          color: "#5c6bc0",
          category: "Subgroup",
          title: "Sulfates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#7986cb",
          category: "Subgroup",
          title: "Selenates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#9fa8da",
          category: "Subgroup",
          title: "Tellurates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#d1c4e9",
          category: "Subgroup",
          title: "Chromates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#b388ff",
          category: "Subgroup",
          title: "Molybdates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ede7f6",
          category: "Subgroup",
          title: "Tungstates",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#3949ab",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Phosphates",
      children: [
        {
          color: "#ba68c8",
          category: "Subgroup",
          title: "Phosphates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ce93d8",
          category: "Subgroup",
          title: "Arsenates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#e1bee7",
          category: "Subgroup",
          title: "Vanadates",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#9c27b0",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Silicates",
      children: [
        {
          color: "#d81b60",
          category: "Subgroup",
          title: "Nesosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff4081",
          category: "Subgroup",
          title: "Sorosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ff79b0",
          category: "Subgroup",
          title: "Cyclosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#f50057",
          category: "Subgroup",
          title: "Inosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#ec407a",
          category: "Subgroup",
          title: "Phyllosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#f06292",
          category: "Subgroup",
          title: "Tectosilicates",
          size: 1,
          labelStyle: { fontSize: 10 }
        },
        {
          color: "#f48fb1",
          category: "Subgroup",
          title: "Germanates",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#c2185b",
      labelStyle: { fontSize: 13, fill: "white" }
    },
    {
      category: "Group",
      title: "Organic",
      children: [
        {
          color: "#ff1744",
          category: "Subgroup",
          title: "Organic",
          size: 1,
          labelStyle: { fontSize: 10 }
        }
      ],
      color: "#ff1744",
      labelStyle: { fontSize: 13, fill: "white" }
    }
  ]
};
