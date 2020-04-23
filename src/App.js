import React from "react";
import Notepad from "./components/Notepad";
import FileSelector from "./components/FileSelector";
import { sampleData, checkStorage } from "./controller";

function App() {
  checkStorage();

  // state init
  let [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes"))
  );
  let [fileSelected, setFileSelected] = React.useState(
    Object.values(notes)
      .sort(dateSort)
      .map((note) => note.title)[0] ?? ""
  );

  function save(title, content) {
    setNotes((prevNotes) => {
      let newNote = {
        title: title,
        content: content,
        modificationDate: new Date(),
      };
      let newNotes = { ...prevNotes };
      newNotes[title] = newNote;
      return newNotes;
    });
  }

  function remove(title) {
    setNotes(function (prevNotes) {
      let newNotes = { ...prevNotes };
      delete newNotes[title];
      if (Object.keys(newNotes).length === 0) {
        setFileSelected("");
      } else {
        let newFirstTitle =
          Object.values(newNotes).sort(dateSort)[0].title;
        setFileSelected(newFirstTitle);
      }
      return newNotes;
    });
  }

  function create() {
    let OriginalTitle = "untitled Note";
    let title = OriginalTitle;
    let i = 1;
    while (notes[title] != null) {
      title = OriginalTitle + " " + i;
      i += 1;
    }
    let content = "Type here..";
    save(title, content);
    setFileSelected(title);
    console.log(title);
  }

  function reset() {
    localStorage.setItem("notes", JSON.stringify(sampleData));
    setNotes(JSON.parse(localStorage.getItem("notes")));
    setFileSelected(Object.values(sampleData).sort(dateSort)[0].title);
  }

  function rename(title) {
    let newTitle = prompt("New title");
    if (newTitle === null) {return;}
    remove(title);
    save(newTitle, note.content);
    setFileSelected(newTitle);
  }

  function dateSort(noteA, noteB) {
    let dateA = new Date(noteA["modificationDate"]);
    let dateB = new Date(noteB["modificationDate"]);
    return dateB - dateA;
  }

  let fileNames = Object.values(notes)
    .sort(dateSort)
    .map((e) => e.title);

  let note = notes[fileSelected];

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <h1>Notes</h1>
      {fileSelected === "" ? (
        <></>
      ) : (
        <div>
          <div className="appWrapper">
            <FileSelector
              fileSelected={fileSelected}
              setFileSelected={setFileSelected}
              fileNames={fileNames}
            />
            <Notepad
              fileSelected={fileSelected}
              note={note}
              save={save}
              remove={remove}
              rename={rename}
            />
          </div>
        </div>
      )}
      <div>
        <button onClick={create}>NEW NOTE</button>
      </div>
      <div>
        <button onClick={reset}>RESET</button>
      </div>
    </>
  );
}

export default App;
