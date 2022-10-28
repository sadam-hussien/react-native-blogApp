import {createSlice} from "@reduxjs/toolkit";

const favReducer = createSlice({
  name: "fav_reducer",
  initialState: {items: []},
  reducers: {
    action_add_to_fav: (state, action) => {
      state.items.push(action.payload);
    },
    action_remove_from_fav: (state, action) => {
      state.items = state.items.filter(
        item => item.ItemID !== action.payload.ItemID,
      );
    },
  },
});

const {action_add_to_fav, action_remove_from_fav} = favReducer.actions;

export default favReducer.reducer;

export {action_add_to_fav, action_remove_from_fav};
