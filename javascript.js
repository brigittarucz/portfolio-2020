"use strict";

const jsonPath = './ProjectsData.json';

let classesArr = ["geometric-dave", "greenlandic-twist", "memory-lane", "serotonin-refill", "cosmos-trip", "daily-memento"];

async function fetchProject(elementClass) {
  let toreturn;

  await fetch(jsonPath).then((e) => e.json()).then(data => {
    let valO = Object.keys(data);
    for (let i = 0; i < valO.length; i++) {
      if (data[valO[i]].dataset_val == elementClass) {
        toreturn = data[valO[i]];
        return;
      }
    }
  });
  return toreturn;
}

document.querySelectorAll(".main_projects-show img").forEach(presImage => {
  presImage.addEventListener("click", updateProjectView);
})

function updateProjectView(numClass, arrow) {
  document.querySelectorAll(".main_projects-show img").forEach(img => {
    img.style.filter = "contrast(130%) brightness(1.0)";
  })
  event.target.style.filter = "contrast(130%) brightness(0.8)";

  let myPromise;
  myPromise = definePromise(myPromise, numClass, arrow);
  myPromise.then(currentPick => {
    document.querySelector("[data-active]").dataset.active = currentPick.dataset_val;
    document.querySelector(".text-mobile-srcset").srcset = "assets/DescriptiveWords/" + currentPick.words_img + "-mobile.png";
    document.querySelector(".text-desktop-srcset").srcset = "assets/DescriptiveWords/" + currentPick.words_img + "-desktop.png";
    document.querySelector(".text-mobile-src").src = "assets/DescriptiveWords/" + currentPick.words_img + "-mobile.png";
    document.querySelector(".main_project-presentation_image").src = "assets/PSxRainbow/" + currentPick.desktop_img + ".png";
    document.querySelector(".main_project-presentation-title_desktop").textContent = currentPick.title;
    document.querySelector(".main_project-presentation-title").textContent = currentPick.title;
    document.querySelector(".number_active").textContent = "0" + currentPick.number;
  })
}

function definePromise(myPromise, numClass, arrow) {
  if (typeof (numClass) == "string") {
    let numArr = parseInt(numClass);
    if (arrow == "descending") {
      if (numArr >= 2) {
        myPromise = fetchProject(classesArr[numArr - 2]);
      } else if (numArr == 1) {
        myPromise = fetchProject(classesArr[5]);
      }
    } else if (arrow == "ascending") {
      if (numArr < 6) {
        myPromise = fetchProject(classesArr[numArr]);
      } else if (numArr == 6) {
        myPromise = fetchProject(classesArr[0]);
      }
    }
  } else {
    myPromise = fetchProject(event.target.classList[0]);
  }
  return myPromise;
}

document.querySelector(".arrow-left").addEventListener("click", movePrevious);

function movePrevious() {
  let numberActive = document.querySelector(".number_active").textContent;
  let arrow = "descending";
  updateProjectView(numberActive, arrow);
}

document.querySelector(".arrow-right").addEventListener("click", moveNext);

function moveNext() {
  let numberActive = document.querySelector(".number_active").textContent;
  let arrow = "ascending";
  updateProjectView(numberActive, arrow);
}

document.querySelector(".main_project-presentation_image").addEventListener("click", saveLocalStorage);

function saveLocalStorage() {
  localStorage.setItem("selectedProject", event.target.parentElement.parentElement.parentElement.dataset.active);
  let selectedProject = localStorage.getItem('selectedProject');
  if (selectedProject != undefined) {
    window.location.href = "./details.html";
  }
}