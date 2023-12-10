const baseUrl = localStorage.getItem("baseUrl") || "";
const imageUrl = baseUrl + "/image";
const dataUrl = baseUrl + "/data";

const imgContainer = document.getElementById("image");
const dataContainer = document.getElementById("data");
const tabs = document.querySelectorAll(".tabbed-content .tabs span");
let activeTab = "data";

tabs.forEach((tab) =>
  tab.addEventListener("click", (el) => activateTab(el.target.dataset.tab))
);

const img = setupImage();
setInterval(loadData, 500);
activateTab(activateTab);

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
  let num = 0;
  img.addEventListener("load", loadImage);
  return img;
}

function loadImage() {
  if (activateTab === "image") {
    img.src = imageUrl + "?" + num++;
  }
}

async function loadData() {
  if (activeTab === "data") {
    const response = await fetch(dataUrl);
    if (response.ok) {
      const data = await response.text();
      dataContainer.innerText = data;
    }
  }
}
