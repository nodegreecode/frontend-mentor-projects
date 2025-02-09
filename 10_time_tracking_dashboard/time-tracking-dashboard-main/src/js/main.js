"use strict";

/* VARIABLES */
const container = document.getElementById("container");
const timePeriods = document.querySelectorAll(".nav-list__item");
const navList = document.querySelector(".nav-list");

let activeLink;
let linkParent;
let currentTimeframe;

timePeriods.forEach((link) => console.log(link.textContent));

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
    "grid-item.grid-item__box.dashboard__section"
  );
  activityContainer.innerHTML += `
            <section class="grid-item grid-item__box dashboard__section">
            <div
              class="dashboard__section-image-box dashboard__section-image-box--${activityTag}"
            >
              <img src="./assets/images/icon-${activityTag}.svg" alt="picture of a bag" />
            </div>

            <div id="activityContainer" class="dashboard__section-content-box">
              <h2 class="section-content__title outer-sides outer-sides--left">
              ${item.title}
              </h2>
              <div
                class="section-content__options outer-sides outer-sides--right"
              >
                <a href="#"><div class="dots"></div></a>
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
          </section>
  `;

  container.insertAdjacentElement("beforebegin", activityContainer);
};

/* POPULATE DOM WITH ACTIVITIES */
const populateDOM = function (activitiesList, timeframe, callbackFunction) {
  activitiesList.forEach((activity) => callbackFunction(activity, timeframe));
};

/* CONTROLLER - CONTROLL TIMEFRAMES */
const controlActivitiesTime = function () {
  navList.addEventListener("click", (e) => {
    activeLink = e.target;
    linkParent = activeLink.parentElement;
    linkParent.classList.toggle("active");

    populateDOM(dataList, e.target.textContent.toLowerCase(), appendItem);
  });
};

/* INIT FUNCTION */
const init = function () {
  currentTimeframe = controlActivitiesTime();
  populateDOM(dataList, "weekly", appendItem);
};

/* RUN APPLICATION */
init();
