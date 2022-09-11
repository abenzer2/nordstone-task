import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';
import {colors, fonts} from '../../constants/theme';
import * as yup from 'yup';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import BackgroundLayout from '../../components/common/BackgroundLayout';

const calculationSchema = yup.object().shape({
  first_number: yup.number().required('Number is Required'),
  second_number: yup.number().required('Number is Required'),
});

export default function CalculatorScreen() {
  const [errorMessage, setErrorMessage] = useState();
  const [operation, setOperation] = useState('subtraction');
  const [result, setResult] = useState();

  const handleCalculate = async (values) => {
    setErrorMessage(null);
    setResult(null)
    await axios
      .post('https://nordstone-api-heroku.herokuapp.com/calculate', {
        first_number: Number(values.first_number),
        second_number: Number(values.second_number),
        operation,
      })
      .then(res => {
        setResult(res.data.result);
      })
      .catch(error => {
        setErrorMessage('Something went wrong!');
        console.error(error);
      });
  };

  return (
    <BackgroundLayout variant="vector">
      <View style={styles.container}>
        <Formik
          validationSchema={calculationSchema}
          onSubmit={values => handleCalculate(values)}
          initialValues={{first_number: null, second_number: null}}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            isSubmitting,
          }) => (
            <View>
              <View style={{flexDirection: 'row'}}>
                <Input
                  name="first_number"
                  onChangeText={handleChange('first_number')}
                  onBlur={handleBlur('first_number')}
                  value={values.first_number}
                  keyboardType="numeric"
                  inputContainerStyle={{
                    ...styles.numberInputContainerStyle,
                    borderColor: errors.first_number && 'red',
                    borderWidth: errors.first_number && 1,
                    borderBottomWidth: errors.first_number && 1,
                  }}
                  containerStyle={{width: 100}}
                />
                <Picker
                  selectedValue={operation}
                  style={{
                    height: 50,
                    width: 90,
                    marginRight: 8,
                    backgroundColor: 'white',
                  }}
                  onValueChange={setOperation}>
                  <Picker.Item label="+" value="addition" />
                  <Picker.Item label="-" value="subtraction" />
                  <Picker.Item label="*" value="multiplication" />
                </Picker>
                <Input
                  name="second_number"
                  onChangeText={handleChange('second_number')}
                  onBlur={handleBlur('second_number')}
                  value={values.second_number}
                  keyboardType="numeric"
                  inputContainerStyle={{
                    ...styles.numberInputContainerStyle,
                    borderColor: errors.second_number && 'red',
                    borderWidth: errors.second_number && 1,
                    borderBottomWidth: errors.second_number && 1,
                  }}
                  containerStyle={{width: 100}}
                />
              </View>
              <Button
                title="Calculate"
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  // width:'80%',
                  marginTop: 20,
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    fontSize: fonts.h1.fontSize,
                  }}>
                  Result: {result}{' '}
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  numberInputContainerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderRadius: 5,
    marginTop: 3,
  },
  numberInputStyle: {},
});
