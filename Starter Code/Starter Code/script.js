document.addEventListener("DOMContentLoaded", function () {
     const noteContainer = document.getElementById("note-container");
     const newNoteButton = document.getElementById("new-note-button");
     const colorForm = document.getElementById("color-form");
     const colorInput = document.getElementById("color-input");

     // **DONE - TODO: Load the note color from the local storage.
     let noteColor = localStorage.getItem("noteColor") || null; //if localStorage.noteColor exists, we set noteColor, otherwise, its null

     // **DONE - TODO: Load the note ID counter from the local storage.
     let noteIdCounter = parseInt(localStorage.getItem("noteIdCounter")) || 0; // Counter for assigning unique IDs to new notes.

     // TODO: Load the notes from the local storage.
     function readNotes() {
          let notes = localStorage.getItem("notes");
          if (!notes) {
               notes = [];
          } else {
               notes = JSON.parse(notes);
          }
          return notes;
     }

     function saveNotes(notes) {
          localStorage.setItem("notes", JSON.stringify(notes));
     }

     function loadNotes() {
          const notes = readNotes();

          for (const n of notes) {
               const note = document.createElement("textarea"); //creates the note
               note.setAttribute("data-note-id", n.id.toString()); // sets the note id
               note.value = n.content; // sets the note content
               note.className = "note"; // sets the note class
               note.style.backgroundColor = noteColor; // sets the note color
               noteContainer.appendChild(note); // appends the note to the container
          }
     }
     loadNotes(); // calls the function as the page is loaded to load the notes

     function addNewNote() {
          const id = noteIdCounter;
          const content = `Note ${id}`;

          const note = document.createElement("textarea");
          note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
          note.value = content; // Sets the note ID as value.
          note.className = "note"; // Sets a CSS class.
          note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
          noteContainer.appendChild(note); // Appends it to the note container element as its child.

          noteIdCounter++; // Increments the counter since the ID is used for this note.

          // **DONE - TODO: Add new note to the saved notes in the local storage.
          notes = readNotes(); // retrieve the notes array
          notes.push({ id, content }); //push the new notes content into the notes array
          saveNotes(notes); // call the saveNotes function to save to localStorage
          localStorage.setItem("noteIdCounter", id); // updates the noteIdCounter in localStorage
     }

     colorForm.addEventListener("submit", function (event) {
          event.preventDefault(); // Prevents the default event.

          const newColor = colorInput.value.trim(); // Removes whitespaces.

          const notes = document.querySelectorAll(".note");
          for (const note of notes) {
               note.style.backgroundColor = newColor;
          }

          colorInput.value = ""; // Clears the color input field after from submission.

          noteColor = newColor; // Updates the stored note color with the new selection.

          // DONE --- TODO: Update the note color in the local storage.
          localStorage.setItem("noteColor", noteColor);
     });

     newNoteButton.addEventListener("click", function () {
          addNewNote();
     });

     document.addEventListener("dblclick", function (event) {
          if (event.target.classList.contains("note")) {
               event.target.remove(); // Removes the clicked note.

               // **DONE - TODO: Delete the note from the saved notes in the local storage.
               let noteId = parseInt(event.target.getAttribute("data-note-id")); // returns the note id as a number
               let notes = readNotes(); // grabs the notes array
               let deleteIdx = notes.findIndex((note) => note.id === noteId); // finds the index that we want to delete
               notes.splice(deleteIdx, 1); // deletes the index we called
               saveNotes(notes); // saves the notes
          }
     });

     noteContainer.addEventListener(
          "blur",
          function (event) {
               if (event.target.classList.contains("note")) {
                    // TODO: Update the note from the saved notes in the local storage.
                    let notes = readNotes(); // grabs the note array
                    let noteId = parseInt(
                         event.target.getAttribute("data-note-id")
                    ); // grabs the note id and makes it a number
                    let updateIdx = notes.findIndex(
                         (note) => note.id === noteId
                    ); // finds the index of the note id
                    let content = event.target.value; // grabs the current content as we unfocus the note
                    notes[updateIdx].content = content; // updates the content in the notes array
                    saveNotes(notes); // saves the notes
               }
          },
          true
     );

     window.addEventListener("keydown", function (event) {
          /* Ignores key presses made for color and note content inputs. */
          if (
               event.target.id === "color-input" ||
               event.target.type === "textarea"
          ) {
               return;
          }

          /* Adds a new note when the "n" key is pressed. */
          if (event.key === "n" || event.key === "N") {
               addNewNote(); // Adds a new note.
          }
     });
});
