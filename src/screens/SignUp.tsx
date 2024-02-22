import React, { useState } from 'react';
import { View } from 'tamagui';

import Container from '../components/Container';
import Input from '../components/Input';
import HeaderBack from '../components/HeaderBack';
import Text from '../components/Text';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Eye } from '@tamagui/lucide-icons';
import Upload from '../components/Upload';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignUp = (): JSX.Element => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<FormValues>(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <Container hasPaddingHorizontal={false}>
      <>
        <HeaderBack onPress={() => {}} />

        <View paddingHorizontal={20} marginTop={20}>
          <Text alignSelf="center" color="$primary700" fontSize={'$4'}>
            Get started with Origin
          </Text>

          <Text alignSelf="center" color="$gray300" fontSize={'$3'}>
            Try Origin free
          </Text>

          <Text color="$primary700" fontSize={'$4'} marginTop={40}>
            Create an account
          </Text>

          <View marginTop={16} />

          <Input
            control={control}
            name="name"
            hasError={!!errors.name}
            label="Name"
            isFocused={isNameFocused}
            onBlur={() => setIsNameFocused(false)}
            onFocus={() => setIsNameFocused(true)}
          />

          <View marginTop={12} />

          <Input
            control={control}
            name="email"
            hasError={!!errors.email}
            label="Email"
            isFocused={isEmailFocused}
            onBlur={() => setIsEmailFocused(false)}
            onFocus={() => setIsEmailFocused(true)}
          />

          <View marginTop={12} />

          <Input
            control={control}
            name="password"
            hasError={!!errors.password}
            label="Password"
            isFocused={isPasswordFocused}
            onBlur={() => setIsPasswordFocused(false)}
            onFocus={() => setIsPasswordFocused(true)}
            iconButton={<Eye color={'$primary300'} />}
          />

          <View marginTop={12} />

          <Upload
            hasError={false}
            onPress={() => {}}
            allowedTypes="JPG, PNG, JPEG"
            label="Upload your selfie"
          />
        </View>
      </>
    </Container>
  );
};

export default SignUp;
