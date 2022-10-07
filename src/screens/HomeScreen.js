/* eslint-disable prettier/prettier */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../assets';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate('BUY');
  };

  const onClickStartButton = () => {
    if (points.value <= 0) {
      Alert.alert('Please buy more turn!');
      return false;
    }
    dispatch(decrement());
    navigation.navigate('Item');
  };

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.heart} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image
        source={images.GuessOfThethreeKingdoms}
        style={appStyle.phoneImage}
      />
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.start} style={appStyle.itemView} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  popupImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d8b58a',
  },
  closeView: {
    position: 'absolute',
    top: '0%',
    right: '-10%',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  okBtn: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '0%',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.3,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomView: {
    height: windowHeight * 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  phoneImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
