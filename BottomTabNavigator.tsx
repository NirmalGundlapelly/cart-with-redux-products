import React, {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../blocks/bottomTabScreens/homeScreen/Home';
import Cart from '../blocks/bottomTabScreens/cartScreen/Cart';
import { moderateScale} from '../../dimensions/Matrices';

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen options={{tabBarStyle:{
            marginBottom:moderateScale(5)
        }, tabBarLabelStyle:{fontSize:moderateScale(12)}}} name="Home" component={Home} />
        <Tab.Screen options={{tabBarStyle:{
            marginBottom:moderateScale(5)
        }, tabBarLabelStyle:{fontSize:moderateScale(12)}}} name="Cart" component={Cart} />
      </Tab.Navigator>
    );
  }
}
    