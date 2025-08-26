import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { RootStackParamList } from '../routes/AppRoutes';
import { useAddSchedule, useDoctor } from '../hooks/useDoctors';

const availableDates = ['15', '16', '17', '18', '19', '20', '21'];
const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'];

// Removido mock, agora busca do backend

const ScheduleAppointmentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'ScheduleAppointment'>>();
  const doctorId = route.params?.doctorId;

  const { data: doctor, isPending: loadingDoctor } = useDoctor(
    Number(doctorId)
  );

  const [selectedDate, setSelectedDate] = useState('16');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [reason, setReason] = useState('');

  const { mutate, isPending } = useAddSchedule();

  const handleConfirm = () => {
    if (!doctorId) return;
    mutate(
      {
        doctorId: Number(doctorId),
        data: {
          date: selectedDate,
          time: selectedTime,
          reason
        }
      },
      {
        onSuccess: () => {
          navigation.navigate('Dashboard');
        },
        onError: (error: any) => {
          alert(
            'Erro ao agendar consulta: ' +
              (error?.message || 'Tente novamente.')
          );
        }
      }
    );
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
        <Text style={styles.title}>Agendar Consulta</Text>
      </View>
      <View style={styles.doctorCard}>
        {loadingDoctor ? (
          <Text style={{ textAlign: 'center' }}>Carregando médico...</Text>
        ) : doctor && doctor.doctor ? (
          <>
            <Ionicons
              name={'person'}
              size={40}
              color="#222"
              style={styles.avatar}
            />
            <View>
              <Text style={styles.doctorName}>
                {doctor.doctor.name || doctor.doctor.id}
              </Text>
              <Text style={styles.specialty}>
                {doctor.doctor.specialty || ''}
              </Text>
            </View>
          </>
        ) : (
          <Text style={{ textAlign: 'center', color: 'red' }}>
            Médico não encontrado
          </Text>
        )}
      </View>
      <Text style={styles.sectionTitle}>Selecione a Data</Text>
      <View style={styles.dateRow}>
        {availableDates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateButton,
              selectedDate === date && styles.dateButtonSelected
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.dateTextSelected
              ]}
            >
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
      <View style={styles.timeRow}>
        {availableTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.timeButtonSelected
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.timeTextSelected
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Motivo da Consulta</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva seus sintomas ou motivo da consulta..."
        value={reason}
        onChangeText={setReason}
        multiline
      />
      <TouchableOpacity
        style={[styles.confirmButton, isPending && { opacity: 0.6 }]}
        onPress={handleConfirm}
        disabled={isPending}
      >
        <Text style={styles.confirmButtonText}>
          {isPending ? 'Agendando...' : 'Confirmar Agendamento'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18
  },
  avatar: {
    marginRight: 14
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2
  },
  specialty: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 2
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 6
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  dateButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  dateButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000'
  },
  dateText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16
  },
  dateTextSelected: {
    color: '#fff'
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12
  },
  timeButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
    marginBottom: 8
  },
  timeButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000'
  },
  timeText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16
  },
  timeTextSelected: {
    color: '#fff'
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 60
  },
  confirmButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default ScheduleAppointmentScreen;
