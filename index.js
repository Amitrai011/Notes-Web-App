showNotes();

let addNoteButton = document.getElementById("addBtn");
addNoteButton.addEventListener("click", function() {
  let noteDetail = document.getElementById("addTxt");
  let noteTitle = document.getElementById("addTitle");

  // Taking notes array from localStorage
  let notes = localStorage.getItem("notes");

  let notesArray;
  if (notes == null) {
    notesArray = []
  } else {
    notesArray = JSON.parse(notes);
  }

  let notesObj = {
    title: noteTitle.value,
    detail: noteDetail.value
  };

  // notesArray.push(noteTitle.value);
  notesArray.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  noteDetail.value = "";
  noteTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesArray;
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }

  let html = "";
  notesArray.forEach(function(element, index) {
    html += `<div class="card" style="width: 18rem;">
    <div class="card-body notes">
      <h5 class="card-title" id="title">${element.title}</h5>
      <p class="card-text" id="details">${element.detail}</p>
      <button class="btn btn-outline-danger" type="button" onclick="deleteNote(${index})">Delete</button>
    </div>
    </div>`
  });

  let notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = html;
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesArray;
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }

  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  showNotes();
}

let search = document.getElementsByTagName("input")[0];
search.addEventListener(".search", function() {
  let searchValue = search.value.toLowerCase();

  let allNotes = document.getElementsByClassName("notes");
  for (var i = 0; i < allNotes.length; i++) {
    let detailsValue = allNotes[i].getElementsByTagName("p")[0].innerText;
    if (detailsValue.includes(searchValue)) {
      allNotes[i].style.display = "block";
    } else {
      allNotes[i].style.display = "none";
    }
  }
});

document.querySelector(".delete-button").addEventListener("click", function() {
  localStorage.clear();
  showNotes();
});

var count = 0;
document.querySelector(".dark-mode").addEventListener("click", function() {
  if(count == 0) {
    document.body.style.backgroundColor = "#181D31";
    document.querySelector("#addTitle").style.backgroundColor = "#181D31";
    document.querySelector("#addTxt").style.backgroundColor = "#181D31";
    document.querySelector("#addTitle").classList.add("placeholder-color");
    document.querySelector("#addTxt").classList.add("placeholder-color");
    document.querySelector(".container").style.backgroundColor = "#282A3A";
    document.querySelector(".search").style.backgroundColor = "#0A2647"

    document.querySelectorAll(".notes").forEach(function(element, index) {
      element.style.backgroundColor = "#282A3A";
      element.style.borderColor = "black";
      element.querySelector("#title").style.color = "white";
      element.querySelector("#details").style.color = "white";
    });
    count = 1;
  } else {
    document.body.style.backgroundColor = "white";
    document.querySelector("#addTitle").style.backgroundColor = "white";
    document.querySelector("#addTxt").style.backgroundColor = "white";
    document.querySelector("#addTitle").classList.toggle("placeholder-color");
    document.querySelector("#addTxt").classList.toggle("placeholder-color");
    document.querySelector(".container").style.backgroundColor = "#EFF5F5";
    document.querySelector(".search").style.backgroundColor = "#EFF5F5"

    document.querySelectorAll(".notes").forEach(function(element, index) {
      element.style.backgroundColor = "white";
      element.style.borderColor = "black";
      element.querySelector("#title").style.color = "black";
      element.querySelector("#details").style.color = "black";
    });
    count = 0;
  }

});

/*
Further Features
1. Mark as Favorite
2. Delete All
3. Host It
*/
