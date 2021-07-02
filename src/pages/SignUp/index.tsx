import React, { useRef, useCallback } from 'react';
import {
	Image,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
	const navigation = useNavigation();

	const formRef = useRef<FormHandles>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const handleSubmit = useCallback((data: object) => {
		console.log('data', data);
	}, []);

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{ flex: 1 }}>
					<Container>
						<Image source={logoImg} />

						<Title>Crie sua conta</Title>

						<Form ref={formRef} onSubmit={handleSubmit}>
							<Input
								name="name"
								icon="user"
								placeholder="Nome"
								autoCorrect={false}
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={() => {
									emailInputRef.current?.focus();
								}}
							/>

							<Input
								ref={emailInputRef}
								name="email"
								icon="mail"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								returnKeyType="next"
								onSubmitEditing={() => {
									passwordInputRef.current?.focus();
								}}
							/>

							<Input
								ref={passwordInputRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								onSubmitEditing={() => {
									formRef.current?.submitForm();
								}}
								textContentType="newPassword"
								returnKeyType="send"
							/>

							<Button
								onPress={() => {
									formRef.current?.submitForm();
								}}>
								Entrar
							</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<BackToSignIn
				onPress={() => {
					navigation.navigate('SignIn');
				}}>
				<Icon name="arrow-left" size={20} color="#fff" />
				<BackToSignInText>Voltar para logon</BackToSignInText>
			</BackToSignIn>
		</>
	);
};

export default SignUp;
