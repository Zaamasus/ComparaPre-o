import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 400;
  const [menuVisible, setMenuVisible] = useState(false);

  // Função para navegar e fechar o menu
  const handleNavigate = (route: string) => {
    setMenuVisible(false);
    router.push(route);
  };

  return (
    // Header fixo no topo
    <View style={[styles.header, isSmall && styles.headerSmall]}>
      {/* Logo e nome do app */}
      <View style={styles.logoArea}>
        <MaterialCommunityIcons name="scale-balance" size={28} color="#fff" style={{ marginRight: 8 }} />
        <View>
          <Text style={styles.logoText}>ComparaPreço</Text>
          <Text style={styles.creatorText}>por Samuel Gomes</Text>
        </View>
      </View>
      {/* Navegação */}
      {isSmall ? (
        // Ícone do menu hambúrguer
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <MaterialCommunityIcons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.navArea}>
          <TouchableOpacity onPress={() => router.push('/comparison')}>
            <Text style={styles.navText}>Comparar Preços</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/result')}>
            <Text style={styles.navText}>Lista de Compras</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.navText}>Como Funciona</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Modal do menu hambúrguer */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.menuOverlay} onPress={() => setMenuVisible(false)} activeOpacity={1}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={() => handleNavigate('/comparison')} style={styles.menuItem}>
              <Text style={styles.menuText}>Comparar Preços</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('/result')} style={styles.menuItem}>
              <Text style={styles.menuText}>Lista de Compras</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.menuItem}>
              <Text style={styles.menuText}>Como Funciona</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// Estilos do header
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 4,
  },
  headerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1,
  },
  creatorText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  navArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 24,
    marginBottom: 0,
  },
  menuButton: {
    padding: 8,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  menuContent: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: 'flex-start',
  },
  menuItem: {
    paddingVertical: 12,
    width: '100%',
  },
  menuText: {
    fontSize: 18,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
}); 