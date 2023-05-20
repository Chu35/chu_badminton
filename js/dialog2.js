function showDialog() {
  document.getElementById("myDialog").classList.add("active");
}

function closeDialog() {
  document.getElementById("myDialog").classList.remove("active");
}

document.getElementById("studentImg").addEventListener("click", function() {
  window.location.href = "https://help.tableau.com/current/online/zh-tw/users_site_roles.htm";
});

document.getElementById("teacherImg").addEventListener("click", function() {
  window.location.href = "teacher.html";
});

document.getElementById("parentImg").addEventListener("click", function() {
  window.location.href = "parent.html";
});


// JavaScript Document