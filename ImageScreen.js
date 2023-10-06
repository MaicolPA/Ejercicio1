import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { musicStyles } from './data';

function ImageScreen({ route }) {
  const { imageId } = route.params;
  const navigation = useNavigation();

  const estiloRock = musicStyles.find((style) => style.name === route.params.albumType);
  let dataList = [];

  if (estiloRock && imageId !== '') {
    dataList = estiloRock.albums[imageId - 1].songs;
  }

  const albumName = musicStyles[route.params.idalbum - 1].albums[0].name;
  const imageSource = {
    uri: `./${albumName}.jpg`,
  };

  const navigateToRepro = (idalbum, albumType, imageId, namesong) => {
    navigation.navigate('Repro', { idalbum, albumType, imageId, namesong });
  };

  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <Image style={styles.imgalbum} source={estiloRock.albums[imageId - 1].image}></Image>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.albumName}>{musicStyles[route.params.idalbum - 1].albums[route.params.imageId - 1].name}</Text>
        <ScrollView>
          {dataList.map((item, index) => (
            <View style={styles.songContainer} key={index}>
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item}</Text>
                <Text style={styles.singerName}>{musicStyles[route.params.idalbum - 1].albums[imageId - 1].singer}</Text>
              </View>
              <View style={styles.songOptions}>
                <TouchableWithoutFeedback onPress={() => navigateToRepro(route.params.idalbum, route.params.albumType, imageId, item)}>
                  <Text style={styles.icon}>
                    <Icon name="play-outline" size={20} />
                  </Text>
                </TouchableWithoutFeedback>
                <Icon name="remove-circle-outline" size={20} />
                <Icon name="heart-outline" size={20} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: 'center', 
  },
  imgalbum: {
    width: 250,
    height: 200,
    marginRight: 10,
  },
  detailsContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  albumName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  songContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.95,
    borderTopWidth: 2,
    marginBottom: 10,
  },
  songDetails: {
    flex: 1,
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  singerName: {
    fontSize: 17,
  },
  songOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: 100,
  },
  icon: {},
});

export default ImageScreen;
