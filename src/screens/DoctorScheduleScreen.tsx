import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const DoctorScheduleScreen: React.FC = () => {
  const [date, setDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Horários de Atendimento</Text>
      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Hora de Início</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={startTime}
        onChangeText={setStartTime}
      />
      <Text style={styles.label}>Hora de Fim</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={endTime}
        onChangeText={setEndTime}
      />
      <Button
        title="Salvar Horário"
        onPress={() => {
          /* lógica de salvar */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222'
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#222',
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fafafa'
  }
});

export default DoctorScheduleScreen;
