/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../assets';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ItemScreen = ({navigation, route}) => {
  const {background} = route.params;
  const [index, setIndex] = useState(0);

  const onClickNextBtn = () => {
    if (index !== background.length - 1) {
      setIndex(index + 1);
    }
  };

  const onClickBackBtn = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={background[index]} style={appStyle.scrollStyle}>
        <View style={appStyle.bottomView}>
          <TouchableOpacity onPress={() => onClickBackBtn()}>
            <Image source={images.back} style={appStyle.btn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.home} style={appStyle.btn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClickNextBtn()}>
            <Image source={images.next} style={appStyle.btn} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  scrollStyle: {
    width: windowWidth,
    height: windowHeight * 1.2,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
  },
  startBtn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default ItemScreen;
