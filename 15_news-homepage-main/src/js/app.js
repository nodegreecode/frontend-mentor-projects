/* VARIABLES */
const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", function () {
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");

  if (!mobileMenu.open) {
    mobileMenu.show();
  } else {
    mobileMenu.close();
  }
});
