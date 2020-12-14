import React, { useCallback, useRef } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, FP, FPText, BackSignIn, BackSignInText } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const handleSignIn = useCallback((data) => {
        console.log(data);
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input name="email" icon="mail" placeholder="E-mail" />
                            <Input name="password" icon="lock" placeholder="Senha" />

                            <Button onPress={() => formRef.current?.submitForm}>Entrar</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackSignInText>Voltar para logon</BackSignInText>
            </BackSignIn>
        </>
    );
}

export default SignUp;
