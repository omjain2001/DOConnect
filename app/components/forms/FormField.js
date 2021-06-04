import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Input } from "@ui-kitten/components";
import { useFormikContext } from "formik";
import ErrorMsg from "../ErrorMsg";

const FormField = ({ label, placeholder, name, style, ...otherProps }) => {
  const { setFieldValue, errors, values, touched, setFieldTouched } =
    useFormikContext();

  return (
    <Layout style={[styles.container, style]}>
      <Input
        label={label}
        name={name}
        value={values[name]}
        placeholder={placeholder}
        onChangeText={(value) => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      {errors[name] && (
        <ErrorMsg visible={touched[name]}>{errors[name]}</ErrorMsg>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 60,
    // width: 100,
    width: "100%",
    paddingHorizontal: 5,
    marginVertical: 10,
  },
});

export default FormField;
