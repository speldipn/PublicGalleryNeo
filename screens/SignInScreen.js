import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderInput from '../components/BorderInput';
import CustomButton from '../components/CustomButton';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route?.params ?? {};
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (isSignUp) {
      navigation.pop();
      setForm({});
    }
    console.log(form);
  };

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <BorderInput
            hasMarginBottom
            placeholder="이메일"
            value={form.email}
            onChangeText={createChangeTextHandler('email')}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <BorderInput
            placeholder="비밀번호"
            hasMarginBottom={isSignUp}
            value={form.password}
            onChangeText={createChangeTextHandler('password')}
            ref={passwordRef}
            onSubmitEditing={() => {
              if (isSignUp) {
                confirmPasswordRef.current.focus();
              } else {
                onSubmit();
              }
            }}
            returnKeyType={isSignUp ? 'next' : 'done'}
            secureTextEntry
          />
          {isSignUp && (
            <BorderInput
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChangeText={createChangeTextHandler('confirmPassword')}
              onSubmitEditing={onSubmit}
              secureTextEntry
              returnKeyType="done"
            />
          )}
          <View style={styles.buttons}>
            {/* 회원가입 */}
            {isSignUp ? (
              <>
                <CustomButton title="가입하기" onPress={() => onSubmit()} />
              </>
            ) : (
              // 로그인
              <>
                <CustomButton
                  title="로그인"
                  hasMarginBottom
                  onPress={() => onSubmit()}
                />
                <CustomButton
                  title="회원가입"
                  theme="scondaray"
                  onPress={() => navigation.push('SignIn', {isSignUp: true})}
                />
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignInScreen;
