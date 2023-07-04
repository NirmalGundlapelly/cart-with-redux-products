import {Component} from 'react';
import axios from 'axios';
import { TypeItem } from '../../../../redux/slices/cartSlice';

interface IProps {
  handleAddCart: (item:TypeItem) => void
  cartList: TypeItem[],
}

interface IState {
  products: string[];
  isLoading: boolean;
}

export default class HomeController extends Component<IProps, IState> {
  state = {products: [], isLoading: true};

  componentDidMount(): void {
    this.getAllProducts();
    
  }

  getAllProducts = async () => {
    await axios
      .get('https://dummyjson.com/products')
      .then(response => 
        this.setState({products: response.data.products, isLoading: false})
      )
      .catch(error => console.log(error));
      
  };
}
