import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModelModal from '../components/UploadModelModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const TABBAR_HEIGHT = 49;

function CameraButton() {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const onCameraPress = () => {
    setVisible(true);
  };

  const onCameraClose = () => {
    setVisible(false);
  };

  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
  };

  const onPickImage = res => {
    if (res.didCancel || res) {
      return;
    }
    console.log(res);
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
    setVisible(false);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
    setVisible(false);
  };

  // const onPress = () => {
  //   if (Platform.OS === 'android') {
  //     setVisible(true);
  //     return;
  //   }
  // };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{color: '#ffffff'}}
          style={styles.circle}
          onPress={onCameraPress}>
          <Icon name="camera-alt" color="white" size={24} />
        </Pressable>
      </View>
      <UploadModelModal
        visible={visible}
        onClose={onCameraClose}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 5,
    width: 54,
    height: 54,
    borderRadius: 27,
    left: '50%',
    transform: [{translateX: -27}],
    ...Platform.select({
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    width: '100%',
    height: '100%',
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraButton;
