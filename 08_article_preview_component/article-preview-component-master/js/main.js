const actionButton = document.getElementById("action-btn");
const actionIcon = document.getElementById("action-icon");
const socialShare = document.getElementById("social-share");

const showSocialPopup = () => socialShare.classList.toggle("hidden");

const changeBtnColor = () => {
  actionButton.classList.toggle("btn-backgroundcolor-pressed");
  actionIcon.classList.toggle("icon-backgroundcolor-pressed");
};

actionButton.addEventListener("click", showSocialPopup);
actionButton.addEventListener("click", changeBtnColor);
