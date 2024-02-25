import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginOptions from '../screens/LoginOptions';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import TransactionDetails from '../screens/TransactionDetails';

import { useUserStore } from '../stores/user';

import { ITransactionsItem } from '../types/transaction';

export type StackRoutes = {
  signIn: undefined;
  signUp: undefined;
  loginOptions: undefined;
  home: undefined;
  transactionDetails: ITransactionsItem;
};

type ScreenMapping = {
  name: keyof StackRoutes;
  component: React.ComponentType;
};

const publicscreenMappings: ScreenMapping[] = [
  { name: 'home', component: Home },
  { name: 'transactionDetails', component: TransactionDetails },
];

const privateScreenMappings: ScreenMapping[] = [
  { name: 'signIn', component: SignIn },
  { name: 'signUp', component: SignUp },
  { name: 'loginOptions', component: LoginOptions },
];

const { Navigator, Screen } = createNativeStackNavigator<StackRoutes>();

const StackRoutes = (): JSX.Element => {
  const {
    currentScreenName,
    userData: { isLogged },
  } = useUserStore();

  return (
    <Navigator
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        contentStyle: {
          backgroundColor: 'white',
          padding: 0,
        },
      }}
      initialRouteName={currentScreenName}
    >
      {isLogged
        ? publicscreenMappings.map(({ name, component }) => (
            <Screen name={name} component={component} key={name} />
          ))
        : privateScreenMappings.map(({ name, component }) => (
            <Screen name={name} component={component} key={name} />
          ))}
    </Navigator>
  );
};

export default StackRoutes;
