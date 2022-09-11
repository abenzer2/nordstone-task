import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';

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

  const {navigate} = useNavigation();

  const handleSignIn = values => {
    setErrorMessage(null);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        console.log(res);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.error(error);
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setErrorMessage('That email address is invalid!');
          return
        }
        if (error.code === 'auth/user-disabled') {
          console.log('That email address is already in use!');
          setErrorMessage('User is disabled');
          return
        }
        if (error.code === 'auth/user-not-found') {
          console.log('User Not Found!');
          setErrorMessage('User is disabled');
          return
        }

        if (error.code === 'auth/wrong-password') {
          console.log('That email address is already in use!');
          setErrorMessage('Wrong Password or Email!');
          return
        }
        setErrorMessage("Something went wrong! Check your connection!");
      });
  };

  return (
    <View style={{width: '100%'}}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleSignIn(values)}>
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
            <Input
              name="password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              errorMessage={errors.password}
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
            <TouchableOpacity
              onPress={() => navigate('ForgotPassword')}
              disabled={isSubmitting}>
              <Text
                style={{
                  color: colors.secondary,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            {errorMessage && (
              <Text style={{fontSize: 10, color: 'red'}}>{errorMessage}</Text>
            )}
            <View
              style={{
                marginTop: 40,
              }}>
              <Button
                title="Sign In"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                buttonStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 40,
                  paddingVertical: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 50,
                justifyContent: 'center',
              }}>
              <Text style={{marginRight: 2, fontSize: 16, fontWeight: '500', color:colors.darkGray}}>
                New member?
              </Text>
              <Pressable onPress={() => navigate('SignUp')} disabled={isSubmitting}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: colors.secondary,
                  }}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}
