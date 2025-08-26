import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDoctors } from '../hooks/useDoctors';
import type { RootStackParamList } from '../routes/AppRoutes';

// ...médicos agora vêm do backend
const statusMap: Record<
  'upcoming' | 'completed',
  { label: string; color: string }
> = {
  upcoming: { label: 'Próxima', color: '#000' },
  completed: { label: 'Concluída', color: '#6B7280' }
};

const DoctorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Doctors'>>();
  // O correto é filtrar por specialtyId
  const specialtyIdParam = route.params?.specialtyId;
  const specialtyId = specialtyIdParam ? Number(specialtyIdParam) : undefined;
  const { data: doctors, isPending, error } = useDoctors({ specialtyId });

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
        <Text style={styles.title}>Médicos</Text>
      </View>
      {isPending ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Carregando médicos...
        </Text>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>
          Erro ao carregar médicos
        </Text>
      ) : (
        <FlatList
          data={doctors?.data || []}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            console.log('Doctor item:', item); // Debug para ver campos reais
            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.85}
                onPress={() =>
                  (navigation as any).navigate('ScheduleAppointment', {
                    doctorId: item.id
                  })
                }
              >
                <View style={styles.cardBody}>
                  <View style={styles.avatarCircle}>
                    <Ionicons name="person" size={36} color="#222" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.doctorName}>{item.id}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  listContent: {
    paddingBottom: 24
  },
  card: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  statusBox: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  },
  dateText: {
    color: '#222',
    fontSize: 14,
    fontWeight: '500'
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatarCircle: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
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
  timeText: {
    fontSize: 15,
    color: '#222'
  }
});

export default DoctorsScreen;
