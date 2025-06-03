import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button } from '../components/Button';

export const ComparisonScreen = ({ navigation }: any) => {
  const [product1, setProduct1] = useState({ name: '', price: '', quantity: '' });
  const [product2, setProduct2] = useState({ name: '', price: '', quantity: '' });

  const handleCalculate = () => {
    // Lógica de cálculo será implementada aqui
    navigation.navigate('Result', { product1, product2 });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nova Comparação</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.productContainer}>
          <Text style={styles.label}>Produto 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={product1.name}
            onChangeText={(text) => setProduct1({ ...product1, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            value={product1.price}
            onChangeText={(text) => setProduct1({ ...product1, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={product1.quantity}
            onChangeText={(text) => setProduct1({ ...product1, quantity: text })}
          />
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.label}>Produto 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            value={product2.name}
            onChangeText={(text) => setProduct2({ ...product2, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            value={product2.price}
            onChangeText={(text) => setProduct2({ ...product2, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={product2.quantity}
            onChangeText={(text) => setProduct2({ ...product2, quantity: text })}
          />
        </View>

        <Button title="Calcular" onPress={handleCalculate} />
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
  },
  content: {
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
}); 