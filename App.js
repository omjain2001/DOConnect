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
import BookAppointmentScreen from "./app/screens/BookAppointmentScreen";
import { CustomSpinner } from "./app/screens/CustomSpinner";
import { PatientNav } from "./app/navigations/PatientNav";
import QualificationScreen from "./app/screens/profile/QualificationScreen";
import RegisterScreen from "./app/screens/RegisterScreen";

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />

    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ApplicationProvider>
  </>
);
