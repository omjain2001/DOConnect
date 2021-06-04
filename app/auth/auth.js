import { auth } from "./firebase";

export const Register = (email, password) => {
  try {
    const userCredentials = auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    alert(error.message);
  }
};

export const Login = (email, password) => {
  try {
    const authenticateUser = auth.signInWithEmailAndPassword(email, password);
    if (authenticateUser) {
      return authenticateUser;
    }
  } catch (error) {
    const errorCode = error.code;
    console.log(error.code);
    if (errorCode === "auth/wrong-password") {
      alert("Wrong Password");
    } else {
      alert(error.message);
    }
  }
};
