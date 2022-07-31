import React from 'react';
import {Text,View,StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Theme from './utils/theme';
import Home from './ui/screens/Home';
import MovieDetailScreen from './ui/screens/MovieDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import BaseStack from './ui/stacks/BaseStack';

// TODO: Add Splash Screen
// TODO: Add app icon
// TODO: Add Network connectivity check
// TODO: Add local cache or storage
// TODO: Add custom loading animation
// TODO: Add Error state
// TODO: Impleted Generic where possible
// TODO: Create  Custom Hooks
// TODO: Add navbar animations`
// TODO: Implement code for Multiple promises that are called in succession

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
