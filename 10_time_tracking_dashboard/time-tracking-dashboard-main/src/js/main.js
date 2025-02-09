"use strict";

/* VARIABLES */
const timePeriods = document.querySelectorAll(".nav-list__item");
const navList = document.querySelector(".nav-list");
const currentTimeWork = document.getElementById("currentTimeWork");
const previousTimeWork = document.getElementById("previousTimeWork");
const currentTimePlay = document.getElementById("currentTimePlay");
const previousTimePlay = document.getElementById("previousTimePlay");
const currentTimeStudy = document.getElementById("currentTimeStudy");
const previousTimeStudy = document.getElementById("previousTimeStudy");

const container = document.getElementById("activityContainer");

const availableActivitiesList = [
  "Work",
  "Play",
  "Study",
  "Exercise",
  "Social",
  "SelfCare",
];

let activeLink;
let linkParent;

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

/* FIND ACTIVITY */
const findActivity = function (activitiesList, activity) {
  let activityObject;
  for (const act of activitiesList) {
    if (act.title === activity) {
      activityObject = act;
    }
  }
  return activityObject;
};

const workActivityObject1 = findActivity(dataList, "Work");
const workActivityObject2 = findActivity(dataList, "Play");
const workActivityObject3 = findActivity(dataList, "Study");
const workActivityObject4 = findActivity(dataList, "Exercise");
const workActivityObject5 = findActivity(dataList, "Social");
const workActivityObject6 = findActivity(dataList, "Self Care");

const activitiesProvider = function (dataList, activitiesList) {
  let currentActivityObject;

  for (let i = 0; i < activitiesList.length; i++) {
    const currActObj = findActivity(dataList, activitiesList[i]);

    currentActivityObject = currActObj;
  }

  return currentActivityObject;
};

let currActObj = activitiesProvider(dataList, availableActivitiesList);

console.log(currActObj);

/* FIND TIMEFRAME */
const findTimeFrame = function (activityObject, timeframe) {
  const currentTimeFrame = activityObject.timeframes[timeframe];
  return currentTimeFrame;
};

/* UPDATE ACTIVITY TIMEFRAMES */
const updateActivityTimeFrames = function (
  timeframeObject,
  currentTimeElement,
  previousTimeElement
) {
  const { current: currentTime, previous: previousTime } = timeframeObject;
  currentTimeElement.textContent = `${currentTime}hrs`;
  previousTimeElement.textContent = `Yesterday - ${previousTime}hrs`;
};

/* CONTROLLER - CONTROLL TIMEFRAMES */
const controlActivitiesTime = function () {
  navList.addEventListener("click", (e) => {
    let timeframeObj1;
    let timeframeObj2;
    let timeframeObj3;

    console.log(e.target.textContent);

    activeLink = e.target;
    linkParent = activeLink.parentElement;
    linkParent.classList.toggle("active");

    if (e.target.textContent === "Daily") {
      timeframeObj1 = findTimeFrame(workActivityObject1, "daily");
      timeframeObj2 = findTimeFrame(workActivityObject2, "daily");
      timeframeObj3 = findTimeFrame(workActivityObject3, "daily");
    }

    if (e.target.textContent === "Weekly") {
      timeframeObj1 = findTimeFrame(workActivityObject1, "weekly");
      timeframeObj2 = findTimeFrame(workActivityObject2, "weekly");
      timeframeObj3 = findTimeFrame(workActivityObject3, "weekly");
    }

    if (e.target.textContent === "Monthly") {
      timeframeObj1 = findTimeFrame(workActivityObject1, "monthly");
      timeframeObj2 = findTimeFrame(workActivityObject2, "monthly");
      timeframeObj3 = findTimeFrame(workActivityObject3, "monthly");
    }
    updateActivityTimeFrames(timeframeObj1, currentTimeWork, previousTimeWork);
    updateActivityTimeFrames(timeframeObj2, currentTimePlay, previousTimePlay);
    updateActivityTimeFrames(
      timeframeObj3,
      currentTimeStudy,
      previousTimeStudy
    );
  });
};

/* INIT FUNCTION */
const init = function () {
  controlActivitiesTime();
};

init();

const appendItem = function (item) {
  container.innerHTML += `
    <h2 class="section-content__title outer-sides outer-sides--left">
      ${item.title}
    </h2>
    <div class="section-content__options outer-sides outer-sides--right">
      <a href="#"><div class="dots"></div></a>
    </div>
    <p id="currentTimeWork" class="section-content__current-time outer-sides outer-sides--left">
      ${item.currentTime}hrs
    </p>
    <p  id="previousTimeWork" class="section-content__previous-time outer-sides outer-sides--right">
      Last Week - ${previousTime}hrs
    </p>
  `;
};
