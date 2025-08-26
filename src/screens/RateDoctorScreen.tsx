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
import { useAddRating } from '../hooks/useAppointments';

const RateDoctorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'RateDoctor'>>();
  const appointmentId = route.params?.appointmentId;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { mutate, isPending } = useAddRating();

  const handleConfirm = () => {
    if (!appointmentId || rating === 0) return;
    mutate(
      {
        appointmentId,
        data: { rating, comment }
      },
      {
        onSuccess: () => {
          navigation.navigate('Dashboard');
        },
        onError: (error: any) => {
          alert(
            'Erro ao enviar avaliação: ' +
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
        <Text style={styles.title}>Avaliar Médico</Text>
      </View>
      <Text style={styles.sectionTitle}>Nota</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Comentário (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Deixe um comentário..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity
        style={[styles.confirmButton, isPending && { opacity: 0.6 }]}
        onPress={handleConfirm}
        disabled={isPending}
      >
        <Text style={styles.confirmButtonText}>
          {isPending ? 'Enviando...' : 'Enviar Avaliação'}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 6
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 12
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

export default RateDoctorScreen;
