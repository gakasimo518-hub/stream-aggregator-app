### FILE: src/components/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  width: 100%;
  height: 60px;
  background-color: #1e1e1e;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 15px;
  padding-top: 15px;
`;

const Title = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled.TouchableOpacity`
  padding: 5px;
`;

export default function Header({ title, onBack, showBack = false }) {
  return (
    <HeaderContainer>
      {showBack && (
        <BackButton onPress={onBack}>
          <Text style={{ color: '#ffffff', fontSize: 16 }}>← Back</Text>
        </BackButton>
      )}
      <Title>{title}</Title>
      <View style={{ width: 50 }} />
    </HeaderContainer>
  );
}