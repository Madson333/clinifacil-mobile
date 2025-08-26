import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { RootStackParamList } from '../routes/AppRoutes';

const doctorsMock = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologista',
    rating: 4.8,
    reviews: 127,
    about:
      'Cardiologista experiente com mais de 10 anos de prática. Especialista em cardiologia preventiva e manejo de doenças cardíacas.',
    availableTimes: [
      { label: 'Hoje, 15 Jan', time: '14:00 - 16:00' },
      { label: 'Amanhã, 16 Jan', time: '10:00 - 12:00' }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Clínico Geral',
    rating: 4.6,
    reviews: 98,
    about:
      'Especialista em clínica geral, atendimento humanizado e acompanhamento de pacientes crônicos.',
    availableTimes: [
      { label: 'Hoje, 15 Jan', time: '15:00 - 17:00' },
      { label: 'Amanhã, 16 Jan', time: '09:00 - 11:00' }
    ]
  }
];

export function DoctorProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'DoctorProfile'>>();
  const doctorId = route.params?.doctorId;
  const doctor = doctorsMock.find((d) => d.id === doctorId) || doctorsMock[0];

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: doctor.name,
    specialty: doctor.specialty,
    about: doctor.about,
    availableTimes: doctor.availableTimes.map((t) => ({ ...t }))
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (idx: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      availableTimes: prev.availableTimes.map((t, i) =>
        i === idx ? { ...t, time: value } : t
      )
    }));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerRow,
          { marginTop: 16 + (Platform.OS === 'android' ? 24 : 44) }
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil do Médico</Text>
      </View>
      <View style={styles.avatarCircle}>
        <Ionicons name="person" size={64} color="#fff" />
      </View>
      {editing ? (
        <View>
          <Text style={styles.label}>Nome</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={(v) => handleChange('name', v)}
              placeholder="Nome do médico"
              placeholderTextColor="#A1A1AA"
            />
          </View>
          <Text style={styles.label}>Especialidade</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={form.specialty}
              onChangeText={(v) => handleChange('specialty', v)}
              placeholder="Especialidade"
              placeholderTextColor="#A1A1AA"
            />
          </View>
          <Text style={styles.label}>Sobre</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={form.about}
              onChangeText={(v) => handleChange('about', v)}
              placeholder="Sobre o médico"
              placeholderTextColor="#A1A1AA"
              multiline
            />
          </View>
          <Text style={styles.label}>Horários Disponíveis</Text>
          <View>
            {form.availableTimes.map((t, idx) => (
              <View key={idx} style={styles.timeEditRow}>
                <Text style={styles.timeLabel}>{t.label}</Text>
                <TextInput
                  style={styles.input}
                  value={t.time}
                  onChangeText={(v) => handleTimeChange(idx, v)}
                  placeholder="Horário"
                  placeholderTextColor="#A1A1AA"
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditing(false)}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.doctorName}>{form.name}</Text>
          <Text style={styles.specialty}>{form.specialty}</Text>
          <View style={styles.ratingRow}>
            <Ionicons
              name="star"
              size={18}
              color="#111"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.ratingText}>
              {doctor.rating} ({doctor.reviews} avaliações)
            </Text>
          </View>
          <View style={styles.cardBox}>
            <Text style={styles.cardTitle}>Sobre</Text>
            <Text style={styles.cardContent}>{form.about}</Text>
          </View>
          <View style={styles.cardBox}>
            <Text style={styles.cardTitle}>Horários Disponíveis</Text>
            <View>
              {form.availableTimes.map((t, idx) => (
                <View key={idx} style={styles.timeRow}>
                  <Text style={styles.timeLabel}>{t.label}</Text>
                  <Text style={styles.timeValue}>{t.time}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8
  },
  backButton: {
    marginRight: 8,
    padding: 4
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222'
  },
  avatarCircle: {
    backgroundColor: '#4B5563',
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 2
  },
  specialty: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  ratingText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500'
  },
  cardBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6
  },
  cardContent: {
    fontSize: 15,
    color: '#222',
    lineHeight: 22
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  timeLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500'
  },
  timeValue: {
    fontSize: 15,
    color: '#222'
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500'
  },
  label: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10
  },
  inputBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  input: {
    fontSize: 15,
    color: '#222',
    paddingVertical: 8,
    backgroundColor: 'transparent'
  },
  timeEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  }
});
