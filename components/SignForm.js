import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BorderInput from '../components/BorderInput';

function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
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
          ref={confirmPasswordRef}
        />
      )}
    </>
  );
}

export default SignForm;
