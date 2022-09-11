import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import { Button, Input } from 'react-native-elements';
import * as yup from 'yup'
import { colors } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(/^(?=.*[a-z])/,'password must include lowercase letter')
    .matches(/^(?=.*[A-Z])/,"password must include uppercase letter")
    .matches(/^(?=.*[0-9])/,'password must include digit')
    .matches(/^(?=.*[!@#\$%\^&\*])/,'password must include special character')
    ,
  confirm_password: 
  yup.string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password'), null], 'Passwords must match!')
});

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState();

  const {navigate} = useNavigation()

  const handleSignUp = values => {
    setErrorMessage(null);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(res => {
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
  return (
    <View style={{width: '100%'}}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: '',confirm_password:''}}
        onSubmit={values => handleSignUp(values)}>
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
            <Input
              name="confirm_password"
              placeholder="confirm password"
              onChangeText={handleChange('confirm_password')}
              onBlur={handleBlur('confirm_password')}
              value={values.confirm_password}
              secureTextEntry
              errorMessage={errors.confirm_password}
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
                marginTop: 40,
              }}>
            <Button
              title= 'Sign Up'
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
          <Text style={{marginRight: 2, fontSize: 16, fontWeight: '500'}}>
            Already member?
          </Text>
          <Pressable onPress={() => navigate('SignIn')} disabled={isSubmitting}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: colors.secondary,
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;
