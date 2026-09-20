### FILE: src/pages/AdminDashboard.jsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import { ChannelTable, AddChannelButton, DnsCheck } from '../components/ChannelComponents';

const AdminDashboard = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Admin Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <AddChannelButton />
        </View>
        <View style={styles.section}>
          <ChannelTable />
        </View>
        <View style={styles.section}>
          <DnsCheck />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
});

export default AdminDashboard;