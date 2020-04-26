import React from "react";
import Notepad from "./components/Notepad";
import FileSelector from "./components/FileSelector";
import { useSelector, useDispatch } from "react-redux";
import {
  addNote,
  resetNotes,
  selectSortedNotes,
  selectNotesDirectory,
  selectFirstTitle,
} from "./data/notesSlice";

function App() {
  const notes = useSelector(selectSortedNotes);
  const notesDirectory = useSelector(selectNotesDirectory);
  const firstTitle = useSelector(selectFirstTitle);
  const dispatch = useDispatch();

  let [fileSelected, setFileSelected] = React.useState(firstTitle);

  React.useEffect(() => {
    setFileSelected(firstTitle);
    console.log("render App");
  }, [notes, firstTitle]);

  function getNewTitle() {
    let OriginalTitle = "untitled Note";
    let title = OriginalTitle;
    let i = 1;
    while (notesDirectory[title] != null) {
      title = OriginalTitle + " " + i;
      i += 1;
    }
    return title;
  }

  function create() {
    let title = getNewTitle();
    let content = "";
    dispatch(addNote({ title, content }));
  }

  function reset() {
    dispatch(resetNotes());
    setFileSelected("test");
  }

  let fileNames = notes.map((note) => note.title);

  let note = notesDirectory[fileSelected] ?? {};

  return (
    <>
      <h1>Notes</h1>
      {notes.length === 0 ? null : (
        <div className="appWrapper">
          <FileSelector
            fileSelected={fileSelected}
            setFileSelected={setFileSelected}
            fileNames={fileNames}
          />
          <Notepad note={note} />
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
