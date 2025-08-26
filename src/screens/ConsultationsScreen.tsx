import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useConsultations } from '../hooks/useConsultations';

type StatusType = 'Futura' | 'Passada';
type IconNameType = 'woman' | 'man';

interface Consultation {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  time: string;
  status: StatusType;
  icon: IconNameType;
}

// Consultas agora vêm do backend

const statusMap: Record<StatusType, { label: string; color: string }> = {
  Futura: { label: 'Próxima', color: '#000' },
  Passada: { label: 'Concluída', color: '#6B7280' }
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

const ConsultationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { data: consultations, isPending, error } = useConsultations();

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
        <Text style={styles.title}>Minhas Consultas</Text>
      </View>
      {isPending ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Carregando consultas...
        </Text>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>
          Erro ao carregar consultas
        </Text>
      ) : (
        <FlatList
          data={consultations?.data || []}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.statusBox}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Text style={styles.dateText}>{item.data}</Text>
              </View>
              <View style={styles.cardInfoRow}>
                <Ionicons
                  name="person"
                  size={40}
                  color="#222"
                  style={styles.avatar}
                />
                <View style={styles.infoCol}>
                  <Text style={styles.doctorName}>
                    {typeof item.medico === 'object' && item.medico !== null
                      ? item.medico.nome
                      : item.medico || ''}
                  </Text>
                  <Text style={styles.specialty}>
                    {typeof item.especialidade === 'object' &&
                    item.especialidade !== null
                      ? item.especialidade.nome
                      : item.especialidade || ''}
                  </Text>
                  <Text style={styles.time}>{item.horario || ''}</Text>
                </View>
              </View>
            </View>
          )}
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
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 8
  },
  dateText: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500'
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  avatar: {
    marginRight: 14
  },
  infoCol: {
    flex: 1
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
  time: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500'
  }
});

export default ConsultationsScreen;
