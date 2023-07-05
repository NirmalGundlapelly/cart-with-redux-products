import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HomeController from './HomeController';
import STRINGS from '../../config';
import {horizontalScale, moderateScale, verticalScale} from '../../../../dimensions/Matrices';
import { TypeItem, handleAddCart} from '../../../../redux/slices/cartSlice'
import { connect } from 'react-redux';
import { RootState } from '../../../../redux/store';

class Home extends HomeController {
  renderProductItem = (item: TypeItem) => {
    const isProduct = this.props.cartList.find((eachItem:TypeItem)=> eachItem.id === item.id)
   
    return (
      <>
        <TouchableHighlight>
          <View style={styles.productItem}>
            <View style={styles.itemCardContainer}>
              <Image resizeMode='stretch' style={styles.thumbnail} source={{uri: item.thumbnail}} />
              <View style={styles.itemPriceContainer}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}.00</Text>
                <Text style={styles.itemRating}>Rating: *{item.rating}</Text>
                <TouchableOpacity disabled={isProduct ? true : false} onPress={() => this.props.handleAddCart({...item, quantity:1})} style={{...styles.addCartButton, backgroundColor:isProduct ? STRINGS.DISABLE: STRINGS.ORANGE}}>
                  <Text style={styles.buttonText}>{STRINGS.ADD_TO_CART}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </>
    );
  };

  render() {
    const {products} = this.state;
    return (
      <SafeAreaView>
        <View style={{marginTop: 0}}>
          <View style={styles.navBarContainer}>
            <Text style={styles.navHeading}>{STRINGS.PRODUCTS}</Text>
          </View>
          <View>
            <View style={styles.productFlatContainer}>
              {this.state.isLoading ? (
                <View style={{marginTop: moderateScale(190)}}>
                  <ActivityIndicator
                    color={STRINGS.BLACK}
                    size="large"></ActivityIndicator>
                </View>
              ) : (
                <>
                  {products.length === 0 ? (
                    <Text style={styles.noProductsAvailableText}>
                      {STRINGS.NO_PRODUCTS_AVAILABLE}
                    </Text>
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={products}
                      renderItem={({item}) => this.renderProductItem(item)}
                      keyExtractor={(item: any) => item.id}
                    />
                  )}
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cartList: state.cart.cartList
});

export default connect(mapStateToProps, {
  handleAddCart
})(Home);  

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
    height: verticalScale(665),
    padding: 1,
    marginHorizontal:moderateScale(10),
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
    borderRadius:5,
    height: verticalScale(140),
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
    fontSize:moderateScale(15),
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
    color: 'white',
    fontSize: 30,
    marginTop: 70,
    textAlign: 'center',
  },
  addCartButton:{
    backgroundColor:STRINGS.ORANGE,
    width:horizontalScale(100),
    borderRadius:5
  },
  buttonText:{
    color:STRINGS.WHITE,
    padding:moderateScale(7),
    textAlign:'center'
  }
});
