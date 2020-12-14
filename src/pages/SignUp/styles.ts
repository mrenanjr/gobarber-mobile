import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 140 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotSlab-Medium';
    margin: 64px 0 24px;
`;

export const FP = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const FPText = styled.Text`
    color: #f4ede8;
    font-size: 18px;
    font-family: 'RobotSlab-Regular';
`;

export const BackSignIn = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #312e38;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0 ${10 + getBottomSpace()}px;

    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const BackSignInText = styled.Text`
    color: #fff;
    font-size: 18px;
    font-family: 'RobotSlab-Regular';
    margin-left: 16px;
`;
