"use strict";

/* VARIABLES */
const container = document.getElementById("container");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list__link");

let activeLink;
let linkParent;
let currentTimeframe;

/* MODEL - FETCH DATA */
const fetchData = async function () {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch JSON file: ", error.message);
  }
};

const dataList = await fetchData();

/* CREATE ACTIVITY */
const appendItem = function (item, timeframe) {
  const activityTag = item.title.toLowerCase().replace(/\s+/g, "");
  const activityContainer = document.createElement("section");
  activityContainer.classList.add(
    "grid-item",
    "grid-item__box",
    "dashboard__section"
  );
  activityContainer.innerHTML += `
            <div
              class="dashboard__section-image-box dashboard__section-image-box--${activityTag}"
            >
              <img src="./assets/images/icon-${activityTag}.svg" alt="activity icon" />
            </div>

            <div class="dashboard__section-content-box">
              <h2 class="section-content__title outer-sides outer-sides--left">
              ${item.title}
              </h2>
              <div
                class="section-content__options outer-sides outer-sides--right"
              >
                <a href="#" data-text="activity options" class="options__link"><div class="dots"></div></a>
              </div>
              <p
                class="section-content__current-time outer-sides outer-sides--left"
              >
                ${item.timeframes[timeframe].current}hrs
              </p>
              <p
                class="section-content__previous-time outer-sides outer-sides--right"
              >
                Last Week - ${item.timeframes[timeframe].previous}hrs
              </p>
            </div> 
  `;
  container.insertAdjacentElement("beforeend", activityContainer);
};

/* POPULATE DOM WITH ACTIVITIES */
const populateDOM = function (activitiesList, timeframe, callbackFunction) {
  activitiesList.forEach((activity) => callbackFunction(activity, timeframe));
};

/* UPDATE DOM - REMOVE ACTIVITIES */
const updateDOM = function () {
  const items = document.querySelectorAll(".grid-item__box");
  items.forEach((item) => item.remove());
};

/* CONTROLLER - CONTROLL TIMEFRAMES */
const controlActivitiesTime = function () {
  navList.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-list__link")) {
      e.preventDefault();

      navLinks.forEach(function (link) {
        link.parentElement.classList.remove("active");
      });

      e.target.parentElement.classList.add("active");

      updateDOM();
      populateDOM(dataList, e.target.textContent.toLowerCase(), appendItem);
    }
  });
};

/* MANAGE HOVER STYLING */
const contentHoveringStyle = function () {
  container.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("dashboard__section-content-box")) {
      e.target.classList.add("hover");
    } else if (e.target.classList.contains("dots")) {
      e.target.parentElement.classList.add("hover");
    }
  });

  container.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("dashboard__section-content-box")) {
      e.target.classList.remove("hover");
    } else if (e.target.classList.contains("dots")) {
      e.target.parentElement.classList.remove("hover");
    }
  });
};

/* INIT FUNCTION */
const init = function () {
  currentTimeframe = controlActivitiesTime();
  populateDOM(dataList, "weekly", appendItem);
  contentHoveringStyle();
};

/* RUN APPLICATION */
init();
