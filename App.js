import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainNavigation } from './navigation/navigation';
import { Provider } from 'react-redux';
import { store } from './store/index';
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {init} from "./DB"





SplashScreen.preventAutoHideAsync()
init()
  .then(() => console.log('Database initialized'))
  .catch(err => console.error('Database initialization failed', err))



export default function App() {

  const [fontsLoaded, fontError] = useFonts({
  'Bungee-Regular':require("./assets/fonts/Bungee-Regular.ttf"),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Black":require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Thin":require("./assets/fonts/Roboto-Thin.ttf")
  })


  useEffect(() => {
    const onLayoutRootView = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync()
      }
    }
    onLayoutRootView()
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null;




  return (
    <Provider store={store}>
   
      <SafeAreaProvider>

        <StatusBar backgroundColor='#fff' style='dark' animated={true} />
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>


  );
};




