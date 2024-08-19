import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  background?: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      console.log("Before Deletion:", state.notes.length);
      console.log(action.payload);
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      console.log("After Deletion:", state.notes);
    },
    pinNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes[index].isPinned = !state.notes[index].isPinned;
      }
    },
    updateBackground: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index].background = action.payload.color;
      }
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
          state.notes[index] = action.payload;
      }
  },
  },
});

export const { addNote, deleteNote, pinNote ,updateBackground,updateNote} = notesSlice.actions;

export default notesSlice.reducer;
