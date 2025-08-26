import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Avatar com Ionicons */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </View>
      </View>
      <Text style={styles.title}>MedConnect</Text>
      <Text style={styles.subtitle}>Conecte-se com profissionais de saúde</Text>
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#9CA3AF"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard' as never)}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Não tem uma conta?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('SelectUserType' as never)}
        >
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24
  },
  avatarWrapper: {
    marginBottom: 24
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4
  },
  subtitle: {
    color: '#6B7280',
    marginBottom: 24,
    fontSize: 16,
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    alignSelf: 'flex-start',
    marginBottom: 4,
    width: '100%'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    fontSize: 16
  },
  button: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  signupText: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 0
  },
  signupLink: {
    color: '#2563EB',
    fontWeight: '600'
  }
});
