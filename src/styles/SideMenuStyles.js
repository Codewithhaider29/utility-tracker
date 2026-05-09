import { StyleSheet, Platform } from 'react-native';
import { scale, moderateScale, verticalScale, fontScale, isLargeDevice } from '../../utils/responsive';

export const COLORS = {
  primary: '#4361ee', 
  secondary: '#4cc9f0',
  background: '#f8faff',
  textDark: '#1e293b', 
  textLight: '#64748b',
  white: '#ffffff',
  danger: '#ff4d6d',
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 100,
    flexDirection: 'row',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  menuContent: {
    width: isLargeDevice ? '65%' : '85%',
    maxWidth: scale(380),
    backgroundColor: COLORS.white,
    height: '100%',
    padding: moderateScale(30),
    paddingTop: Platform.select({
      ios: verticalScale(60),
      android: verticalScale(40),
      default: verticalScale(40),
    }),
    borderTopRightRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(20),
  },
  closeCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    color: COLORS.danger,
    fontSize: fontScale(16),
    fontWeight: 'bold',
  },
  menuProfileSection: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  logoRing: {
    padding: moderateScale(5),
    borderWidth: moderateScale(2),
    borderColor: COLORS.secondary,
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(15),
  },
  menuLogo: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
  },
  menuBrandName: {
    fontSize: fontScale(22),
    fontWeight: '800',
    color: COLORS.textDark,
  },
  menuTagline: {
    fontSize: fontScale(12),
    color: COLORS.textLight,
    marginTop: verticalScale(4),
  },
  itemsWrapper: {
    gap: moderateScale(12),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
    gap: moderateScale(15),
  },
  activeMenuItem: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: moderateScale(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  menuItemIcon: {
    fontSize: fontScale(20),
  },
  menuItemText: {
    fontSize: fontScale(16),
    color: COLORS.textDark,
    fontWeight: '600',
  },
  activeMenuText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  menuFooter: {
    position: 'absolute',
    bottom: verticalScale(40),
    left: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  footerText: {
    fontSize: fontScale(12),
    color: COLORS.textLight,
    fontWeight: '600',
  },
  statusDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#10b981',
  },
});

export default styles;