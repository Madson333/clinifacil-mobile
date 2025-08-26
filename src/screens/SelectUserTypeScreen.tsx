import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../routes/AppRoutes';

const SelectUserTypeScreen: React.FC = () => {
  const [userType, setUserType] = useState<'paciente' | 'medico' | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de usuário</Text>
      <View style={styles.cardsWrapper}>
        {/* Card Paciente */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-outline" size={36} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Paciente</Text>
          <Text style={styles.cardSubtitle}>
            Agende consultas e gerencie sua saúde
          </Text>
          {/** Controle de habilitação do botão Paciente */}
          {(() => {
            const pacienteDisabled = false; // Troque para lógica real se necessário
            return (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonFilled,
                  { opacity: pacienteDisabled ? 0.5 : 1 }
                ]}
                onPress={() => {
                  setUserType('paciente');
                  navigation.navigate({
                    name: 'Register',
                    params: { email: '', senha: '', confirmSenha: '' }
                  });
                }}
                disabled={pacienteDisabled}
              >
                <Text style={styles.buttonText}>Continuar como Paciente</Text>
              </TouchableOpacity>
            );
          })()}
        </View>
        {/* Card Médico */}
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="medkit-outline" size={36} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Médico</Text>
          <Text style={styles.cardSubtitle}>
            Gerencie consultas e o cuidado dos pacientes
          </Text>
          {/** Controle de habilitação do botão Médico */}
          {(() => {
            const medicoDisabled = false; // Troque para lógica real se necessário
            return (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonOutlined,
                  { opacity: medicoDisabled ? 0.5 : 1 }
                ]}
                onPress={() => {
                  setUserType('medico');
                  navigation.navigate({
                    name: 'DoctorRegister',
                    params: { email: '', senha: '', especialidade: '' }
                  });
                }}
                disabled={medicoDisabled}
              >
                <Text style={[styles.buttonText, styles.buttonOutlinedText]}>
                  Continuar como Médico
                </Text>
              </TouchableOpacity>
            );
          })()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
    alignSelf: 'flex-start'
  },
  cardsWrapper: {
    width: '100%',
    maxWidth: 400
  },
  card: {
    backgroundColor: '#F7F8FA',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  iconCircle: {
    backgroundColor: '#4B5563',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center'
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 18,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonFilled: {
    backgroundColor: '#000',
    marginBottom: 0
  },
  buttonOutlined: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonOutlinedText: {
    color: '#000'
  }
});

export default SelectUserTypeScreen;
