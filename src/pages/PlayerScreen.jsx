### FILE: src/pages/PlayerScreen.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header.jsx';
import { WebViewPlayer, Controls } from '../components/PlayerComponents.jsx';

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const PlayerWrapper = styled.View`
  flex: 1;
`;

const PlayerScreen = () => {
  const channelUrl = 'https://dlive.sx/stream/12345'; // Replace with dynamic URL as needed

  return (
    <Container>
      <Header title="Player" />
      <PlayerWrapper>
        <WebViewPlayer source={{ uri: channelUrl }} />
        <Controls />
      </PlayerWrapper>
    </Container>
  );
};

export default PlayerScreen;