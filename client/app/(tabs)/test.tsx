import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';
import { TestPresenter } from '@/core/presenters/TestPresenter';
import { usePresenter } from '@/core/hooks/usePresenter';
import { useProxyData, State, useView } from '@/core/hooks/store';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { ViewModel } from '@/core/viewmodels/ViewModel';
import { TestViewModel } from '@/core/viewmodels/TestViewModel';

export type TextView = {
  count: number,
  name: string,
  email: string,
  showMessage: (message: string) => void
}

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const data: TextView = useView<TextView>({
      count: 0,
      name: '',
      email: '',
      showMessage(message: string) {
        this.name = message;
      } 
    });
  const presenter: TestPresenter = usePresenter<TestPresenter, TextView>(TestPresenter, data);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Tap" onPress={() => presenter.onButtonPressed()} />
        <ThemedText type="title">{data.count}</ThemedText>
        <TextInput
          onChangeText={(s) => presenter.onNameChange(s)}
          value={data.name}
        />
        <TextInput
          onChangeText={(s) => presenter.onEmailChange(s)}
          value={data.email}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
