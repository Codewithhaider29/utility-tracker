import { StyleSheet, Platform } from 'react-native';
import { scale, moderateScale, verticalScale, fontScale } from '../../utils/responsive';

export const COLORS = {
  primary: '#4361ee', 
  secondary: '#4cc9f0',
  background: '#f8faff',
  textDark: '#1e293b', 
  textLight: '#64748b',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: Platform.select({
      ios: verticalScale(10),
      android: verticalScale(35),
      default: verticalScale(20),
    }),
    paddingBottom: verticalScale(15),
    zIndex: 100,
    backgroundColor: COLORS.background,
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(12),
  },
  logoFrame: {
    // No background or padding needed
  },
  headerLogo: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(10),
  },
  headerTitle: {
    fontSize: fontScale(20),
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(15),
    gap: moderateScale(8),
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuIconWrapper: {
    gap: moderateScale(4),
  },
  hamburgerLine: {
    width: moderateScale(18),
    height: moderateScale(2.5),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(2),
  },
  menuText: {
    color: COLORS.textDark,
    fontSize: fontScale(14),
    fontWeight: '700',
  },
});

export default styles;