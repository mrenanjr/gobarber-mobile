import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
};

interface inputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
    const inputElementref = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<inputValueReference>({ value: '' });

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value){
                inputValueRef.current.value = value;
                inputElementref.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementref.current.clear();
            }
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360"/>
            <TextInput
                keyboardAppearance='dark'
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onChangeText={value => inputValueRef.current.value = value}
                {...rest}
            />
        </Container>
    );
};

export default Input;
