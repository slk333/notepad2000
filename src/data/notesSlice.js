
import { createSlice } from '@reduxjs/toolkit';

let sampleData = {
  test: {
    title: "test",
    content: `write anything!`,
    modificationDate: "2020-04-16T13:14:13.585Z",
  },
  "avocado recipe": {
    title: "avocado recipe",
    content: `Mashed avocado is more creamy and luxurious than sliced avocado (think guacamole vs. plain avocado). But don’t mash it on the toast! You risk poking holes in your toast or smashing it. Cut your avocados in half, remove the pit, scoop the flesh into a bowl or onto the side of your plate, and mash it up with a fork.`,
    modificationDate: "2020-04-16T13:12:13.585Z",
  },
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState: sampleData,
  reducers: {
    addNote: (state,action) => {
      let title = action.payload.title
      let content = action.payload.content
      let modificationDate = new Date().toJSON()
      state[title] = {title,content,modificationDate}
 
      
      
    },
    deleteNote: (state,action) => {
      delete state[action.payload]
    },
    editNote: (state,action) => {
      state[action.payload.title].content = action.payload.content
    },
    resetNotes: (state) => {
      return sampleData
    },

   
   
  },
});

export const { addNote, deleteNote,editNote,resetNotes } = notesSlice.actions;


export const selectNotes = state => Object.values(state.notes).sort(dateSort);
export const selectNotesDirectory = state => state.notes;

export default notesSlice.reducer;

function dateSort(noteA, noteB) {
  let dateA = new Date(noteA["modificationDate"]);
  let dateB = new Date(noteB["modificationDate"]);
  return dateB - dateA;
}