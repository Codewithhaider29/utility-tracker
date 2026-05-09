import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import styles, { COLORS } from '../styles/LoadingStyles';

const LoadingScreen = ({ logoImg }) => {
  const pulse = useSharedValue(0.9);
  const ripple = useSharedValue(1);
  const rippleOpacity = useSharedValue(0.3);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, false
    );
    ripple.value = withRepeat(withTiming(1.8, { duration: 2000 }), -1, false);
    rippleOpacity.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
  });

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ripple.value }],
    opacity: rippleOpacity.value,
  }));

  return (
    <View style={styles.loadingContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.logoWrapper}>
        <Animated.View style={logoStyle}>
          <Image source={logoImg} style={styles.loadingLogo} resizeMode="cover" />
        </Animated.View>
        <Animated.View style={[styles.shadowPulse, rippleStyle]} />
      </View>
    </View>
  );
};

export default LoadingScreen;