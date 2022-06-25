import React from 'react';
import {Text,View,StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Theme from './utils/theme';
import Home from './ui/screens/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
      <Home />
    </View>
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
