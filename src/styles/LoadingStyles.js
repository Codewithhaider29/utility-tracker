import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, fontScale } from '../../utils/responsive';

export const COLORS = {
  primary: '#4361ee', 
  secondary: '#4cc9f0',
  background: '#f8faff',
  textDark: '#1e293b', 
  textLight: '#64748b',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogo: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    zIndex: 2,
    backgroundColor: COLORS.white,
  },
  shadowPulse: {
    position: 'absolute',
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(80),
    backgroundColor: COLORS.primary,
    opacity: 0.1,
    zIndex: 1,
  },
  footer: {
    alignItems: 'center',
    gap: moderateScale(15),
  },
  loadingText: {
    fontSize: fontScale(16),
    color: COLORS.textLight,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default styles;