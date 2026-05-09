import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

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
    zIndex: 1000,
    flexDirection: 'row',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  menuContent: {
    width: width * 0.75,
    backgroundColor: COLORS.white,
    height: '100%',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  closeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuProfileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoRing: {
    padding: 5,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 50,
    marginBottom: 15,
  },
  menuLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  menuBrandName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  menuTagline: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  itemsWrapper: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 15,
  },
  activeMenuItem: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  activeMenuText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  menuFooter: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
});

export default styles;
