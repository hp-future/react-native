import { View, Image, ImageSourcePropType } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

interface EmojiStickerProps {
  stickerSource: ImageSourcePropType;
  imageSize: number;
}

export default function EmojiSticker(props: EmojiStickerProps) {
  const scaleImage = useSharedValue(props.imageSize);
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== props.imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap as any} numberOfTaps={2}>
          <AnimatedImage
            source={props.stickerSource}
            resizeMode="contain"
            style={[
              imageStyle,
              { width: props.imageSize, height: props.imageSize },
            ]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}
