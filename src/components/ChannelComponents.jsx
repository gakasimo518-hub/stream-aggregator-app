### FILE: src/components/ChannelComponents.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../services/api.js';
import Header from './Header.jsx';

const ChannelCard = ({ channel, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(channel)}>
    <Text style={styles.title}>{channel.name}</Text>
    <View style={styles.previewContainer}>
      <WebView
        source={{ html: `<iframe src="${channel.iframe_url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>` }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        injectedJavaScript={`document.querySelector('iframe').addEventListener('load', function() { window.ReactNativeWebView.postMessage('loaded'); });`}
        onMessage={() => {}}
      />
    </View>
  </TouchableOpacity>
);

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChannels = async () => {
    try {
      const response = await api.get('/channels');
      setChannels(response.data);
      setFiltered(response.data);
    } catch (err) {
      setError('Errore nel recupero dei canali');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(channels.filter(c => c.name.toLowerCase().includes(lower)));
  }, [search, channels]);

  const handlePress = channel => {
    navigation.navigate('PlayerScreen', { channelId: channel.id });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Canali" />
      <TextInput
        style={styles.search}
        placeholder="Cerca canale..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ChannelCard channel={item} onPress={handlePress} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
  search: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  list: { paddingBottom: 20 },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', padding: 10 },
  previewContainer: { height: 200, width: '100%' },
  webview: { flex: 1 },
});

export { ChannelCard, ChannelList };