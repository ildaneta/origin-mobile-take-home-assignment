import React, { useCallback } from 'react';
import { Image } from 'tamagui';

import Container from '../components/Container';
import Text from '../components/Text';

import { useUserStore } from '../stores/user';

const Home = (): JSX.Element => {
  const {
    userData: { photoUrl },
  } = useUserStore();

  return (
    <Container>
      <>
        <Text>Home</Text>

        <Image
          source={{ uri: photoUrl ?? 'https://', cache: 'force-cache' }}
          width={90}
          height={90}
          borderRadius={45}
          backgroundColor={'$gray100'}
        />
      </>
    </Container>
  );
};

export default Home;
