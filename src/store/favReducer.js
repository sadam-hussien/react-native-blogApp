import {createSlice} from "@reduxjs/toolkit";

const favReducer = createSlice({
  name: "fav_reducer",
  initialState: {items: []},
  reducers: {
    action_add_to_fav: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

const {action_add_to_fav} = favReducer.actions;

export default favReducer.reducer;

export {action_add_to_fav};
