let from=document.getElementById("form"),emailInput=document.getElementById("email"),newsletter=document.querySelector(".newsletter__container"),successMessage=document.querySelector(".success-message"),formGroupWrapper=document.getElementById("form-group-wrapper"),successMessageDismissBtn=document.querySelector(".success-message__btn"),validateForm=e=>{e.preventDefault();e=new FormData(e.target),e=Object.fromEntries(e).email;e&&/^\S+@\S+$/g.test(e)?(newsletter.classList.add("hidden"),successMessage.classList.remove("hidden")):formGroupWrapper.classList.add("error")},desmissMessage=()=>{successMessage.classList.toggle("hidden"),setTimeout(()=>location.reload(),700)},resetError=()=>{formGroupWrapper.classList.remove("error")};form.addEventListener("submit",validateForm),emailInput.addEventListener("input",resetError),successMessageDismissBtn.addEventListener("click",desmissMessage);