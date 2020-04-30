import React from "react";
import Notepad from "./components/Notepad";
import FileSelector from "./components/FileSelector";
import { useSelector, useDispatch } from "react-redux";

import {
  addNote,
  resetNotes,
  selectSortedNotes,
  selectNotesDirectory,
  selectMostRecentNote,
} from "./data/notesSlice";

function App() {
  const notes = useSelector(selectSortedNotes);
  const notesDirectory = useSelector(selectNotesDirectory);
  const mostRecentNote = useSelector(selectMostRecentNote);
  const dispatch = useDispatch();


  let [fileSelected, setFileSelected] = React.useState(mostRecentNote?.title);

  React.useEffect(() => {
  // select the most recent note
  // should not conflict with user selecting another note
  // only called on note creation on deletion, or in page reload
  // should not be called when the fileSelected has been changed

  // when data is deleted, fileSelected has an incorrect value
  // we need a second render with the correct value coming from redux

    if (mostRecentNote == null){return}
    setFileSelected(mostRecentNote.title);
  }, [notes, mostRecentNote]);

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

  let note = notesDirectory[fileSelected] ?? mostRecentNote;

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
         {(note === undefined) ? <Notepad note={note}/> : <Notepad note={note}/> } 
        </div>
      )}
      <div>
        <button onClick={create}>NEW NOTE</button>
      </div>
      <div>
        {/* <button onClick={reset}>RESET</button> */}
      </div>
    </>
  );
}

export default App;
