const ul = document.querySelector("ul");
const errorWarner = document.createElement("p");
errorWarner.style.height = "30px";
errorWarner.style.color = "red";

const form = document.querySelector("form");
const input = document.querySelector("input");
let value = "";

const img = document.querySelector("img");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  for (let i = 0; i < series.length; i++) {
    if (input.value.toUpperCase().replace(/\s/g, '') === series[i].name.toUpperCase().replace(/\s/g, '')) {
      errorWarner.textContent = "Serie déjà dans la liste !";
      input.value = "";
      return;
    }
  }
  if (input.value === "") {
    errorWarner.textContent = "Champ vide";
    return;
  }
  value = input.value;
  input.value = "";
  addSerie(value);
  displaySeries();
});


const series = [
  {
    name: "Breaking Bad",
    seen: false,
  },
  {
    name: "The Wire",
    seen: true,
  },
];

const image = [
  "the shield",
  "the walking dead",
  "better call saul",
  "black mirror",
  "breaking bad",
  "broadchurch",
  "bureau des legendes",
  "game of thrones",
  "homeland",
  "lost",
  "mad men",
  "narcos",
  "sex education",
  "peaky blinders",
  "rectify",
  "sherlock",
  "sons of anarchy",
  "soprano",
  "stranger things",
  "the wire",
  "vikings",
];

const displaySeries = () => {
  ul.innerText = "";
  const seriesNode = series.map((serie, index) => {
    return createSerieElement(serie, index);
  });
  ul.append(errorWarner);
  ul.append(...seriesNode);
};

const createSerieElement = (serie, index) => {
  const li = document.createElement("li");
  
  li.addEventListener("mouseover", () => {
    img.src =`img/${series[index].name}.jpg`
  });

  li.addEventListener("mouseleave", () => {
    img.src =`img/streaming.jpg`
  });

  const span = document.createElement("span");
  span.classList.add("todo");
  if (serie.seen) {
    span.classList.add("done");
  }
  span.addEventListener("click", () => {
    toggleSerie(index);
  });

  const p = document.createElement("p");
  p.innerText = serie.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.addEventListener("click", () => {
    editSerie(index + 1);
  });
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.classList.add("delete");
  btnDelete.addEventListener("click", () => {
    deleteSerie(index);
  });
  li.append(span, p, btnEdit, btnDelete);
  return li;
};

const addSerie = (value) => {
  series.push({ name: value, seen: false });
  displaySeries();
};

const deleteSerie = (index) => {
  series.splice(index, 1);
  displaySeries();
};

const toggleSerie = (index) => {
  series[index].seen = !series[index].seen;
  displaySeries();
};

const editSerie = (index) => {
  const li = document.createElement("li");
  let currentName = series[index - 1].name;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentName;

  const cancel = document.createElement("button");
  cancel.innerText = "Cancel";

  cancel.addEventListener("click", () => {
    displaySeries();
  });

  const save = document.createElement("button");
  save.innerText = "Save";

  save.addEventListener("click", () => {
    
    for (let i = 0; i < series.length; i++) {
      if (input.value.toUpperCase().replace(/\s/g, '') === series[i].name.toUpperCase().replace(/\s/g, '')) {
        errorWarner.textContent = "Serie déjà dans la liste !";
        input.value = "";
        return;
      }
    }
    
    if (input.value === "") {
      errorWarner.textContent = "Aucune saisie";
      displaySeries();
    } else if (input.value.toUpperCase().replace(/\s/g, '') === currentName.toUpperCase().replace(/\s/g, '')) {
      errorWarner.textContent = "Même Titre";
      displaySeries();
    } else {
      series[index - 1].name = input.value;
      displaySeries();
    }
  });

  li.append(input, save, cancel);
  ul.replaceChild(li, ul.children[index]);
};

const filterSeries = (filterType) => {
  let filteredSeries;
  switch (filterType) {
    case "all":
      filteredSeries = series;
      break;
    case "seen":
      filteredSeries = series.filter((serie) => serie.seen);
      break;
    case "toWatch":
      filteredSeries = series.filter((serie) => !serie.seen);
      break;
    default:
      filteredSeries = series;
  }
  displayFilteredSeries(filteredSeries);
};

const displayFilteredSeries = (filteredSeries) => {
  ul.innerText = "";
  const seriesNode = filteredSeries.map((serie, index) => {
    return createSerieElement(serie, index);
  });
  ul.append(errorWarner);
  ul.append(...seriesNode);
};

const createTabButton = (text, filterType) => {
  const button = document.createElement("button");

  button.innerText = text;
  button.style.color = "#000000";
  button.style.marginLeft = "30px";
  button.style.marginBottom = "20px";
  button.style.width = "100px"

  button.addEventListener("click", () => {
    filterSeries(filterType)
  });

  button.addEventListener("mouseover", () =>{
    button.style.color = "#FFFFFF";
  });

  button.addEventListener("mouseleave", () => 
    button.style.color = "#000000");
  return button;
};

const tabsDiv = document.createElement("div");
tabsDiv.classList.add("tabs");
tabsDiv.append(
  createTabButton("Vu", "seen"),
  createTabButton("A Voir", "toWatch"),
  createTabButton("Tout", "all")
);
document.querySelector(".container").prepend(tabsDiv);

displaySeries();
