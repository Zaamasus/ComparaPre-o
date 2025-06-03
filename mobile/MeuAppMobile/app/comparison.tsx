import { View, Text, StyleSheet } from 'react-native';

export default function Comparison() {
  return (
    // Container principal da tela de comparação
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Tela de Comparação</Text>
      {/* Subtítulo */}
      <Text style={styles.subtitle}>Aqui você poderá comparar produtos.</Text>
    </View>
  );
}

// Estilos da tela de comparação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
}); 