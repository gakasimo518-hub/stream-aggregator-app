### FILE: src/App.jsx
import React, { useState, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddChannel from './pages/AddChannel';
import ChannelList from './pages/ChannelList';
import PlayerScreen from './pages/PlayerScreen';
import TVPlayerScreen from './pages/TVPlayerScreen';
import NotFound from './pages/NotFound';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

const Link = ({ to, children, style }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate(to)} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const Router = () => {
  const { currentRoute } = useNavigation();

  const renderScreen = () => {
    switch (currentRoute) {
      case '/':
        return <AdminDashboard />;
      case '/login':
        return <Login />;
      case '/add-channel':
        return <AddChannel />;
      case '/channel-list':
        return <ChannelList />;
      case '/player':
        return <PlayerScreen />;
      case '/tv-player':
        return <TVPlayerScreen />;
      default:
        return <NotFound />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('/');

  const navigate = (route) => {
    setCurrentRoute(route);
  };

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate }}>
      <Router />
    </NavigationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;