import {Component} from 'react';
import { TypeItem } from '../../../../redux/slices/cartSlice';
import RazorpayCheckout from 'react-native-razorpay';
import { Alert } from 'react-native';

interface IProps {
  cartList: TypeItem[];
  incrementCartItemQuantity: (item:TypeItem) => void;
  decrementCartItemQuantity: (item:TypeItem) => void;

}

interface IState {}

export default class CartController extends Component<IProps, IState> {

  handleCheckout = () =>  {
    var options:any = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'USD',
      key: 'rzp_test_locuRaWt3KL2uf',
      amount: '5000',
      name: 'Cart',
      order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'nirmalgoud2103@gmail.com',
        contact: '6281337154',
        name: 'Nirmal Gundlapelly'
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data:any) => {
      // handle success
      Alert.alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error:any) => {
      // handle failure
      Alert.alert(`Error: ${error.code} | ${error.description}`);
    });

  }

}
