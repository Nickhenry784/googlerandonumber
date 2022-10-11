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

const dataButton = [
  {
    id: 1,
    image: images.a1,
    background: [
      images.bga1,
      images.bga2,
      images.bga3,
      images.bga4,
      images.bga5,
      images.bga6,
    ],
  },
  {
    id: 2,
    image: images.a2,
    background: [
      images.bga7,
      images.bga8,
      images.bga9,
      images.bga10,
      images.bga11,
      images.bga12,
    ],
  },
  {
    id: 3,
    image: images.a3,
    background: [
      images.bga13,
      images.bga14,
      images.bga15,
      images.bga16,
      images.bga17,
    ],
  },
  {
    id: 4,
    image: images.a4,
    background: [
      images.bga18,
      images.bga19,
      images.bga20,
      images.bga21,
      images.bga22,
    ],
  },
];

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
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={background[index]} style={appStyle.scrollStyle}>
        <View style={appStyle.backView}>
          <TouchableOpacity onPress={() => onClickBackBtn()}>
            <Image source={images.back} style={appStyle.startBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClickNextBtn()}>
            <Image source={images.next} style={appStyle.startBtn} />
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
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backView: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: '0%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
