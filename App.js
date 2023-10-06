import React from 'react';
import {View, StyleSheet, Image, Text, ScrollView, StatusBar, Dimensions, SafeAreaView, TouchableWithoutFeedback, Modal, Button, TouchableHighlight} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageScreen from './ImageScreen';
import ReproScreen from './ReproScreen';
import { musicStyles } from './data';


function HomeScreen({ navigation }) {
  const { width, height } = Dimensions.get('window');

  const navigateToImage = (idalbum,albumType, imageId) => {
    // Navegar a la pantalla de Imagen y pasar el tipo de álbum y el imageId como parámetros
    navigation.navigate('Image', {idalbum, albumType, imageId });
  };


return (
  <ScrollView>
    {musicStyles.map((style) => (
      <View style={styles.contenedor} key={style.id}>
        <Text style={styles.titulo}>{style.name}</Text>
        <ScrollView horizontal>
          {style.albums.map((album) => (
            <View key={album.id} style={styles.albumContainer}>
              <View>
                <TouchableWithoutFeedback onPress={() => navigateToImage(style.id, style.name, album.id)}>
                  <Image source={album.image} style={styles.imgalbum} />
                </TouchableWithoutFeedback>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.subtitulo}>{album.name}</Text>
              </View>
              <View>
                <Text style={styles.subtitulo}>{album.singer}</Text>
              </View>              
            </View>
          ))}
        </ScrollView>
      </View>
    ))}
  </ScrollView>
);
}



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Music UDB", headerStyle: {backgroundColor: '#255AE4'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 30, fontWeight: 'bold'}, }} />
        <Stack.Screen name="Image" component={ImageScreen} options={({ route }) => ({ title: route.params.albumType, headerStyle: {backgroundColor: '#255AE4'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 30, fontWeight: 'bold'}, })} />
        <Stack.Screen name="Repro" component={ReproScreen} options={({ route }) => ({ title: route.params.albumType, headerStyle: {backgroundColor: '#255AE4'}, headerTintColor: 'white', headerTitleStyle: {fontSize: 30, fontWeight: 'bold'}, })} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titulo:{
    fontWeight:'bold',
    fontSize:24,
    marginVertical:10
  },
  contenedor:{
    marginHorizontal:10,
  },
  imgalbum:{
    width:250,
    height:200,
    marginRight:10
  },
  subtitulo:{
    fontWeight:'bold',   
    fontSize:15,     
  },
  albumContainer: {
    alignItems: 'center', 
    marginHorizontal: 10,
  },  
});

export default App;
