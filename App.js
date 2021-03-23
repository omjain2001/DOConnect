import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./store";
import AuthNav from "./app/navigations/AuthNav";
import PersonalDetailsScreen from "./app/screens/profile/PersonalDetailsScreen";
import HospitalDetailsScreen from "./app/screens/profile/HospitalDetailsScreen";
import CompleteProfileNavigator from "./app/navigations/CompleteProfileNavigator";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />

    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <Provider store={store}>
        <NavigationContainer>
          {/* <AuthNav/> */}
          <CompleteProfileNavigator />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  </>
);
