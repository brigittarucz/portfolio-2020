const jsonPath = './ProjectsData.json';

function fetchProjectDetails() {
  fetch(jsonPath).then((e) => e.json()).then(data => {
    let valO = Object.keys(data);
    for (let i = 0; i < valO.length; i++) {
      if (data[valO[i]].dataset_val == localStorage.selectedProject) {
        let projectData = data[valO[i]];
        populatePage(projectData);
      }
    }
  })
}

fetchProjectDetails();

function populatePage(projectData) {
  // Mobile
  document.querySelector(".main_details-title").textContent = projectData.title;
  document.querySelector(".main_details-month").textContent = projectData.month;
  document.querySelector(".main_details-image_desktop").src = "assets/PSxRainbow/" + projectData.desktop_img + ".png";
  document.querySelector(".main_details-year").textContent = projectData.year;
  document.querySelector(".main_details-image_mobile").src = "assets/PSxRainbow/" + projectData.mobile_img + ".png";
  // Desktop
  document.querySelector(".main_details-geninfo-image_desktop").src = "assets/PSxRainbow/" + projectData.desktop_img + ".png";
  document.querySelector(".main_details-geninfo-image_mobile").src = "assets/PSxRainbow/" + projectData.mobile_img + ".png";
  document.querySelector(".generality-role").textContent = projectData.roles;
  document.querySelector(".generality-extras").textContent = projectData.specialty;
  document.querySelector(".generality-location").textContent = projectData.location;

  let graphBarsArr = projectData.mostly_used.split(",");
  let lisGraph = document.querySelectorAll(".graph li");

  for (let i = 0; i < graphBarsArr.length; i++) {
    let numArr = graphBarsArr[i].match(/\d+/g);
    let num = parseInt(numArr[0]);
    let specialty = graphBarsArr[i].replace(/[0-9]/g, '');
    lisGraph[i].style.width = num + "%";
    lisGraph[i].querySelector("span").textContent = specialty;
  };

  document.querySelector(".main_details-geninfo_process-paragraph").textContent = projectData.process;
  document.querySelector(".main_details-check a").href = projectData.website_link;
}