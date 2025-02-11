import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';

export const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};
