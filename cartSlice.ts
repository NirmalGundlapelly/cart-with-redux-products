import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface TypeItem {
  title: string;
  price: number;
  rating: string;
  id: number;
  thumbnail: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {cartList: [], itemQuantity: 1},
  reducers: {
    handleAddCart: (
      state: {
        cartList: {
          id: number;
          rating: string;
          thumbnail: string;
          title: string;
          price: number;
          quantity: number;
        }[];
        itemQuantity: number;
      },
      action: PayloadAction<TypeItem>,
    ) => {
      const productObject = state.cartList.find(
        (each: {id: number}) => each.id === action.payload.id,
      );
      console.log('add clicked', action.payload);
      if (productObject) {
        state.cartList = state.cartList.map((eachItem: TypeItem) => {
          if (productObject.id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + 1;
            state.itemQuantity = updatedQuantity;
            return {...eachItem, quantity: updatedQuantity};
          }
          return eachItem;
        });
      } else {
        const updatedCartList = [...state.cartList, action.payload];
        state.cartList = updatedCartList;
      }
    },

    incrementCartItemQuantity: (
      state: {
        cartList: {
          id: number;
          rating: string;
          thumbnail: string;
          title: string;
          price: number;
          quantity: number;
        }[];
        itemQuantity: number;
      },
      action: PayloadAction<TypeItem>,
    ) => {
      state.cartList = state.cartList.map((eachItem: TypeItem) => {
        if (action.payload.id === eachItem.id) {
          state.itemQuantity = eachItem.quantity + 1;
          const updatedQuantity = eachItem.quantity + 1;
          return {...eachItem, quantity: updatedQuantity};
        }
        return eachItem;
      });
    },

    decrementCartItemQuantity: (
      state: {
        cartList: {
          id: number;
          rating: string;
          thumbnail: string;
          title: string;
          price: number;
          quantity: number;
        }[];
        itemQuantity: number;
      },
      action: PayloadAction<TypeItem>,
    ) => {
      const productObject = state.cartList.find(
        (eachCartItem: TypeItem) => eachCartItem.id === action.payload.id,
      );

      if (productObject && !undefined && productObject.quantity > 1) {
        state.cartList = state.cartList.map((eachCartItem: TypeItem) => {
          if (action.payload.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return {...eachCartItem, quantity: updatedQuantity};
          }
          return eachCartItem;
        });
      } else {
        const updatedCartList = state.cartList.filter(
          eachCartItem => eachCartItem.id !== action.payload.id,
        );

        state.cartList = updatedCartList;
      }
    },
  },
});

const {actions, reducer} = cartSlice;

export const {
  handleAddCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} = actions;

export default reducer;
