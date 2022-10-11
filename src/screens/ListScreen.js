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
import {ScrollView} from 'react-native-gesture-handler';

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

const ListScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = item => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate('Item', {background: item.background});
  };

  const onClickTurnButton = () => {
    navigation.navigate('BUY');
  };

  const onClickBackButton = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground style={appStyle.homeView} source={images.bg1}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickBackButton}>
          <Image source={images.back} style={appStyle.scoreStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.view} style={appStyle.scoreStyle} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.centerView}>
        <FlatList
          data={dataButton}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickStartButton(item)}>
              <Image source={item.image} style={appStyle.itemView} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.home} style={appStyle.btn} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  appBar: {
    height: windowHeight * 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.15,
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  turnText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ListScreen;
