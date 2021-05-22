import React from "react";
import { Stylesheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { Formik } from "formik";

const Form = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => children}
    </Formik>
  );
};

export default Form;
