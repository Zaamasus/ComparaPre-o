import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/Button';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculadora de Compras</Text>
        <Text style={styles.subtitle}>Compare preços e economize!</Text>
      </View>

      <View style={styles.content}>
        <Button 
          title="Nova Comparação" 
          onPress={() => navigation.navigate('Comparison')} 
        />
        
        <Button 
          title="Comparações Salvas" 
          onPress={() => navigation.navigate('SavedComparisons')} 
        />

        <Button 
          title="Como Funciona" 
          onPress={() => navigation.navigate('HowItWorks')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
}); 