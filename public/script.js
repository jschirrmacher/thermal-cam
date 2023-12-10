const baseUrl = localStorage.getItem("baseUrl") || "";
const imageUrl = baseUrl + "/image";
const dataUrl = baseUrl + "/data";

const imgContainer = document.getElementById("image");
const dataContainer = document.getElementById("data-grid");
const tabs = document.querySelectorAll(".tabbed-content .tabs span");
let activeTab = "data";

let min = 20;
let max = 30;

tabs.forEach((tab) =>
  tab.addEventListener("click", (el) => activateTab(el.target.dataset.tab))
);

const img = setupImage();
loadData();
activateTab("data");

function activateTab(tab) {
  activeTab = tab;
  tabs.forEach((tab) => {
    const mode = tab.dataset.tab === activeTab ? "add" : "remove";
    tab.classList[mode]("active");
    document.getElementById(tab.dataset.tab).classList[mode]("active");
  });
}

function setupImage() {
  const img = document.createElement("img");
  imgContainer.append(img);
  img.src = imageUrl;
  img.addEventListener("load", loadData)
  return img;
}

let num = 0;
async function loadData() {
  if (activeTab === "data") {
    const response = await fetch(dataUrl);
    if (response.ok) {
      const data = await response.text();
      dataContainer.innerHTML = renderTemperatures(data);
    }
    setTimeout(loadData, 200);
  }
  if (activeTab === "image") {
    img.src = imageUrl + "?" + num++;
  }
}

function normalize(value) {
  return Math.round(Math.min(1, Math.max(value / (max - min), 0)) * 256);
}

function renderTemperatures(data) {
  return data
    .split(" ")
    .map(Number)
    .map((temp) => {
      const red = normalize(temp - min);
      const blue = normalize(max - temp);
      return { temp, color: `rgb(${red},0,${blue})` };
    })
    .map(
      ({ temp, color }) => `<span style="background:${color}">${temp}</span>`
    )
    .join("");
}
