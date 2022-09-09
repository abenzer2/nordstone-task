import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CalculatorScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CalculatorScreen</Text>
    </View>
  )
}

export default CalculatorScreen

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    height: '100%'
  }
})