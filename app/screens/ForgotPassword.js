import { Layout } from '@ui-kitten/components'
import React from 'react'
import * as Yup from "yup";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";

import Lock from './Icons/Lock'

const validationSchema = Yup.object().shape({
    email: Yup.string().email()
  });


const ForgotPassword = () => {
    const handleSubmit = (values) => {
        console.log("Values",values);
      };
    return (
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
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                />

            <    SubmitForm label="Submit" />
                </Form>
            </Layout>
            
        </Layout>
    )
}

export default ForgotPassword
