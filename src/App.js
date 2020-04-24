import React from "react";
import Notepad from "./components/Notepad";
import FileSelector from "./components/FileSelector";
import { useSelector, useDispatch } from "react-redux";
import { addNote, deleteNote,selectNotes,selectNotesDirectory ,resetNotes} from "./data/notesSlice";


function App() {
 
React.useEffect(()=>console.log("render"))

  const notes = useSelector(selectNotes);
  const notesDirectory = useSelector(selectNotesDirectory);
  const dispatch = useDispatch();


  let [fileSelected, setFileSelected] = React.useState(
    (notes.length === 0) ? "" : notes[0].title
    
  );

  function save(title, content) {
    dispatch(addNote({title,content}))
    setFileSelected(title)
  }

  function remove(title) {
    dispatch(deleteNote(title))
    if (notes[1] === undefined){return}
  setFileSelected(notes[1].title)
  }

  function getNewTitle(){
    let OriginalTitle = "untitled Note";
    let title = OriginalTitle;
    let i = 1;
    while (notesDirectory[title] != null) {
      title = OriginalTitle + " " + i;
      i += 1;
    }
    return title
  }

  function create() {
    let title = getNewTitle()
    let content = "Type here..";
    save(title, content);
  }

  function reset() {
    dispatch(resetNotes())
    setFileSelected("test")
   
  }

  function rename(title) {
     let newTitle = prompt("New title");
     if (newTitle === null) {return;}
     remove(title);
     save(newTitle, note.content);
     setFileSelected(newTitle);
  }



  let fileNames = notes
    .map((e) => e.title);

  let note = notesDirectory[fileSelected];

  // React.useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

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
