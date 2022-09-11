import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ActivityIndicator,
  Platform,
  ProgressBarAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Image, Button, Icon} from 'react-native-elements';
import {captureImage} from '../../utils/capture-image';
import {getImageFromGallery} from '../../utils/get-image-from-gallery';
import BackgroundLayout from '../../components/common/BackgroundLayout';
import {colors} from '../../constants/theme';
// import { ProgressBar } from '@react-native-community/progress-bar-android';

const UploadPhotoScreen = () => {
  const reference = storage().ref('nordstone.png');

  const [imageData, setImageData] = useState();
  const [imageURL, setImageURL] = useState();
  const [progress, setProgress] = useState(0);

  const [showImageModal, setShowImageModal] = useState(false);

  const [uploading, setUploading] = useState(false);

  const uploadImage = () => {
    setUploading(true);
    const task = reference.putFile(imageData.uri);
    task.on('state_changed', taskSnapshot => {
      setProgress(
        Math.floor(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    task.then(() => {
      setUploading(false);
      setImageData(null);
      setShowImageModal(false);
      getImageUrl();
      setProgress(0);
      console.log('Image uploaded to the bucket!');
    });
    task.catch(e => {
      console.log(e);
      setUploading(false);
    });
  };

  const getImageUrl = async () => {
    setImageURL(null);
    const url = await storage().ref('nordstone.png').getDownloadURL();
    setImageURL(url);
  };

  useEffect(() => {
    getImageUrl();
    return () => {};
  }, []);

  return (
    <BackgroundLayout variant="vector">
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
            loadingIndicatorSource={require('../../assets/images/vector-background.jpg')}
          />
        )}
        <Button
          title="Change Image"
          onPress={() => setShowImageModal(true)}
          titleStyle={{fontSize: 12}}
          buttonStyle={{
            backgroundColor: colors.primary,
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 15,
            marginTop: 20,
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={showImageModal}
          onRequestClose={() => {
            setShowImageModal(!showImageModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                reverse
                name="close"
                type="ionicon"
                color={'white'}
                iconStyle={{color: colors.red}}
                raised
                containerStyle={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
                onPress={() => setShowImageModal(false)}
              />
              {imageData ? (
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
                  {uploading && Platform.OS == 'android' && (
                    <ProgressBarAndroid progress={progress / 100} />
                  )}
                  {uploading && <Text>{progress}%</Text>}
                  <Button
                    title="Upload"
                    onPress={() => uploadImage()}
                    disabled={uploading}
                    titleStyle={{fontSize: 12}}
                    buttonStyle={{
                      backgroundColor: colors.primary,
                      // paddingVertical:15,
                      paddingHorizontal: 30,
                    }}
                    containerStyle={{width: '80%'}}
                    icon={
                      <Icon
                        name="cloud-upload-outline"
                        type="ionicon"
                        iconStyle={{color: 'white', marginRight: 10}}
                      />
                    }
                  />
                  <Button
                    title="Choose Another"
                    onPress={() => setImageData(null)}
                    titleStyle={{fontSize: 12}}
                    buttonStyle={{
                      backgroundColor: colors.red,
                      // paddingVertical:15,
                      paddingHorizontal: 30,
                      marginTop: 10,
                    }}
                    containerStyle={{width: '80%'}}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    title="Capture"
                    onPress={() => captureImage(image => setImageData(image))}
                    buttonStyle={{
                      backgroundColor: colors.primary,
                      // paddingVertical:15,
                      paddingHorizontal: 30,
                    }}
                    titleStyle={{fontSize: 12}}
                    containerStyle={{width: '80%'}}
                    icon={
                      <Icon
                        name="camera-outline"
                        type="ionicon"
                        iconStyle={{color: 'white', marginRight: 10}}
                      />
                    }
                  />
                  <Button
                    title="Gallery"
                    onPress={() =>
                      getImageFromGallery(image => setImageData(image))
                    }
                    buttonStyle={{
                      backgroundColor: colors.primary,
                      // paddingVertical:15,
                      paddingHorizontal: 30,
                      marginTop: 10,
                    }}
                    titleStyle={{fontSize: 12}}
                    containerStyle={{width: '80%'}}
                    icon={
                      <Icon
                        name="images-outline"
                        type="ionicon"
                        iconStyle={{color: 'white', marginRight: 10}}
                      />
                    }
                  />
                </React.Fragment>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minHeight: '50%',
    height: '80%',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default UploadPhotoScreen;
