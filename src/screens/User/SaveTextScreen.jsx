import {View, Text, StyleSheet, FlatList, SectionList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Button, Icon, Input} from 'react-native-elements';
import {colors} from '../../constants/theme';
import BackgroundLayout from '../../components/common/BackgroundLayout';
import { ScrollView } from 'react-native-gesture-handler';

const SaveTextScreen = () => {
  const messagesCollection = firestore().collection('Messages');
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false)

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
    setMessages(messages=>[...messages,{_data:{message:value},loading:true}])
    setValue('');
    const res = messagesCollection.add({message: value});
    res.then(() => {
      console.log('message added');
    });
    res.catch(()=>setLoading(false))
  };

  const ListItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: 10,
          alignItems:'flex-end'
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: colors.accent,
            marginHorizontal:10,
            paddingVertical:10,
            paddingHorizontal:10,
            borderRadius:5
          }}>
          <Text style={{color: 'black'}}>{item?._data?.message}</Text>
        </View>
      </View>
    );
  };

  return (
    <React.Fragment>

    <BackgroundLayout variant="vector">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{justifyContent:'flex-end', minHeight:'80%',}}>
        {
         messages.map(message=>(
            <ListItem item={message} />
          ))
        }
        </ScrollView>
        <Input
          value={value}
          onChangeText={val => {
            setValue(val);
          }}
          placeholder="Type here..."
          style={{
            fontSize: 14,
          }}

          containerStyle={{
            // backgroundColor: 'white',
            paddingTop: 10,
            marginTop:10,
            marginBottom:-20,
            paddingBottom:0
            
          }}
          
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 5,
            borderRadius: 5,
            marginBottom: 0,
            backgroundColor:'white'
          }}
          rightIcon={
            <Icon
              disabled={(!value || loading)}
              disabledStyle={{backgroundColor: colors.transparent}}
              name="send"
              type="font-awesome"
              color={'white'}
              iconStyle={{color: (!value || loading) ? colors.mediumGray : colors.primary}}
              onPress={() => saveMessage()}
            />
          }
        />
      </View>
    </BackgroundLayout>
    </React.Fragment>
  );
};

export default SaveTextScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    height: '100%',
  },
});
