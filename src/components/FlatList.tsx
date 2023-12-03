import {
  Dimensions,
  FlatList as FlatlistNativeScroll,
  type FlatListProps as FlatlistPropsNativeScroll,
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
  useLayoutEffect,
} from 'react';

const { height } = Dimensions.get('window');

export interface FlatListProps<ItemT> extends FlatlistPropsNativeScroll<ItemT> {
  showAlways?: boolean;
  indicatorColor?: string;
  indicatorWidth?: number;
  indicatorborder?: number;
  ref?: React.RefObject<FlatlistNativeScroll<any>>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  
}
// @ts-ignore
const FlatList: FC<FlatListProps<any>> = React.forwardRef((props,ref) => {
  const scroll = useRef<FlatlistNativeScroll>(null);
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
    [scrolAnimation]
  );

  const _Scrolled = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrolledSize(event.nativeEvent.contentSize.height);
      animation(
        event.nativeEvent.contentOffset.y,
        event.nativeEvent.contentSize.height
      );
      props.onScroll &&props?.onScroll(event);
    },
    [animation]
  );
  const _ContentHeight = useCallback(
    (event: LayoutChangeEvent) => {
      setScrolledContainerSize(event.nativeEvent.layout.height);
      props.onLayout &&props?.onLayout(event);
    },
    []
  );

  useEffect(() => {
    // console.log("animation", props.ref.current)
    // props.ref = scroll
    const t = setTimeout(() => {
      if(ref)
      // @ts-ignore
      ref.current?.scrollToOffset({ offset: 1 });
      else
      scroll.current?.scrollToOffset({ offset: 1 });

    }, 10);
    return () => clearTimeout(t);
  }, []);

  useLayoutEffect(() => {
    // console.log("scrolling", scroll.current)
    // if(props.ref){
      // @ts-ignore
      // props.ref = scroll
    // }
  }, [scroll.current])

  const indicator = ScrolledContainerSize / (ScrolledSize / ScrolledContainerSize);
  return (
    <View style={styles.container}>
      <FlatlistNativeScroll
        {...props}
        ref={ref || scroll}
        // @ts-ignore
        onScroll={_Scrolled}
        onLayout={_ContentHeight}
        scrollEventThrottle={70}
        showsVerticalScrollIndicator={false}
      >
        {props.children}
      </FlatlistNativeScroll>
      <Animated.View
        style={styles.indicatorView(
          indicator,
          scrolAnimation,
          props.indicatorColor,
          props.indicatorWidth,
          props.indicatorborder
        )}
      />
    </View>
  );
});

export default FlatList;

FlatList.defaultProps = {
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
    flex: 1,
    position: 'relative',
    width: '100%',
  },
});
