import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Logo */}
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Foto de Perfil */}
          <Image
            source={require('./assets/perfil.png')}
            style={styles.profileImage}
          />

          {/* Nome */}
          <Text style={styles.name}>Samuel Gomes</Text>

          {/* Cargo */}
          <Text style={styles.role}>Desenvolvedor Mobile</Text>

          {/* Copyright e Slogan */}
          <View style={styles.footer}>
            <Text style={styles.copyright}>© 2024 Todos os direitos reservados</Text>
            <Text style={styles.slogan}>Transformando ideias em realidade</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 20,
  },
  copyright: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  slogan: {
    fontSize: 14,
    color: '#666',
  },
}); 