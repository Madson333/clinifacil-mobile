import React = require('react');
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import SpecialtiesScreen from '../screens/SpecialtiesScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import { DoctorProfileScreen } from '../screens/DoctorProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ConsultationsScreen from '../screens/ConsultationsScreen';
import { DoctorRegisterScreen } from '../screens/DoctorRegisterScreen';
import SelectUserTypeScreen from '../screens/SelectUserTypeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type RootStackParamList = {
  Login: undefined;
  SelectUserType: undefined;
  Register: { email: string; senha: string; confirmSenha: string };
  Dashboard: undefined;
  Specialties: undefined;
  Doctors: { specialtyId: string };
  DoctorProfile: { doctorId?: string };
  Schedule: { doctorId?: string }; // Existing Schedule route
  ScheduleAppointment: { doctorId: string }; // New ScheduleAppointment route
  Consultations: undefined;
  DoctorRegister: { email: string; senha: string; especialidade: string };
  DoctorSchedule: undefined;
  RateDoctor: { appointmentId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SelectUserType" component={SelectUserTypeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
        <Stack.Screen
          name="Doctors"
          component={DoctorsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen
          name="ScheduleAppointment"
          component={require('../screens/ScheduleAppointmentScreen').default}
        />
        <Stack.Screen name="Consultations" component={ConsultationsScreen} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegisterScreen} />
        <Stack.Screen
          name="DoctorSchedule"
          component={require('../screens/DoctorScheduleScreen').default}
        />
        <Stack.Screen
          name="RateDoctor"
          component={require('../screens/RateDoctorScreen').default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
