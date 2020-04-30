import React from "react";
import { useDispatch } from "react-redux";
import { addNote, deleteNote } from "../data/notesSlice";
import useDebounce from "../use-debounce";

/* The Notepad edits a single file at a time*/

// CSS

import styled from "styled-components";
const StyledNotePad = styled.div`
  display: inline-block;
  min-width: 35em;
  .buttonList {
    margin-left: 1em;
  }
  .buttonList button {
    border: 1px solid #333;
  }
`;
let selectedButtonStyle = {
  backgroundColor: "white",
  color: "#333",
  border: "#333 1px solid",
};

// Notepad Component

export default function Notepad({ note }) {
  const dispatch = useDispatch();
  // internal state
  let [noteIsSaved, setNoteIsSaved] = React.useState(true);
  let [textAreaText, setTextAreaText] = React.useState(note.content);
  const textAreaRef = React.useRef(null);
  const debouncedSearchTerm = useDebounce(textAreaText, 1500);


  const saveCallback = React.useCallback(() => {
    save(note.title, textAreaRef.current.value);
  }, [note]);

  // on new render effet
  React.useEffect(() => {
    console.log(`rendered Notepad with note "${note.title}"`);
    textAreaRef.current.focus();
    setTextAreaText(note.content);
    setNoteIsSaved(true);
  }, [note]);

  React.useEffect(() => {
    saveCallback();
  }, [debouncedSearchTerm]);

  function save(title = note.title, content = textAreaText) {
    dispatch(addNote({ title, content }));
    setNoteIsSaved(true);
  }

  function remove(title = note.title) {
    dispatch(deleteNote(title));
  }

  function rename(title = note.title, content = textAreaText) {
    let newTitle = prompt("New title");
    if (newTitle === null) {
      return;
    }
    remove(title);
    save(newTitle, content);
  }

  function updateTextArea(event) {
    setTextAreaText(event.target.value);
    setNoteIsSaved(false);
  }

  return (
    <StyledNotePad>
      <textarea
        placeholder="type here.."
        ref={textAreaRef}
        value={textAreaText}
        onChange={updateTextArea}
        onBlur={() => {
          if (!noteIsSaved) {
            save();
          }
        }}
      ></textarea>
      <div className="buttonList">
        {noteIsSaved ? (
          <button onClick={() => save()}>SAVE</button>
        ) : (
          <button style={selectedButtonStyle} onClick={() => save()}>
            SAVE
          </button>
        )}
        <button onClick={() => remove()}>DELETE</button>
        <button onClick={() => rename()}>RENAME</button>
      </div>
    </StyledNotePad>
  );
}
