import { StyleSheet, Platform } from 'react-native';
import { scale, moderateScale, verticalScale, fontScale, isTablet, isLargeDevice, isSmallDevice } from '../../utils/responsive';

export const COLORS = {
  primary: '#4361ee',
  secondary: '#4cc9f0',
  accent: '#f72585',
  background: '#f8faff',
  textDark: '#1e293b', 
  textLight: '#64748b',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  welcomeWrapper: {
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(40),
  },
  
  // Orb Decorations
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  orb: {
    position: 'absolute',
    borderRadius: moderateScale(200),
    opacity: 0.15,
  },
  orb1: {
    width: isLargeDevice ? scale(400) : moderateScale(300),
    height: isLargeDevice ? scale(400) : moderateScale(300),
    backgroundColor: COLORS.primary,
    top: isLargeDevice ? -150 : -100,
    right: isLargeDevice ? -150 : -100,
  },
  orb2: {
    width: isLargeDevice ? scale(300) : moderateScale(200),
    height: isLargeDevice ? scale(300) : moderateScale(200),
    backgroundColor: COLORS.secondary,
    bottom: verticalScale(50),
    left: isLargeDevice ? -120 : -80,
  },
  
  // Logo Section
  logoSection: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  glassCircle: {
    padding: moderateScale(12),
    backgroundColor: COLORS.white,
    borderRadius: scale(1000),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: verticalScale(12) },
        shadowOpacity: 0.2,
        shadowRadius: moderateScale(20),
      },
      android: { 
        elevation: isTablet ? 20 : 15 
      },
    }),
  },
  newBadge: {
    position: 'absolute',
    bottom: moderateScale(5),
    right: moderateScale(5),
    backgroundColor: COLORS.accent,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(3),
    borderColor: COLORS.white,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: fontScale(10),
    fontWeight: 'bold',
  },
  
  // Typography
  title: {
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: isTablet ? 55 : isSmallDevice ? 36 : 42,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: isTablet ? fontScale(20) : isSmallDevice ? fontScale(14) : fontScale(16),
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: verticalScale(12),
    lineHeight: isTablet ? 32 : isSmallDevice ? 20 : 24,
    paddingHorizontal: isTablet ? moderateScale(40) : moderateScale(15),
  },
  
  // Feature Cards Grid
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: verticalScale(40),
    gap: moderateScale(12),
  },
  featureCard: {
    width: isTablet ? '28%' : '30%',
    minWidth: moderateScale(100),
    backgroundColor: COLORS.white,
    padding: isTablet ? moderateScale(20) : moderateScale(15),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexGrow: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardEmoji: {
    fontSize: isTablet ? fontScale(28) : fontScale(22),
    marginBottom: verticalScale(8),
  },
  cardTitle: {
    fontSize: isTablet ? fontScale(16) : fontScale(13),
    fontWeight: '700',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: isTablet ? fontScale(12) : fontScale(10),
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: verticalScale(2),
  },
  
  // CTA Buttons
  ctaWrapper: {
    width: '100%',
    marginTop: verticalScale(40),
    alignItems: 'center',
    maxWidth: isTablet ? scale(500) : '100%',
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: isTablet ? verticalScale(75) : moderateScale(65),
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(15),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: isTablet ? fontScale(22) : fontScale(18),
    fontWeight: '700',
  },
  buttonCircle: {
    width: moderateScale(32),
    height: moderateScale(32),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    marginTop: verticalScale(20),
    padding: moderateScale(10),
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: fontScale(15),
  },
  versionLabel: {
    marginTop: verticalScale(30),
    fontSize: fontScale(12),
    color: COLORS.textLight,
    opacity: 0.6,
  },
});

export default styles;