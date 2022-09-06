import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderInput from './BorderInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const defaultUserImg = require('../assets/user.png');

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState(null);

  const {params} = useRoute();
  const {uid} = params || {};

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop();
      const reference = storage().ref(`/profile/${uid}.${extension}`);
      console.log(asset);

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }

      photoURL = response ? await reference.getDownloadURL() : null;
      console.log('photo', photoURL);
    }

    setLoading(false);

    const user = {id: uid, displayName: displayName, photoURL: photoURL};
    console.log(JSON.stringify(user));

    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        console.log(JSON.stringify(res, 2, 2));
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={[styles.circle]}
          source={response ? {uri: response?.assets[0]?.uri} : defaultUserImg}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <View style={styles.spinnerWrapper}>
            <ActivityIndicator size={32} color="#6200ee" />
          </View>
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SetupProfile;
