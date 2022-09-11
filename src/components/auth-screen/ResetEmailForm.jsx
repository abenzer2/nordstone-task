import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {sendPasswordResetEmail} from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Button, Icon, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import * as yup from 'yup';

const sendPasswordResetEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ResetEmailForm = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [emailSent, setEmailSent] = useState(false);

  const handleSendPasswordReset = values => {
    console.log(values.email);
    setErrorMessage(null);
    auth()
      .sendPasswordResetEmail(values.email, {
        handleCodeInApp: true,
        url: 'https://localhost:3000/',
      })
      .then(res => {
        console.log(res);
        setEmailSent(true);
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

  if (emailSent) {
    return (
      <View
        style={{
          width: '100%',
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          size={40}
          reverse
          name="checkmark"
          type="ionicon"
          color={'green'}
          iconStyle={{
            fontWeight: 'bold',
          }}
        />
        <Text style={{fontWeight: 'bold', marginTop: 20, textAlign:'center'}}>
          Email Sent Successfully! Go to your email and reset your password
        </Text>
      </View>
    );
  }

  return (
    <View style={{width: '100%'}}>
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
          isSubmitting,
        }) => (
          <>
            <Input
              name="email"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              errorMessage={errors.email}
              style={{
                fontWeight: 'bold',
                fontSize: 14,
              }}
              inputContainerStyle={{
                borderBottomColor: colors.lightGray,
                borderBottomWidth: 2,
              }}
              placeholderTextColor={colors.mediumGray}
            />
            {errorMessage && (
              <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
            )}
            <View
              style={{
                marginTop: 20,
              }}>
              <Button
                title="Send Reset Code"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                buttonStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  paddingVertical: 10,
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ResetEmailForm;
