### FILE: src/pages/TVPlayerScreen.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { WebViewPlayer, TVControls } from '../components/PlayerComponents';

const TVPlayerScreen = () => {
  const channelUrl = 'https://dlive.sx/stream/12345';

  return (
    <View style={styles.container}>
      <Header title="TV Player" />
      <View style={styles.playerContainer}>
        <WebViewPlayer source={{ uri: channelUrl }} style={styles.webview} />
        <TVControls />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  playerContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default TVPlayerScreen;