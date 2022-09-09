import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, Input} from 'react-native-elements';

const SaveTextScreen = () => {
  const messagesCollection = firestore().collection('Messages');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  function onResult(QuerySnapshot) {
    setMessages(QuerySnapshot._docs);
  }

  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    const subscriber = messagesCollection.onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  const saveMessage = () => {
    const res = messagesCollection.add({message: value});
    res.then(()=>{console.log('message added')})
    setValue('')
  };

  const ListItem = ({item}) => {
    return <Text style={{color: 'black'}}>{item?._data?.message}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => <ListItem item={item} />}
      />
      <Input
        value={value}
        onChangeText={val => {
          setValue(val);
        }}
      />
      <Button title="Save" onPress={() => saveMessage()} />
      <View></View>
    </View>
  );
};

export default SaveTextScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    // alignItems: 'center',
    height: '100%',
  },
});
