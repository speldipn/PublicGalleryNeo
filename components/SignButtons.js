import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CustomButton from '../components/CustomButton';

function SignButtons({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();

  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack();
    } else {
      navigation.push('SignIn', {isSignUp: true});
    }
  };

  return (
    <View style={styles.buttons}>
      {loading ? (
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size={32} color="#6200ee" />
        </View>
      ) : (
        <>
          <CustomButton
            title={primaryTitle}
            hasMarginBottom
            onPress={onSubmit}
          />
          <CustomButton
            title={secondaryTitle}
            theme="secondary"
            onPress={onSecondaryButtonPress}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;