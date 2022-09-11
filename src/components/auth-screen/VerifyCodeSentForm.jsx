import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import * as yup from 'yup';

const verifyPasswordResetEmailSchema = yup.object().shape({
  code: yup.string().required('Code is Required'),
});

const VerifyCodeSentForm = ({setCodeSent}) => {
  const [errorMessage, setErrorMessage] = useState();

  const handleVerifyPasswordReset = values => {
    setErrorMessage(null);
    auth()
      .verifyPasswordResetCode(values.code)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (error.code === 'auth/expired-action-code') {
          setErrorMessage('Rest Code Expired!');
        }
        if (error.code === 'auth/invalid-action-code') {
          setErrorMessage('Invalid Reset Code!');
        }
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not Found!');
        }
        console.error(error);
      });
  };

  return (
    <View style={{width: '100%'}}>
      <Formik
        validationSchema={verifyPasswordResetEmailSchema}
        initialValues={{code: ''}}
        onSubmit={values => handleVerifyPasswordReset(values)}>
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
              name="code"
              placeholder="Code"
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
              errorMessage={errors.code}
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
                title="Submit"
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

export default VerifyCodeSentForm;
