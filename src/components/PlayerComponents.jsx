### FILE: src/components/PlayerComponents.jsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

const WebViewPlayer = ({ sourceUrl, style }) => {
  const webviewRef = useRef(null);
  const injectedJS = `
    (function() {
      var iframes = document.getElementsByTagName('iframe');
      for (var i = 0; i < iframes.length; i++) {
        iframes[i].src = iframes[i].src.replace('ads', 'blocked');
      }
    })();
    true;
  `;
  return (
    <WebView
      ref={webviewRef}
      source={{ uri: sourceUrl }}
      injectedJavaScript={injectedJS}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      style={style}
    />
  );
};

const Controls = ({ onReload }) => (
  <ControlContainer>
    <TouchableOpacity onPress={onReload}>
      <ControlText>Reload</ControlText>
    </TouchableOpacity>
  </ControlContainer>
);

const TVControls = ({ onReload }) => (
  <TVControlContainer>
    <TouchableOpacity onPress={onReload}>
      <TVControlText>Reload</TVControlText>
    </TouchableOpacity>
  </TVControlContainer>
);

const ControlContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ControlText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin: 0 10px;
`;

const TVControlContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const TVControlText = styled.Text`
  color: #fff;
  font-size: 24px;
  margin: 0 20px;
`;

export { WebViewPlayer, Controls, TVControls };