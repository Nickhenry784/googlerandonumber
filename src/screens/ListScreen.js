/* eslint-disable prettier/prettier */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground,
  Image,
  FlatList,
  Alert  } from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from '../assets';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const dataButton = [
  {id: 1, image: images.phobo, background: [images.bgbunbohue1,images.bgbunbohue2,images.bgbunbohue3,images.bgbunbohue4,images.bgbunbohue5,images.bgbunbohue6,images.bgbunbohue7,images.bgbunbohue8]},
  {id: 2, image: images.gachienmam, background: [images.bggachienmam,images.bggachienmam2]},
  {id: 3, image: images.garoti, background: [images.bggaroti, images.bggaroti2]},
  {id: 4, image: images.banhxeo, background: [images.bgbanhxeo, images.bgbanhxeo2, images.bgbanhxeo3, images.bgbanhxeo4]},
  {id: 5, image: images.banhdalon, background: [images.bgbandalon, images.bgbandalon2, images.bgbandalon3, images.bgbandalon4, images.bgbandalon5, images.bgbandalon6]},
  {id: 6, image: images.phoga, background: [images.bgphoga, images.bgphoga2,images.bgphoga3,images.bgphoga4,images.bgphoga5]},
  {id: 7, image: images.ramcuon, background: [images.bgramcuon,images.bgramcuon2,images.bgramcuon3]},
  {id: 8, image: images.raumuong, background: [images.bgraumuong,images.bgraumuong2,images.bgraumuong3]},
  {id: 9, image: images.chagio, background: [images.bgchagio,images.bgchagio1,images.bgchagio2]},
];

const numCol = 3;

const ListScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const onClickStartButton = (item) => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate('Item', {background: item.background});
  };


  const onClickBackButton = () => {
    navigation.goBack();
  };


  return (
    <ImageBackground style={appStyle.homeView} source={images.bgmenu}>
        <View style={appStyle.appBar}>
          <TouchableOpacity >
            <Image source={images.note} style={appStyle.scoreStyle} />
          </TouchableOpacity>
        </View>
        <View style={appStyle.centerView}>
          <FlatList
            data={dataButton}
            scrollEnabled={false}
            numColumns={numCol}
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
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    width: windowWidth * 0.15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  centerView: {
    marginTop: 30,
    width: windowWidth,
    height: windowHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ListScreen;
