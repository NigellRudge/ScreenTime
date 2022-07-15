import React from 'react';
import {Text,View,StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Theme from './utils/theme';
import Home from './ui/screens/Home';
import MovieDetailScreen from './ui/screens/MovieDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import BaseStack from './ui/stacks/BaseStack';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
          <BaseStack />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Theme.colors.backgroundColor,
  },
  text:{
    color:'black'
  }
});

export default App;
