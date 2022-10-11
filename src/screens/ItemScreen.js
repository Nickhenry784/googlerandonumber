/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../assets';
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.cavoi, url: 'voice_ca_voi.mp3', title: 'Whale'},
  {id: 2, bg: images.cao, url: 'voice_cao.mp3', title: 'Fox'},
  {id: 3, bg: images.cumeo, url: 'voice_cu_meo.mp3', title: 'Owl'},
  {id: 4, bg: images.nhai, url: 'voice_nhai.mp3', title: 'Frog'},
  {id: 5, bg: images.ngua, url: 'voice_ngua.mp3', title: 'Horse'},
  {id: 6, bg: images.meo, url: 'voice_meo.mp3', title: 'Cat'},
  {id: 7, bg: images.pig, url: 'voice_pig.mp3', title: 'Pig'},
  {id: 8, bg: images.ho, url: 'voice_ho.mp3', title: 'Tiger'},
  {id: 9, bg: images.gau, url: 'voice_gau.mp3', title: 'Bear'},
  {id: 10, bg: images.rong, url: 'voice_rong.mp3', title: 'Dragon'},
  {id: 11, bg: images.vit, url: 'voice_vit.mp3', title: 'Duck'},
];

const ItemScreen = ({navigation, route}) => {
  const [index, setIndex] = useState(0);
  const [soundPlay, setSoundPlay] = useState(null);

  useEffect(() => {
    Sound.setCategory('Playback');
    const whoosh = new Sound(dataBg[index].url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    whoosh.setVolume(1);
    setSoundPlay(whoosh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[]);

  useEffect(() => {
    Sound.setCategory('Playback');
    const whoosh = new Sound(dataBg[index].url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    whoosh.setVolume(1);
    setSoundPlay(whoosh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[index]);

  const onClickLeftBtn = () => {
    if (index !== 0) {
      setIndex(index - 1);
      soundPlay.release();
    }
  };

  const onClickRightBtn = () => {
    if (index !== dataBg.length - 1) {
      setIndex(index + 1);
      soundPlay.release();
    }
  };

  const onClickCloseBtn = () => {
    navigation.goBack();
    soundPlay.release();
  };

  const onClickPlayBtn = () => {
    soundPlay.play();
  };

  const onClickPauseBtn = () => {
    soundPlay.pause();
  };
  return (
    <ImageBackground style={appStyle.homeView} source={dataBg[index].bg}>
      <View style={appStyle.closeView}>
        <TouchableOpacity onPress={() => onClickCloseBtn()}>
          <Image source={images.arrowback} style={appStyle.btnCl} />
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickLeftBtn()}>
          <Image source={images.back} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickPlayBtn()}>
          <Image source={images.play} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickPauseBtn()}>
          <Image source={images.pause} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickRightBtn()}>
          <Image source={images.next} style={appStyle.btn} />
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
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  closeView: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '5%',
    left: '5%',
    backgroundColor: 'white',
  },
  centerView: {
    width: '70%',
    height: windowHeight * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  waterView: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    position: 'absolute',
    top: '8%',
    left: '0%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btnClose: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.5,
    resizeMode: 'contain',
  },
  btnCl: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  waterImage: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.08,
    resizeMode: 'contain',
  },
  btn: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
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
