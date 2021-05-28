import { Button } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";

const SubmitForm = ({ label, btnStyle, onPress }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      style={[styles.btn, btnStyle]}
      onPress={() => (onPress ? onPress() : handleSubmit())}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginVertical: 15,
  },
});

export default SubmitForm;
