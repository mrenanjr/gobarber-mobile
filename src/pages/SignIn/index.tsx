import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import { CAB, CABText, Container, FP, FPText, Title } from './styles';






interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();
    const { signIn } = useAuth();
    
    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
          try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
              email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
              password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
              abortEarly: false,
            });

            await signIn({
              email: data.email,
              password: data.password,
            });
          } catch (err) {
            if (err instanceof Yup.ValidationError) {
              formRef.current?.setErrors(getValidationErrors(err));

              return;
            }

            Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login, cheque suas credenciais.'
            )
          }
        },
        [signIn],
    );

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
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => formRef.current?.submitForm()}
                            />

                            <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
                        </Form>

                        <FP onPress={() => {}}>
                            <FPText>Esqueci minha senha</FPText>
                        </FP>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CAB onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CABText>Criar uma conta</CABText>
            </CAB>
        </>
    );
}

export default SignIn;
