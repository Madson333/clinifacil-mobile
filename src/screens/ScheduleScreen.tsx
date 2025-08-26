import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ScheduleScreen: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>
      <Text style={styles.label}>Escolha a data:</Text>
      <TextInput
        style={styles.input}
        placeholder={'AAAA-MM-DD'}
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Escolha a hora:</Text>
      <TextInput
        style={styles.input}
        placeholder={'HH:MM'}
        value={time}
        onChangeText={setTime}
      />
      <Button
        title="Confirmar"
        onPress={() => {
          // lógica de agendamento futura
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
    alignSelf: 'flex-start',
    width: '100%'
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    fontSize: 16
  }
});

export default ScheduleScreen;
