### FILE: src/pages/Login.jsx
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" />
      <View style={styles.content}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default Login;