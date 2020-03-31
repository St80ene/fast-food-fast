window.onload = () => {
  document.getElementById("signup-tab").style.display = "none";
};
function toggleTab(tab, active) {
  // console.log("")
  document.getElementById("login-tab").style.display = "none";
  document.getElementById("signup-tab").style.display = "none";
  document.getElementById(tab).style.display = "block";
  document.getElementById("log-id").style.backgroundColor = "";
  document.getElementById("sign-id").style.backgroundColor = "";
  document.getElementById(active).style.backgroundColor = "#80808093";
}
