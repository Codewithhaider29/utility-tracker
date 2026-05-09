import { StyleSheet, Platform } from 'react-native';

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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    paddingBottom: 15,
    zIndex: 100,
    backgroundColor: COLORS.background,
  },
  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoFrame: {
    // No background or padding needed
  },
  headerLogo: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.5,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuIconWrapper: {
    gap: 4,
  },
  hamburgerLine: {
    width: 18,
    height: 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  menuText: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;
