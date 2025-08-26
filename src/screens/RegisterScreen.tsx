import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Parâmetros vindos da tela anterior
  const {
    email = '',
    senha = '',
    confirmSenha = ''
  } = (route.params || {}) as {
    email?: string;
    senha?: string;
    confirmSenha?: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: FormData) => {
    // lógica de cadastro do paciente
  };
  const name = watch('fullName');
  const allFilled =
    watch('fullName') &&
    watch('email') &&
    watch('password') &&
    watch('confirmPassword');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: 'Nome obrigatório' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.error}>{errors.fullName.message}</Text>
        )}

        <Text style={styles.label}>E-mail</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'E-mail obrigatório',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: 'E-mail inválido'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Text style={styles.label}>Senha</Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Senha obrigatória',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Crie uma senha"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <Text style={styles.label}>Confirmar Senha</Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirme a senha',
            validate: (value) =>
              value === watch('password') || 'Senhas não coincidem'
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha"
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, { opacity: allFilled ? 1 : 0.5 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={!allFilled}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
    alignSelf: 'center' // alterado para centralizar
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center', // garantir centralização
    zIndex: 1 // garantir que os inputs fiquem acima
  },
  label: {
    fontSize: 15,
    color: '#111827',
    marginBottom: 6,
    fontWeight: '500'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
    fontSize: 16,
    zIndex: 2 // garantir que o input fique acima
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 2
  },
  button: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  backText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center'
  }
});

export default RegisterScreen;
