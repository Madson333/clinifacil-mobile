import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../routes/AppRoutes';

type IoniconName =
  | 'medkit-outline'
  | 'calendar-outline'
  | 'time-outline'
  | 'person-outline';

const menuItems: {
  label: string;
  icon: IoniconName;
  route: keyof RootStackParamList;
}[] = [
  {
    label: 'Especialidades',
    icon: 'medkit-outline',
    route: 'Specialties'
  },
  {
    label: 'Minhas Consultas',
    icon: 'calendar-outline',
    route: 'Consultations'
  },
  {
    label: 'Cadastrar Horários de Atendimento',
    icon: 'time-outline',
    route: 'DoctorSchedule'
  },
  {
    label: 'Perfil Médico',
    icon: 'person-outline',
    route: 'DoctorProfile'
  }
];

const DashboardScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Simulação do tipo de usuário (troque por contexto/autenticação real)
  const [userType] = useState<'paciente' | 'medico'>('paciente');
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}
            onPress={() => navigation.navigate(item.route as never)}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={28} color="#fff" />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    maxWidth: 400
  },
  card: {
    backgroundColor: '#F7F8FA',
    borderRadius: 16,
    width: 160,
    height: 140,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  iconCircle: {
    backgroundColor: '#4B5563',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  label: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center'
  }
});

export default DashboardScreen;
