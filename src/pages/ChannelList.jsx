### FILE: src/pages/ChannelList.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { ChannelCard, SearchBar } from '../components/ChannelComponents';
import api from '../services/api';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchChannels = async () => {
    try {
      const response = await api.get('/channels');
      setChannels(response.data);
      setFilteredChannels(response.data);
    } catch (err) {
      setError('Errore nel recupero dei canali.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredChannels(channels);
    } else {
      const lower = searchQuery.toLowerCase();
      const filtered = channels.filter((c) =>
        c.name.toLowerCase().includes(lower)
      );
      setFilteredChannels(filtered);
    }
  }, [searchQuery, channels]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Lista Canali" />
      <SearchBar value={searchQuery} onChangeText={handleSearch} placeholder="Cerca canale..." />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))
        ) : (
          <Text style={styles.noResultsText}>Nessun canale trovato.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});

export default ChannelList;