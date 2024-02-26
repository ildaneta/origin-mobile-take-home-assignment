import React from 'react';
import { Text, Button, Separator } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';

interface ISelector {
  onPress: (selectedItem: string) => void;
  filter: string;
  options: {
    name: string;
    id: number;
  }[];
}

const Selector = ({ options, onPress, filter }: ISelector) => {
  const handleItemPress = (selectedItem: string) => {
    onPress(selectedItem);
  };

  return (
    <Button
      unstyled
      borderWidth={1}
      borderRadius={19}
      marginTop={8}
      paddingHorizontal={20}
      borderColor={'$gray200'}
    >
      {options.map((item, index) => (
        <>
          <Button
            key={item.id}
            unstyled
            paddingVertical={10}
            onPress={() => handleItemPress(item.name)}
            pressStyle={{ opacity: 0.7 }}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Text color={'$primary500'}>{item.name}</Text>

            {item.name === filter && <Check color={'$primary500'} />}
          </Button>

          {index !== options.length - 1 && (
            <Separator vertical={false} width={500} borderColor={'$gray200'} />
          )}
        </>
      ))}
    </Button>
  );
};

export default Selector;
