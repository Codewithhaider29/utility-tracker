import { StyleSheet, Platform } from 'react-native';

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
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  orbContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.15,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.primary,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.secondary,
    bottom: 50,
    left: -80,
  },
  logoSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  glassCircle: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 1000,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: { elevation: 15 },
    }),
  },
  newBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    gap: 10,
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardEmoji: {
    fontSize: 22,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  cardDesc: {
    fontSize: 10,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 2,
  },
  ctaWrapper: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  mainButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  buttonCircle: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    marginTop: 20,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  versionLabel: {
    marginTop: 30,
    fontSize: 12,
    color: COLORS.textLight,
    opacity: 0.6,
  },
});

export default styles;
