import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header.jsx';
import axios from '../services/api.js';

const AddChannel = () => {
  const [name, setName] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !iframeUrl) {
      Alert.alert('Error', 'Name and iframe URL are required.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/channels', { name, iframe_url: iframeUrl, is_active: isActive });
      Alert.alert('Success', 'Channel added successfully.');
      setName('');
      setIframeUrl('');
      setIsActive(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add channel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Add Channel" />
      <View style={styles.form}>
        <Text style={styles.label}>Channel Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter channel name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Iframe URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter iframe URL"
          value={iframeUrl}
          onChangeText={setIframeUrl}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Active</Text>
          <Switch value={isActive} onValueChange={setIsActive} />
        </View>
        <Button title={loading ? 'Submitting...' : 'Add Channel'} onPress={handleSubmit} disabled={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 16,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default AddChannel;