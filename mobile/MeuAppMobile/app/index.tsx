import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header fixo no topo */}
      <Header />
      {/* Conteúdo com rolagem */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Área de texto à esquerda */}
        <View style={styles.leftArea}>
          <Text style={styles.title}>Compare preços e economize nas suas compras</Text>
          <Text style={styles.subtitle}>
            Descubra qual produto oferece o melhor custo-benefício comparando preços por unidade de peso ou volume.
          </Text>
          {/* Botões um embaixo do outro */}
          <View style={styles.buttonColumn}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push('/comparison')}>
              <Text style={styles.buttonPrimaryText}>Começar a Comparar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push('/result')}>
              <Text style={styles.buttonSecondaryText}>Lista de Compras</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Card de exemplo rápido mais elegante */}
        <View style={styles.exampleCardWrapper}>
          <View style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>Exemplo Rápido:</Text>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Detergente 500ml:</Text>
              <Text style={styles.exampleValue}>R$ 7,90</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Preço por ml:</Text>
              <Text style={styles.exampleValue}>R$ 0,0158</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Detergente 900ml:</Text>
              <Text style={styles.exampleValue}>R$ 12,90</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>Preço por ml:</Text>
              <Text style={styles.exampleValue}>R$ 0,0143</Text>
            </View>
            <View style={styles.savingBox}>
              <Text style={styles.savingText}>Economia de 9,5% no detergente maior!</Text>
            </View>
          </View>
        </View>
        {/* Seção Como Funciona */}
        <View style={styles.howItWorksSection}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={40} color="#1e3a8a" style={{ marginBottom: 10 }} />
          <Text style={styles.howItWorksTitle}>Como Funciona</Text>
          <View style={styles.howItWorksSteps}>
            <View style={styles.howItWorksStep}>
              <MaterialCommunityIcons name="scale-balance" size={28} color="#1e3a8a" style={{ marginRight: 10 }} />
              <Text style={styles.howItWorksStepText}>Compare preços por unidade (g/kg ou ml/l) e descubra qual produto oferece o melhor valor.</Text>
            </View>
            <View style={styles.howItWorksStep}>
              <MaterialCommunityIcons name="calculator-variant-outline" size={28} color="#1e3a8a" style={{ marginRight: 10 }} />
              <Text style={styles.howItWorksStepText}>Use nossa calculadora para organizar sua lista, somar valores e acompanhar o total em tempo real.</Text>
            </View>
            <View style={styles.howItWorksStep}>
              <MaterialCommunityIcons name="cart-outline" size={28} color="#1e3a8a" style={{ marginRight: 10 }} />
              <Text style={styles.howItWorksStepText}>Adicione itens rapidamente à sua lista ou faça comparações detalhadas.</Text>
            </View>
            <View style={styles.howItWorksStep}>
              <MaterialCommunityIcons name="share-variant" size={28} color="#1e3a8a" style={{ marginRight: 10 }} />
              <Text style={styles.howItWorksStepText}>Compartilhe suas comparações e listas de compras no WhatsApp.</Text>
            </View>
          </View>
          <Text style={styles.howItWorksBottomText}>
            Nossa plataforma foi feita para ser simples, rápida e ajudar você a economizar de verdade!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos da tela inicial
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    padding: 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 0,
  },
  leftArea: {
    width: '100%',
    marginBottom: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ef',
    marginBottom: 28,
    textAlign: 'center',
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 8,
    width: 240,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#1e3a8a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: 240,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exampleCardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  exampleCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e7ef',
  },
  exampleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 14,
    color: '#1e3a8a',
  },
  exampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exampleLabel: {
    fontSize: 16,
    color: '#222',
  },
  exampleValue: {
    fontSize: 16,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e7ef',
    marginVertical: 6,
    width: '100%',
  },
  savingBox: {
    backgroundColor: '#d1fae5',
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
  },
  savingText: {
    color: '#15803d',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  howItWorksSection: {
    width: '100%',
    backgroundColor: 'linear-gradient(180deg, #f1f5fa 80%, #e0e7ef 100%)',
    borderRadius: 20,
    padding: 28,
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  howItWorksTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  howItWorksSteps: {
    width: '100%',
    marginBottom: 18,
  },
  howItWorksStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  howItWorksStepText: {
    fontSize: 16,
    color: '#222',
    flex: 1,
  },
  howItWorksBottomText: {
    fontSize: 15,
    color: '#1e3a8a',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
}); 