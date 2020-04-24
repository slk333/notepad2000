import { createSlice } from "@reduxjs/toolkit";
import sampleData from "./sampleData";

export const notesSlice = createSlice({
  name: "notes",
  initialState: sampleData,
  reducers: {
    addNote: (state, action) => {
      let { title, content } = action.payload;
      let modificationDate = new Date().toJSON();
      state[title] = { title, content, modificationDate };
    },

    deleteNote: (state, action) => {
      delete state[action.payload];
    },

    editNote: (state, action) => {
      let { title, content } = action.payload;
      state[title].content = content;
    },

    resetNotes: (state) => {
      return sampleData;
    },
  
  },
});

export const { addNote, deleteNote, editNote, resetNotes } = notesSlice.actions;

// notes array sorted by modification date
export const selectNotes = (state) => Object.values(state.notes).sort(dateSort);
// all notes indexed by their title in one object
export const selectNotesDirectory = (state) => state.notes;
// first note title
export const selectFirstTitle = (state) =>
// check if notes is empty
  Object.values(state.notes).length === 0
    ? ""
    : Object.values(state.notes).sort(dateSort)[0].title;

export default notesSlice.reducer;

// util
function dateSort(noteA, noteB) {
  let dateA = new Date(noteA["modificationDate"]);
  let dateB = new Date(noteB["modificationDate"]);
  return dateB - dateA;
}
