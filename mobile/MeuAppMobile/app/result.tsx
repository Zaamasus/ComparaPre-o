import { View, Text, StyleSheet } from 'react-native';

export default function Result() {
  return (
    // Container principal da tela de resultado
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Tela de Resultado</Text>
      {/* Subtítulo */}
      <Text style={styles.subtitle}>Aqui será exibido o resultado da comparação.</Text>
    </View>
  );
}

// Estilos da tela de resultado
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