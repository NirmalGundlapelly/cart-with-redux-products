import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CartController from './CartController';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../../dimensions/Matrices';
import {RootState} from '../../../../redux/store';
import {
  incrementCartItemQuantity,
  decrementCartItemQuantity,
} from '../../../../redux/slices/cartSlice';
import STRINGS from '../../config';
import {connect} from 'react-redux';

class Cart extends CartController {
  renderProductItem = (item: any) => {
    console.log('item', item);
    return (
      <>
        <TouchableHighlight>
          <View style={styles.productItem}>
            <View style={styles.itemCardContainer}>
              <Image style={styles.thumbnail} source={{uri: item.thumbnail}} />
              <View style={styles.itemPriceContainer}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemPrice}>
                  ${item.price * item.quantity}.00
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.decrementCartItemQuantity(item)}
                    style={styles.minusButton}>
                    <Text style={{fontSize: 30}}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityButton}>
                    {item.quantity ? item.quantity : 1}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.incrementCartItemQuantity(item)}
                    style={styles.plusButton}>
                    <Text style={{fontSize: 30}}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </>
    );
  };

  render() {
    const {cartList} = this.props;
    return (
      <SafeAreaView>
        <View style={styles.productFlatContainer}>
          <>
            {cartList.length === 0 ? (
              <Text style={styles.noProductsAvailableText}>
                {STRINGS.NO_PRODUCTS_AVAILABLE}
              </Text>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={cartList}
                renderItem={({item}) => this.renderProductItem(item)}
                keyExtractor={(item: any) => item.id}
              />
            )}
          </>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cartList: state.cart.cartList,
});

export default connect(mapStateToProps, {
  incrementCartItemQuantity,
  decrementCartItemQuantity,
})(Cart);

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navHeading: {
    color: STRINGS.BLACK,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '500',
  },
  productHeading: {
    backgroundColor: '#f79934',
    padding: 10,
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productFlatContainer: {
    height: verticalScale(722),
    padding: 1,
    marginHorizontal: moderateScale(10),
    borderRadius: 10,
  },
  productItem: {
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    margin: 5,
    height: verticalScale(170),
  },
  thumbnail: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    height: verticalScale(150),
    width: horizontalScale(120),
  },
  itemTitleText: {
    width: '60%',
    color: 'black',
    fontSize: moderateScale(15),
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCategoryText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCardContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPriceContainer: {
    width: 300,
    marginLeft: 20,
  },
  itemPrice: {
    color: 'green',
    fontSize: moderateScale(15),
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemRating: {
    color: '#f79934',
    fontSize: moderateScale(15),
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },

  // Input
  input: {
    height: 40,
    width: 200,
    borderRadius: 5,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 10,
    marginTop: 10,
  },

  // Empty Products List View
  noProductsAvailableText: {
    color: 'black',
    fontSize: 30,
    marginTop: 150,
    textAlign: 'center',
  },
  addCartButton: {
    backgroundColor: STRINGS.ORANGE,
    width: horizontalScale(100),
    borderRadius: 5,
  },
  buttonText: {
    color: STRINGS.WHITE,
    padding: moderateScale(7),
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: 'rgba(129, 138, 152, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
    height: 30,
    width: 130,
  },

  minusButton: {
    width: 40,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: 'white',
    width: 40,
    height: 45,
    textAlign: 'center',
    paddingTop: 13,
  },
  plusButton: {
    width: 40,
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
