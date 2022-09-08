import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';

import {colors} from '../../constants/theme';
import {Input} from 'react-native-elements';
import * as yup from 'yup';
import {Formik} from 'formik';
import ChooseMode from './ChooseMode';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState();
  const [hasAccount, setHasAccount] = useState(false);

  const handleSubmit = values => {
    if (hasAccount) {
      handleSignIn(values);
    }
    else {
      handleSignUp(values);
    }
  };

  const handleSignIn = values => {
    setErrorMessage(null);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        console.log(res);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setErrorMessage('That email address is invalid!');
        }
        if (error.code === 'auth/user-disabled') {
          console.log('That email address is already in use!');
          setErrorMessage('User is disabled');
        }
        if (error.code === 'auth/user-not-found') {
          console.log('User Not Found!');
          setErrorMessage('User is disabled');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('That email address is already in use!');
          setErrorMessage('Wrong Password or Email!');
        }
        console.error(error);
      });
  };

  const handleSignUp = values => {
    setErrorMessage(null);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(res => {
        console.log(res);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setErrorMessage('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setErrorMessage('That email address is invalid!');
        }
        console.error(error);
      });
  };

  const handleHasAccountChange = useCallback(value => {
    setHasAccount(value);
  }, []);

  return (
    <View style={{width: '80%'}}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
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
            <Input
              name="password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />

            {errors.password && (
              <Text style={{fontSize: 10, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            {errorMessage && (
              <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
            )}
            <Button
              title={hasAccount ? 'Sign In' : 'Sign Up'}
              onPress={handleSubmit}
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
      <View style={{marginTop:30}}>
      <ChooseMode
        hasAccount={hasAccount}
        setHasAccount={handleHasAccountChange}
      />
      </View>
    </View>
  );
}
