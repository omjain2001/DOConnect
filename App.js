import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./store";
import AuthNav from "./app/navigations/AuthNav";

import DoctorRegistrationNav from "./app/navigations/DoctorRegistrationNav";
import Navigation from "./app/navigations/Navigation";
import PatientDashboard from "./app/screens/PatientDashboard";
import ViewHospitalDetails from './app/screens/ViewHospitalDetails'
import DoctorDashboard from "./app/screens/DoctorDashboard";
import BookAppointmentScreen from "./app/screens/BookAppointmentScreen";
import AppoinmentDetails from "./app/screens/profile/AppoinmentDetails";
import PatientNav from './app/navigations/PatientNav';
import ForgotPassword from './app/screens/ForgotPassword'
import ChangePassword from './app/screens/ChangePassword'
import DoctorNavigation from './app/navigations/DoctorNavigation'
import {CompletedAppointments,PendingAppointments} from './app/screens/AppointmentHistory'
import {AppoinmentNav} from './app/navigations/AppoinmnetsNav'

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />

    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Provider store={store}>
        {/* <PatientDashboard /> */}
        {/* <Navigation /> */}
        {/* <ViewHospitalDetails/> */}
        {/* <PatientNav/> */}
        {/* <DoctorDashboard/>  */}
        {/* <BookAppointmentScreen/> */}
        {/* <AppoinmentDetails/> */}
        {/* <ForgotPassword/> */}
        {/* <ChangePassword/> */}
        {/* <Navigation /> */}
        <DoctorNavigation  />
        {/* <PendingAppointments/> */}
        {/* <AppoinmentNav/> */}
      </Provider>
    </ApplicationProvider>
  </>
);
