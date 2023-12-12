import {
  Dimensions,
  ScrollView as NativeScroll,
  type ScrollViewProps as NativeScrollProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
  Animated,
  type ViewStyle,
  type LayoutChangeEvent,
  Easing
} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  type FC,
  useEffect,
} from 'react';
import type { ViewProps } from 'react-native';

const { height } = Dimensions.get('window');

export interface ScrollViewProps extends NativeScrollProps {
  showAlways?: boolean;
  indicatorColor?: string;
  parentViewProps?: ViewProps;
  flexDisabled?: boolean;
  indicatorWidth?: number;
  indicatorborder?: number;
  ref?:  React.RefObject<NativeScroll>
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}
// @ts-ignore
const ScrollView: FC<ScrollViewProps> = React.forwardRef((props,ref) => {
  const scroll = useRef<NativeScroll>(null);
  const scrolAnimation = useRef<Animated.Value>(new Animated.Value(1)).current;
  const [ScrolledSize, setScrolledSize] = useState<number>(1);
  const [ScrolledContainerSize, setScrolledContainerSize] = useState<number>(height);

  const animation = useCallback(
    (val: number, ch) => {
      // Animated.spring(scrolAnimation, {
      //   toValue: ScrolledContainerSize * (val / ch),
      //   useNativeDriver: true,
      //   bounciness: 8,
      //   velocity:Platform.OS ==="ios"&& velocity || undefined,
        
      //   delay: 0,
      // }).start();
      Animated.timing(scrolAnimation,{
        toValue:ScrolledContainerSize * (val / ch),
        useNativeDriver: true,
        duration:0,
        delay:0,
        easing:Easing.ease
      }).start();
    },
    [scrolAnimation,ScrolledContainerSize]
  );

  const _Scrolled = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrolledSize(event.nativeEvent.contentSize.height);
      animation(
        event.nativeEvent.contentOffset.y,
        event.nativeEvent.contentSize.height
      );
      props.onScroll && props?.onScroll(event);

    },
    [animation,ScrolledSize]
  );
  const _ContentHeight = useCallback(
    (event: LayoutChangeEvent) => {
      setScrolledContainerSize(event.nativeEvent.layout.height);
      props.onLayout &&props?.onLayout(event);
    },
    [ScrolledContainerSize]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      if(ref)
      // @ts-ignore
      ref.current?.scrollTo({ y: 1 });
      else
      scroll.current?.scrollTo({ y: 1 });
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const indicator = ScrolledContainerSize / (ScrolledSize / ScrolledContainerSize);
  return (
    <View {...props.parentViewProps ||{}} style={[styles.container, !props.flexDisabled && styles.flexEnabled ||{}, props.parentViewProps?.style || {}]}>
      <NativeScroll
        scrollEventThrottle={70}
        showsVerticalScrollIndicator={false}
        {...props}
        ref={ref || scroll}
        // @ts-ignore
        onScroll={_Scrolled}
        onLayout={_ContentHeight}
      
      >
        {props.children}
      </NativeScroll>
      {props.showAlways &&ScrolledContainerSize< ScrolledSize && <Animated.View
        style={styles.indicatorView(
          indicator,
          scrolAnimation,
          props.indicatorColor,
          props.indicatorWidth,
          props.indicatorborder
        )}
      />}
    </View>
  );
});

export default ScrollView;

ScrollView.defaultProps = {
  indicatorborder: 20,
  indicatorColor: '#303030',
  indicatorWidth: 4,
  showAlways: true,
};

type indicatorView = (
  height: number,
  scrolAnimation: Animated.Value,
  color: string,
  width: number,
  borderRadius: number
) => ViewStyle;

type Styles = {
  indicatorView: indicatorView;
};

const styles = StyleSheet.create<Styles | any>({
  indicatorView: (
    height: number,
    scrolAnimation: Animated.Value,
    color: string,
    width: number,
    borderRadius: number
  ) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: width,
    backgroundColor: color,
    height,
    borderRadius,
    transform: [{ translateY: scrolAnimation }],
  }),
  container: {
    position: 'relative',
    width: '100%',
  },
  flexEnabled: {
    flex:1
  }
});
