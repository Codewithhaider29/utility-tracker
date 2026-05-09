import { StyleSheet } from 'react-native';

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
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    zIndex: 2,
    backgroundColor: COLORS.white,
  },
  shadowPulse: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.primary,
    opacity: 0.1,
    zIndex: 1,
  },
  footer: {
    alignItems: 'center',
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textLight,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default styles;
