import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData, UserInfo } from "../../../../../types";

interface InitialState {
    cartItems: ProductData[];
    userInfo: UserInfo | null;
}

const initialState: InitialState = {
    cartItems: [],
    userInfo: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCartFruitVegetableMature: (
            state,
            action: PayloadAction<{ item: ProductData; matureQuantity: number }>
        ) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload.item._id
            );

            if (existingItem) {
                existingItem.matureQuantity = action.payload.matureQuantity;
            } else {
                state.cartItems.push({
                    ...action.payload.item,
                    matureQuantity: action.payload.matureQuantity,
                });
            }
        },
        addToCartFruitVegetableGreen: (
            state,
            action: PayloadAction<{ item: ProductData; greenQuantity: number }>
        ) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload.item._id
            );

            if (existingItem) {
                existingItem.greenQuantity = action.payload.greenQuantity;
            } else {
                state.cartItems.push({
                    ...action.payload.item,
                    greenQuantity: action.payload.greenQuantity,
                });
            }
        },
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        addToCartBatch: (state, action: PayloadAction<ProductData[]>) => {
            action.payload.forEach((newItem) => {
                const existingItem = state.cartItems.find(
                    (item) => item._id === newItem._id
                );

                if (existingItem) {
                    // If item exists, update its quantity
                    existingItem.quantity =
                        (existingItem.quantity || 0) + (newItem.quantity || 1);

                    // Update maturity quantities if they exist
                    if (newItem.matureQuantity) {
                        existingItem.matureQuantity =
                            (existingItem.matureQuantity || 0) +
                            newItem.matureQuantity;
                    }
                    if (newItem.greenQuantity) {
                        existingItem.greenQuantity =
                            (existingItem.greenQuantity || 0) +
                            newItem.greenQuantity;
                    }
                } else {
                    // If item doesn't exist, add it to cart
                    state.cartItems.push({
                        ...newItem,
                        quantity: newItem.quantity || 1,
                    });
                }
            });
        },
        increaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload
            );

            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload
            );

            if (existingItem) {
                existingItem.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
        },
        resetCart: (state) => {
            state.cartItems = [];
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
    },
});

export const {
    addToCart,
    addToCartFruitVegetableMature,
    addToCartFruitVegetableGreen,
    addToCartBatch,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    resetCart,
    removeUser,
    addUser,
} = cartSlice.actions;
export default cartSlice.reducer;
