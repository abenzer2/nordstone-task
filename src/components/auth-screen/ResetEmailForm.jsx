import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import { sendPasswordResetEmail } from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import * as yup from 'yup';

const sendPasswordResetEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ResetEmailForm = ({setCodeSent}) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleSendPasswordReset = values => {
    console.log(values.email);
    setErrorMessage(null);
    auth()
      .sendPasswordResetEmail(values.email)
      .then(res => {
        console.log(res);
        setCodeSent(true);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not Found!');
        }
        console.error(error);
      });
  };

  return (
    <View style={{width: '80%'}}>
      <Formik
        validationSchema={sendPasswordResetEmailSchema}
        initialValues={{email: ''}}
        onSubmit={values => handleSendPasswordReset(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          isSubmitting
        }) => (
          <>
            <Input
              name="email"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />

            {errors.email && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.email}</Text>
            )}
            {errorMessage && (
              <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
            )}
            <Button
              title="Send Reset Code"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default ResetEmailForm;
