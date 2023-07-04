import {Component} from 'react';

interface IProps {
  cartList: any;
  incrementCartItemQuantity: (item:any) => void;
  decrementCartItemQuantity: (item:any) => void;

}

interface IState {}

export default class CartController extends Component<IProps, IState> {}
