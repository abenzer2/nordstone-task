import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import {Button, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import * as yup from 'yup';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

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
    await axios
      .post('https://nordstone-api-heroku.herokuapp.com/calculate', {
        first_number:Number(values.first_number),
        second_number:Number(values.second_number),
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
    <View style={styles.container}>
      <Formik
        validationSchema={calculationSchema}
        onSubmit={values => handleCalculate(values)}
        initialValues={{first_number: 0, second_number: 0}}
        >
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

          <View style={{flexDirection:'row'}}>
            <Input
              name="first_number"
              onChangeText={handleChange('first_number')}
              onBlur={handleBlur('first_number')}
              value={values.first_number}
              keyboardType="numeric"
              inputContainerStyle={{
                borderBottomColor:errors.first_number ? 'red' : 'gray',
                backgroundColor:'#e0e2e5',
              }}
              containerStyle={{width:100 }}
            />
              <Picker
                selectedValue={operation}
                style={{
                  height: 50, 
                  width: 90,
                  marginRight:8, 
                  backgroundColor:'#e0e2e5'
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
                borderBottomColor:errors.second_number ? 'red' : 'gray',
                backgroundColor:'#e0e2e5',
              }}
              containerStyle={{width:100 }}
            />
            </View>
            <Button
              title="Calculate"
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            />
            <Text>Result: {result}</Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
