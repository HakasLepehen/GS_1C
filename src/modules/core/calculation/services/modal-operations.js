export function displayError(str) {
  document.querySelector(".form-body span").innerHTML = str;
  document.querySelector(".form-body-login").value = null;
  document.querySelector(".form-body-password").value = null;

  setTimeout(() => {
    document.querySelector(".form-body span").innerHTML = null;
  }, 5000);
}

export async function openAuthWindow() {
  let modal = document.querySelector(".modal");

  modal.style.display = "flex";
  modal.style.top = "25vh";
  modal.style.animation = "fall 0.5s 1";
}

export async function closeAuthWindow() {
  let modal = document.querySelector(".modal");

  modal.style.animation = "up 0.5s 1";
  setTimeout(() => {
    modal.style.top = "-100vh";
    modal.style.display = "none";
  }, 400);
}
