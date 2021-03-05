import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import AuthNav from "./app/navigations/AuthNav";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthNav />
    </ApplicationProvider>
  </>
);
