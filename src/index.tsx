import { NativeModules, Platform } from 'react-native';
import ScrollView,{type ScrollViewProps} from './components/ScrollView';
import FlatList, {type FlatListProps} from './components/FlatList';
import KeyboardAwareScrollView, {type KeyboardAwareScrollViewProps} from './components/KeyboardAwareScrollView';

const LINKING_ERROR =
  `The package 'react-native-scroll-indicator-always' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ScrollIndicatorAlways = NativeModules.ScrollIndicatorAlways
  ? NativeModules.ScrollIndicatorAlways
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return ScrollIndicatorAlways.multiply(a, b);
}

export { ScrollView, FlatList, type ScrollViewProps, type FlatListProps, KeyboardAwareScrollView, type KeyboardAwareScrollViewProps};
