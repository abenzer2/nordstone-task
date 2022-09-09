import {View, Text, Button, StyleSheet, Modal, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native-elements';

const UploadPhotoScreen = () => {
  const [imageData, setImageData] = useState();
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState();
  const [showImageModal, setShowImageModal] = useState(false);

  const cameraOptions = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const reference = storage().ref('nordstone.png');

  const uploadImage = () => {
    const task = reference.putFile(imageData.uri);
    task.on('state_changed', taskSnapshot => {
      setProgress(
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
      );
    });
    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
  };

  const captureImage = () => {
    console.log('came here');
    launchCamera(cameraOptions, response => {
      console.log('Response = 1 ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        setImageData(response.assets[0]);
      }
    });
  };

  const getImageFromGallery = () => {
    launchImageLibrary(cameraOptions, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        setImageData(response.assets[0]);
      }
    });
  };

  const getImageUrl = async () => {
    const url = await storage().ref('nordstone.png').getDownloadURL();
    setImageURL(url);
  };

  useEffect(() => {
    getImageUrl();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {imageURL && (
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            marginBottom: 20,
          }}
          source={{uri: imageURL}}
        />
      )}
      <Button title="Change Image" onPress={() => setShowImageModal(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showImageModal}
        onRequestClose={() => {
          setShowImageModal(!showImageModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {imageData && (
              <React.Fragment>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}
                  source={{uri: imageData ? imageData.uri : ''}}
                />
                <Button title='Close' onPress={()=>setShowImageModal(false)} />
                <Button title="Upload" onPress={() => uploadImage()} />
                <Text>Progress: {progress}</Text>
              </React.Fragment>
            )}
            <Button title="Capture" onPress={captureImage} />
            <Button title="Gallery" onPress={getImageFromGallery} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    height: '100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UploadPhotoScreen;
