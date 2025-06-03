import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/Button';

export const ResultScreen = ({ route, navigation }: any) => {
  const { product1, product2 } = route.params;

  const calculateUnitPrice = (price: string, quantity: string) => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseFloat(quantity) || 1;
    return priceNum / quantityNum;
  };

  const unitPrice1 = calculateUnitPrice(product1.price, product1.quantity);
  const unitPrice2 = calculateUnitPrice(product2.price, product2.quantity);
  const difference = Math.abs(unitPrice1 - unitPrice2);
  const betterProduct = unitPrice1 < unitPrice2 ? product1 : product2;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultado da Comparação</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.resultCard}>
          <Text style={styles.productName}>{product1.name}</Text>
          <Text style={styles.price}>Preço unitário: R$ {unitPrice1.toFixed(2)}</Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.productName}>{product2.name}</Text>
          <Text style={styles.price}>Preço unitário: R$ {unitPrice2.toFixed(2)}</Text>
        </View>

        <View style={styles.conclusion}>
          <Text style={styles.conclusionTitle}>Conclusão</Text>
          <Text style={styles.conclusionText}>
            {betterProduct.name} é mais econômico!
          </Text>
          <Text style={styles.difference}>
            Diferença de R$ {difference.toFixed(2)} por unidade
          </Text>
        </View>

        <Button 
          title="Nova Comparação" 
          onPress={() => navigation.navigate('Comparison')} 
        />
        
        <Button 
          title="Voltar para Home" 
          onPress={() => navigation.navigate('Home')} 
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
  },
  content: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
  conclusion: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  conclusionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  conclusionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  difference: {
    fontSize: 16,
    color: '#666',
  },
}); 