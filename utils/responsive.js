import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Cap the scale factor so UI doesn't get huge on tablets
const MAX_SCALE_FACTOR = 1.3; 

export const scale = (size) => {
  const baseWidth = 375;
  const scaleFactor = SCREEN_WIDTH / baseWidth;
  return Math.min(scaleFactor, MAX_SCALE_FACTOR) * size;
};

export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const verticalScale = (size) => {
  const baseHeight = 812;
  const scaleFactor = SCREEN_HEIGHT / baseHeight;
  return Math.min(scaleFactor, MAX_SCALE_FACTOR) * size;
};

export const fontScale = (size) => {
  const scaleFactor = SCREEN_WIDTH / 375;
  const cappedScale = Math.min(scaleFactor, MAX_SCALE_FACTOR);
  const newSize = size * cappedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const isTablet = SCREEN_WIDTH >= 768;
export const isLargeDevice = SCREEN_WIDTH >= 1024;
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isAndroid = Platform.OS === 'android';

// Optional: Responsive padding/margin shorthand
export const responsiveSize = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};