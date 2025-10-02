import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    itemQuantities: {}, // Add this to track quantities
  },
  reducers: {
    addItems: (state, action) => {
      const item = action.payload;
      // Update quantities
      state.itemQuantities[item.card.info.id] =
        (state.itemQuantities[item.card.info.id] || 0) + 1;
      // Add item if it doesn't exist
      if (!state.items.find((i) => i.card.info.id === item.card.info.id)) {
        state.items.push(item);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      // Decrease quantity
      if (state.itemQuantities[itemId] > 1) {
        state.itemQuantities[itemId]--;
      } else {
        // Remove item completely if quantity becomes 0
        delete state.itemQuantities[itemId];
        state.items = state.items.filter(
          (item) => item.card.info.id !== itemId
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemQuantities = {};
    },
  },
});

export const { addItems, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
