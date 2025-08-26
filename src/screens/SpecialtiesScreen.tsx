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
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../routes/AppRoutes';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useSpecialties } from '../hooks/useSpecialties';

const SpecialtiesScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isPending, error } = useSpecialties();

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
          Carregando especialidades...
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>
          Erro ao carregar especialidades
        </Text>
      </View>
    );
  }
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
        <Text style={styles.title}>Especialidades Médicas</Text>
      </View>
      <FlatList
        data={data?.data || []}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('Doctors', { specialtyId: String(item.id) })
            }
          >
            <View style={styles.iconCircle}>
              <Ionicons name={'medkit'} size={32} color="#fff" />
            </View>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 24,
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: 170,
    height: 120,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2
  },
  iconCircle: {
    backgroundColor: '#4B5563',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  cardText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 2
  }
});

export default SpecialtiesScreen;
