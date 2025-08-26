import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const especialidades = [
  'Cardiologia',
  'Dermatologia',
  'Pediatria',
  'Ortopedia',
  'Ginecologia',
  'Neurologia',
  'Clínico Geral'
];

export function DoctorRegisterScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      especialidade: ''
    }
  });

  // Corrigido: O botão só fica habilitado se todos os campos estiverem preenchidos e não houver erros
  const allFieldsFilled =
    watch('fullName') &&
    watch('email') &&
    watch('password') &&
    watch('confirmPassword') &&
    watch('especialidade');

  const noErrors =
    !errors.fullName &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.especialidade;

  const disabledForm = !(allFieldsFilled && noErrors);

  const onSubmit = (data: any) => {
    // lógica de cadastro do médico
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backArrow}>{'<'} </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.label}>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Full name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Enter your full name"
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {typeof errors.fullName?.message === 'string' && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {typeof errors.email?.message === 'string' && (
        <Text style={styles.error}>{errors.email.message}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'Min 6 characters' }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Create a password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {typeof errors.password?.message === 'string' && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Confirm your password',
          validate: (value) =>
            value === getValues('password') || 'Passwords do not match'
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {typeof errors.confirmPassword?.message === 'string' && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      <Text style={styles.label}>Especialidade</Text>
      <Controller
        control={control}
        name="especialidade"
        rules={{ required: 'Selecione a especialidade' }}
        render={({ field: { onChange, value } }) => (
          <View
            style={[
              styles.input,
              styles.pickerWrapper,
              errors.especialidade && styles.inputError
            ]}
          >
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item
                label="Selecione a especialidade:"
                value=""
                color="#bbb"
                enabled={false}
              />
              {especialidades.map((esp) => (
                <Picker.Item key={esp} label={esp} value={esp} color="#222" />
              ))}
            </Picker>
          </View>
        )}
      />
      {typeof errors.especialidade?.message === 'string' && (
        <Text style={styles.error}>{errors.especialidade.message}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, { opacity: disabledForm ? 0.5 : 1 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={disabledForm}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1
  },
  backArrow: {
    fontSize: 24,
    color: '#000'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 12
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 15,
    backgroundColor: '#fafafa'
  },
  inputError: {
    borderColor: '#e53935'
  },
  error: {
    color: '#e53935',
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 2
  },
  pickerWrapper: {
    padding: 0,
    justifyContent: 'center'
  },
  picker: {
    height: 50,
    width: '100%'
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500'
  }
});
