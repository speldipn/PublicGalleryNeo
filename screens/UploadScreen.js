import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [descriptoin, setDescription] = useState('');

  const navigation = useNavigation();
  const onSubmit = useCallback(() => {
    // TODO:POST
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  return (
    <View style={styles.block}>
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={descriptoin}
        onChangeText={setDescription}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
