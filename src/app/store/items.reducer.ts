import { createReducer, on } from '@ngrx/store';
import { add, remove, total } from './item.actions';
import { CartItem } from '../models/cartItem';

export interface ItemState {
  items: CartItem[];
  total: number;
}

export const initialState: ItemState = {
  items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
  total: 0,
};
export const itemsReducer = createReducer(
  initialState,
  on(add, (state,  payload ) => { // sin desestructurar // antes {product} y se eliminaba el payload.
    const hasItem = state.items.find(
      (item: CartItem) => item.product.id === payload.product.id
    );
    if (hasItem) {
      return {
        items: state.items.map((item: CartItem) => {
          if (item.product.id === payload.product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
        total: state.total,
      };
    } else {
      return {
        items: [...state.items, { product: { ...payload.product }, quantity: 1 }],
        total: state.total,
      };
    }
  }),
  //desestructurando
  on(remove, (state, {id}) => {
    return {
      items: state.items.filter((item) => item.product.id !== id),
      total:state.total
    }
  }), 
  on(total, state => {
    return{
      items: state.items,
      total: state.items.reduce(
        (total, item) => total + item.product.price * item.quantity, 0)
    }
  })
);
