import { createSlice } from "@reduxjs/toolkit";

const HandlerSelectorSlice = createSlice({
  name: "handleSelector",
  initialState: {
    selectedIds: [],
  },
  reducers: {
    toggleHandleSelect: (state, action) => {
      const clickedId = action.payload;

      const exists = state.selectedIds.includes(clickedId);

      if (exists) {
        // deselect
        state.selectedIds = state.selectedIds.filter((id) => id !== clickedId);
      } else {
        // select
        state.selectedIds.push(clickedId);
      }
    },

    clearAllSelections: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleHandleSelect, clearAllSelections } =
  HandlerSelectorSlice.actions;

export default HandlerSelectorSlice.reducer;
