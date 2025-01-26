document.addEventListener("DOMContentLoaded", () => {
    const groupNames = {
        "alkali": "Alkali metals",
        "alkaline-earth": "Alkaline earth metals",
        "transition": "Transition metals",
        "post-transition": "Post-transition metals",
        "metalloids": "Metalloids",
        "reactive-nonmetals": "Reactive nonmetals",
        "noble-gases": "Noble gases",
        "lanthanides": "Lanthanides",
        "actinides": "Actinides"
      };
    const elements = [
      // Row 1
      { atomicNumber: 1, symbol: "H", name: "Hydrogen", group: "reactive-nonmetals", colStart: 1, row: 1 },
      { atomicNumber: 2, symbol: "He", name: "Helium", group: "noble-gases", colStart: 18, row: 1 },
  
      // Row 2
      { atomicNumber: 3, symbol: "Li", name: "Lithium", group: "alkali", colStart: 1, row: 2 },
      { atomicNumber: 4, symbol: "Be", name: "Beryllium", group: "alkaline-earth", colStart: 2, row: 2 },
      { atomicNumber: 5, symbol: "B", name: "Boron", group: "metalloids", colStart: 13, row: 2 },
      { atomicNumber: 6, symbol: "C", name: "Carbon", group: "reactive-nonmetals", colStart: 14, row: 2 },
      { atomicNumber: 7, symbol: "N", name: "Nitrogen", group: "reactive-nonmetals", colStart: 15, row: 2 },
      { atomicNumber: 8, symbol: "O", name: "Oxygen", group: "reactive-nonmetals", colStart: 16, row: 2 },
      { atomicNumber: 9, symbol: "F", name: "Fluorine", group: "reactive-nonmetals", colStart: 17, row: 2 },
      { atomicNumber: 10, symbol: "Ne", name: "Neon", group: "noble-gases", colStart: 18, row: 2 },
  
      // Row 3
      { atomicNumber: 11, symbol: "Na", name: "Sodium", group: "alkali", colStart: 1, row: 3 },
      { atomicNumber: 12, symbol: "Mg", name: "Magnesium", group: "alkaline-earth", colStart: 2, row: 3 },
      { atomicNumber: 13, symbol: "Al", name: "Aluminium", group: "post-transition", colStart: 13, row: 3 },
      { atomicNumber: 14, symbol: "Si", name: "Silicon", group: "metalloids", colStart: 14, row: 3 },
      { atomicNumber: 15, symbol: "P", name: "Phosphorus", group: "reactive-nonmetals", colStart: 15, row: 3 },
      { atomicNumber: 16, symbol: "S", name: "Sulfur", group: "reactive-nonmetals", colStart: 16, row: 3 },
      { atomicNumber: 17, symbol: "Cl", name: "Chlorine", group: "reactive-nonmetals", colStart: 17, row: 3 },
      { atomicNumber: 18, symbol: "Ar", name: "Argon", group: "noble-gases", colStart: 18, row: 3 },
  
      // Row 4
      { atomicNumber: 19, symbol: "K", name: "Potassium", group: "alkali", colStart: 1, row: 4 },
      { atomicNumber: 20, symbol: "Ca", name: "Calcium", group: "alkaline-earth", colStart: 2, row: 4 },
      { atomicNumber: 21, symbol: "Sc", name: "Scandium", group: "transition", colStart: 3, row: 4 },
      { atomicNumber: 22, symbol: "Ti", name: "Titanium", group: "transition", colStart: 4, row: 4 },
      { atomicNumber: 23, symbol: "V", name: "Vanadium", group: "transition", colStart: 5, row: 4 },
      { atomicNumber: 24, symbol: "Cr", name: "Chromium", group: "transition", colStart: 6, row: 4 },
      { atomicNumber: 25, symbol: "Mn", name: "Manganese", group: "transition", colStart: 7, row: 4 },
      { atomicNumber: 26, symbol: "Fe", name: "Iron", group: "transition", colStart: 8, row: 4 },
      { atomicNumber: 27, symbol: "Co", name: "Cobalt", group: "transition", colStart: 9, row: 4 },
      { atomicNumber: 28, symbol: "Ni", name: "Nickel", group: "transition", colStart: 10, row: 4 },
      { atomicNumber: 29, symbol: "Cu", name: "Copper", group: "transition", colStart: 11, row: 4 },
      { atomicNumber: 30, symbol: "Zn", name: "Zinc", group: "transition", colStart: 12, row: 4 },
      { atomicNumber: 31, symbol: "Ga", name: "Gallium", group: "post-transition", colStart: 13, row: 4 },
      { atomicNumber: 32, symbol: "Ge", name: "Germanium", group: "metalloids", colStart: 14, row: 4 },
      { atomicNumber: 33, symbol: "As", name: "Arsenic", group: "metalloids", colStart: 15, row: 4 },
      { atomicNumber: 34, symbol: "Se", name: "Selenium", group: "reactive-nonmetals", colStart: 16, row: 4 },
      { atomicNumber: 35, symbol: "Br", name: "Bromine", group: "reactive-nonmetals", colStart: 17, row: 4 },
      { atomicNumber: 36, symbol: "Kr", name: "Krypton", group: "noble-gases", colStart: 18, row: 4 },
  
      // Row 5
      { atomicNumber: 37, symbol: "Rb", name: "Rubidium", group: "alkali", colStart: 1, row: 5 },
      { atomicNumber: 38, symbol: "Sr", name: "Strontium", group: "alkaline-earth", colStart: 2, row: 5 },
      { atomicNumber: 39, symbol: "Y", name: "Yttrium", group: "transition", colStart: 3, row: 5 },
      { atomicNumber: 40, symbol: "Zr", name: "Zirconium", group: "transition", colStart: 4, row: 5 },
      { atomicNumber: 41, symbol: "Nb", name: "Niobium", group: "transition", colStart: 5, row: 5 },
      { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", group: "transition", colStart: 6, row: 5 },
      { atomicNumber: 43, symbol: "Tc", name: "Technetium", group: "transition", colStart: 7, row: 5 },
      { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", group: "transition", colStart: 8, row: 5 },
      { atomicNumber: 45, symbol: "Rh", name: "Rhodium", group: "transition", colStart: 9, row: 5 },
      { atomicNumber: 46, symbol: "Pd", name: "Palladium", group: "transition", colStart: 10, row: 5 },
      { atomicNumber: 47, symbol: "Ag", name: "Silver", group: "transition", colStart: 11, row: 5 },
      { atomicNumber: 48, symbol: "Cd", name: "Cadmium", group: "transition", colStart: 12, row: 5 },
      { atomicNumber: 49, symbol: "In", name: "Indium", group: "post-transition", colStart: 13, row: 5 },
      { atomicNumber: 50, symbol: "Sn", name: "Tin", group: "post-transition", colStart: 14, row: 5 },
      { atomicNumber: 51, symbol: "Sb", name: "Antimony", group: "metalloids", colStart: 15, row: 5 },
      { atomicNumber: 52, symbol: "Te", name: "Tellurium", group: "metalloids", colStart: 16, row: 5 },
      { atomicNumber: 53, symbol: "I", name: "Iodine", group: "reactive-nonmetals", colStart: 17, row: 5 },
      { atomicNumber: 54, symbol: "Xe", name: "Xenon", group: "noble-gases", colStart: 18, row: 5 },
  
      // Row 6
      { atomicNumber: 55, symbol: "Cs", name: "Caesium", group: "alkali", colStart: 1, row: 6 },
      { atomicNumber: 56, symbol: "Ba", name: "Barium", group: "alkaline-earth", colStart: 2, row: 6 },
      { atomicNumber: 57, symbol: "La", name: "Lanthanum", group: "lanthanides", colStart: 3, row: 9 },
      { atomicNumber: 58, symbol: "Ce", name: "Cerium", group: "lanthanides", colStart: 4, row: 9 },
      { atomicNumber: 59, symbol: "Pr", name: "Praseodymium", group: "lanthanides", colStart: 5, row: 9 },
      { atomicNumber: 60, symbol: "Nd", name: "Neodymium", group: "lanthanides", colStart: 6, row: 9 },
      { atomicNumber: 61, symbol: "Pm", name: "Promethium", group: "lanthanides", colStart: 7, row: 9 },
      { atomicNumber: 62, symbol: "Sm", name: "Samarium", group: "lanthanides", colStart: 8, row: 9 },
      { atomicNumber: 63, symbol: "Eu", name: "Europium", group: "lanthanides", colStart: 9, row: 9 },
      { atomicNumber: 64, symbol: "Gd", name: "Gadolinium", group: "lanthanides", colStart: 10, row: 9 },
      { atomicNumber: 65, symbol: "Tb", name: "Terbium", group: "lanthanides", colStart: 11, row: 9 },
      { atomicNumber: 66, symbol: "Dy", name: "Dysprosium", group: "lanthanides", colStart: 12, row: 9 },
      { atomicNumber: 67, symbol: "Ho", name: "Holmium", group: "lanthanides", colStart: 13, row: 9 },
      { atomicNumber: 68, symbol: "Er", name: "Erbium", group: "lanthanides", colStart: 14, row: 9 },
      { atomicNumber: 69, symbol: "Tm", name: "Thulium", group: "lanthanides", colStart: 15, row: 9 },
      { atomicNumber: 70, symbol: "Yb", name: "Ytterbium", group: "lanthanides", colStart: 16, row: 9 },
      { atomicNumber: 71, symbol: "Lu", name: "Lutetium", group: "lanthanides", colStart: 17, row: 9 },
  
      // Row 7
      { atomicNumber: 87, symbol: "Fr", name: "Francium", group: "alkali", colStart: 1, row: 7 },
      { atomicNumber: 88, symbol: "Ra", name: "Radium", group: "alkaline-earth", colStart: 2, row: 7 },
      { atomicNumber: 89, symbol: "Ac", name: "Actinium", group: "actinides", colStart: 3, row: 10 },
      { atomicNumber: 90, symbol: "Th", name: "Thorium", group: "actinides", colStart: 4, row: 10 },
      { atomicNumber: 91, symbol: "Pa", name: "Protactinium", group: "actinides", colStart: 5, row: 10 },
      { atomicNumber: 92, symbol: "U", name: "Uranium", group: "actinides", colStart: 6, row: 10 },
      { atomicNumber: 93, symbol: "Np", name: "Neptunium", group: "actinides", colStart: 7, row: 10 },
      { atomicNumber: 94, symbol: "Pu", name: "Plutonium", group: "actinides", colStart: 8, row: 10 },
      { atomicNumber: 95, symbol: "Am", name: "Americium", group: "actinides", colStart: 9, row: 10 },
      { atomicNumber: 96, symbol: "Cm", name: "Curium", group: "actinides", colStart: 10, row: 10 },
      { atomicNumber: 97, symbol: "Bk", name: "Berkelium", group: "actinides", colStart: 11, row: 10 },
      { atomicNumber: 98, symbol: "Cf", name: "Californium", group: "actinides", colStart: 12, row: 10 },
      { atomicNumber: 99, symbol: "Es", name: "Einsteinium", group: "actinides", colStart: 13, row: 10 },
      { atomicNumber: 100, symbol: "Fm", name: "Fermium", group: "actinides", colStart: 14, row: 10 },
      { atomicNumber: 101, symbol: "Md", name: "Mendelevium", group: "actinides", colStart: 15, row: 10 },
      { atomicNumber: 102, symbol: "No", name: "Nobelium", group: "actinides", colStart: 16, row: 10 },
      { atomicNumber: 103, symbol: "Lr", name: "Lawrencium", group: "actinides", colStart: 17, row: 10 },
  
      // Remaining transition metals
      { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", group: "transition", colStart: 3, row: 7 },
      { atomicNumber: 105, symbol: "Db", name: "Dubnium", group: "transition", colStart: 4, row: 7 },
      { atomicNumber: 106, symbol: "Sg", name: "Seaborgium", group: "transition", colStart: 5, row: 7 },
      { atomicNumber: 107, symbol: "Bh", name: "Bohrium", group: "transition", colStart: 6, row: 7 },
      { atomicNumber: 108, symbol: "Hs", name: "Hassium", group: "transition", colStart: 7, row: 7 },
      { atomicNumber: 109, symbol: "Mt", name: "Meitnerium", group: "transition", colStart: 8, row: 7 },
      { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", group: "transition", colStart: 9, row: 7 },
      { atomicNumber: 111, symbol: "Rg", name: "Roentgenium", group: "transition", colStart: 10, row: 7 },
      { atomicNumber: 112, symbol: "Cn", name: "Copernicium", group: "transition", colStart: 11, row: 7 },
      { atomicNumber: 113, symbol: "Nh", name: "Nihonium", group: "post-transition", colStart: 13, row: 7 },
      { atomicNumber: 114, symbol: "Fl", name: "Flerovium", group: "post-transition", colStart: 14, row: 7 },
      { atomicNumber: 115, symbol: "Mc", name: "Moscovium", group: "post-transition", colStart: 15, row: 7 },
      { atomicNumber: 116, symbol: "Lv", name: "Livermorium", group: "post-transition", colStart: 16, row: 7 },
      { atomicNumber: 117, symbol: "Ts", name: "Tennessine", group: "reactive-nonmetals", colStart: 17, row: 7 },
      { atomicNumber: 118, symbol: "Og", name: "Oganesson", group: "noble-gases", colStart: 18, row: 7 },
    ];
  
    const tableGrid = document.getElementById("table-grid");
    const elementDetails = document.getElementById("element-details");
    const searchBar = document.getElementById("search-bar");
  
    function renderTable() {
      tableGrid.innerHTML = elements
        .map(
          element => `
          <div class="element ${element.group}" style="grid-column: ${element.colStart}; grid-row: ${element.row};" 
               data-atomic-number="${element.atomicNumber}" data-group="${element.group}">
            <div>${element.symbol}</div>
            <small>${element.atomicNumber}</small>
          </div>`
        )
        .join("");
    }
  
    function displayElementDetails(element) {
      const groupName = groupNames[element.group] || "Unknown Group";
      elementDetails.innerHTML = `
        <strong>Symbol:</strong> ${element.symbol}<br>
        <strong>Name:</strong> ${element.name}<br>
        <strong>Atomic Number:</strong> ${element.atomicNumber}<br>
        <strong>Group:</strong> ${groupName}
      `;
    }
  
    function highlightGroup(group) {
      document.querySelectorAll(".element").forEach(el => {
        el.classList.remove("selected", "same-group");
        if (el.dataset.group === group) {
          el.classList.add("same-group");
        }
      });
    }
  
    function handleElementClick(event) {
      const elementDiv = event.target.closest(".element");
      if (!elementDiv) return;
  
      const atomicNumber = parseInt(elementDiv.dataset.atomicNumber);
      const element = elements.find(e => e.atomicNumber === atomicNumber);
  
      displayElementDetails(element);
      highlightGroup(element.group);
  
      document.querySelectorAll(".element").forEach(el => el.classList.remove("selected"));
      elementDiv.classList.add("selected");
    }
  
    function handleSearch(event) {
      const query = event.target.value.toLowerCase();
      const matchedElement = elements.find(
        e =>
          e.name.toLowerCase().includes(query) ||
          e.symbol.toLowerCase().includes(query) ||
          e.atomicNumber.toString() === query
      );
  
      if (matchedElement) {
        displayElementDetails(matchedElement);
        highlightGroup(matchedElement.group);
  
        const elementDiv = document.querySelector(
          `.element[data-atomic-number="${matchedElement.atomicNumber}"]`
        );
        if (elementDiv) {
          document.querySelectorAll(".element").forEach(el => el.classList.remove("selected"));
          elementDiv.classList.add("selected");
          elementDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  
    searchBar.addEventListener("input", handleSearch);
    tableGrid.addEventListener("click", handleElementClick);
  
    renderTable();
  });