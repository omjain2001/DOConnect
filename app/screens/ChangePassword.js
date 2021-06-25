import {Icon, Layout } from '@ui-kitten/components'
import React,{useState} from 'react'
import * as Yup from "yup";
import Form from "../components/forms/Form";
import {TouchableOpacity,ScrollView } from "react-native";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";

import Lock from './Icons/Lock'


const ChangePassword = () => {
    const [showOldPassword, toggleOldPassword] = useState(false);
    const [showNewPassword, toggleNewPassword] = useState(false);
    const [showConfirmPassword, toggleConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string(),
        newPassword: Yup.string(),
        confirmpassword: Yup.string()
      });

    const renderIcon = (show, toggle, { ...props }) => (
    <TouchableOpacity onPress={() => toggle(!show)}>
        <Icon {...props} name={show ? "eye" : "eye-off"} />
    </TouchableOpacity>
    );  

    const handleSubmit = (values) => {
        console.log("Values",values);
      };
    return (
        <ScrollView>
        <Layout>
            <Layout style={{
                justifyContent:"center",
                alignItems:"center",
                marginTop:"50%"
            }}>
                <Lock/>
            </Layout>
            <Layout style={{
                padding: "5%"
            }}>
                <Form
                    initialValues={{
                    email: "",
                    }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
                >
                <FormField
                    label="Old Password"
                    name="oldPassword"
                    secureTextEntry={!showOldPassword}
                    accessoryRight={(props) =>
                    renderIcon(showOldPassword, toggleOldPassword, props)
                    }
                    placeholder="Enter old password"
                />
                <FormField
                    label="New Password"
                    name="newPassword"
                    secureTextEntry={!showNewPassword}
                    accessoryRight={(props) =>
                        renderIcon(showNewPassword, toggleNewPassword, props)
                    }
                    placeholder="Enter new password"
                />
                <FormField
                    label="Confirm Password"
                    name="confirmpassword"
                    placeholder="Enter confirm password"
                    secureTextEntry={!showConfirmPassword}
                    accessoryRight={(props) =>
                        renderIcon(showConfirmPassword, toggleConfirmPassword, props)
                    }
                />

            <    SubmitForm label="Submit" />
                </Form>
            </Layout>
            
        </Layout>
        </ScrollView>
    )
}

export default ChangePassword