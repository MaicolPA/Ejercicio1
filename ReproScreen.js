import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { musicStyles } from './data';
import Icon1 from 'react-native-vector-icons/Ionicons';

const ReproScreen = ({ route }) => {
  const { imageId } = route.params;
  const estiloRock = musicStyles.find((style) => style.name === route.params.albumType);
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadAudio = async () => {
    const soundObject = new Audio.Sound();
    const songIndex = musicStyles[route.params.idalbum - 1].albums[imageId - 1].songs.findIndex(
      (song) => song === route.params.namesong
    );
    const sonsFileName = `${route.params.namesong}.mp3`;
    const mp3FileNamesong = sonsFileName.replace(/\s+/g, '');
  try {
    const audioUrl = estiloRock.albums[imageId - 1].mp3;
    //await soundObject.loadAsync(require('./scr/mp3/Demons.mp3'));
    await soundObject.loadAsync({ uri: estiloRock.albums[imageId - 1].mp3 });

    setSound(soundObject);
    console.log("Audio cargado con éxito");
  } catch (error) {
    console.error('Error al cargar el audio', error);
  }
  };

  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const updatePosition = async () => {
      if (sound && isPlaying) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      }
    };

    const intervalId = setInterval(updatePosition, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [sound, isPlaying]);

  const playAudio = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const seekForward = async () => {
    if (sound) {
      const newPosition = position + 10000;
      if (newPosition < duration) {
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  };

  const seekBackward = async () => {
    if (sound) {
      const newPosition = position - 10000;
      if (newPosition <= 0) {
        await sound.setPositionAsync(0);
        setPosition(0);
      } else {
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const onSliderValueChange = (value) => {
    setPosition(value);
  };

  const onSliderSlidingComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.subcategoria}>
          <View style={styles.imgcategoria}>
            <Image style={styles.imgcategoria} source={estiloRock.albums[imageId - 1].image}></Image>
          </View>
          <View style={styles.textcategoria}>
            <Text style={styles.namecantante}>{route.params.namesong}</Text>
            <Text>{musicStyles[route.params.idalbum - 1].albums[route.params.imageId - 1].name}</Text>
          </View>
        </View>

        {/* Tu código para mostrar la lista de canciones va aquí */}

        <View style={styles.subcategoriaopc}>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <TouchableWithoutFeedback onPress={seekBackward}>
                <View style={styles.seekButton}>
                  <Icon1
                    name="play-back-sharp"
                    size={30}
                    color="#56D4FA"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.button}>
              <TouchableWithoutFeedback onPress={togglePlayPause}>
                <View style={styles.playPauseButton}>
                  <Icon1
                    name={isPlaying ? 'pause-sharp' : 'play-sharp'}
                    size={30}
                    color="#56D4FA"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.button}>
              <TouchableWithoutFeedback onPress={stopAudio}>
                <View style={styles.stopButton}>
                  <Icon1
                    name="stop-sharp"
                    size={30}
                    color="#56D4FA"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.button}>
              <TouchableWithoutFeedback onPress={seekForward}>
                <View style={styles.seekButton}>
                  <Icon1
                    name="play-forward-sharp"
                    size={30}
                    color="#56D4FA"
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '80%' }}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={onSliderValueChange}
            onSlidingComplete={onSliderSlidingComplete}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgcategoria: {
    height: Dimensions.get('window').height * 0.20,
    width: Dimensions.get('window').width * 0.60,
  },
  textcategoria: {
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcategoria: {
    height: Dimensions.get('window').height * 0.30,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subcategoriaopc: {
    height: Dimensions.get('window').height * 0.10,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contcancion: {
    width: Dimensions.get('window').width * 0.65,
    flexDirection: 'column',
  },
  contcanciones: {
    flexDirection: 'row',
  },
  contexcanciones: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.03,
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 1,
  },
  namcantante: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.03,
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  namecantante: {
    color: 'black',
    fontSize: 13,
  },
  namecancion: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  button: {
    width: Dimensions.get('window').width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: Dimensions.get('window').width * 0.80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seekButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReproScreen;
