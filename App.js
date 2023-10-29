import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet,AppState, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
    const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);


 

  console.log("state",appStateVisible)

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          source={{ uri: 'https://admin.resthero.io/' }} 
      />
       <Text>Current state is: {appStateVisible}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
