import { StyleSheet, Platform } from 'react-native';
import { moderateScale, verticalScale, fontScale, isTablet, isLargeDevice, isSmallDevice } from '../../utils/responsive';

export const COLORS = {
  primary: '#4361ee', 
  secondary: '#4cc9f0',
  success: '#00b894',
  danger: '#ff4d6d',
  background: '#f8faff',
  textDark: '#1e293b', 
  textLight: '#64748b',
  white: '#ffffff',
  border: '#e2e8f0',
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  mainScrollView: { 
    flex: 1 
  },
  
  // Dashboard Card
  dashboardCard: {
    backgroundColor: COLORS.white,
    margin: moderateScale(16),
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: { 
        shadowColor: COLORS.primary, 
        shadowOffset: { width: 0, height: verticalScale(10) }, 
        shadowOpacity: 0.1, 
        shadowRadius: moderateScale(20) 
      },
      android: { 
        elevation: 5 
      },
    }),
  },
  dashHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: verticalScale(20) 
  },
  dashboardTitle: { 
    fontSize: isLargeDevice ? fontScale(22) : fontScale(18), 
    fontWeight: '800', 
    color: COLORS.textDark 
  },
  monthPill: { 
    backgroundColor: '#eef2ff', 
    paddingHorizontal: moderateScale(12), 
    paddingVertical: moderateScale(6), 
    borderRadius: moderateScale(12) 
  },
  monthText: { 
    color: COLORS.primary, 
    fontWeight: '700', 
    fontSize: fontScale(12) 
  },
  statsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    marginBottom: verticalScale(20) 
  },
  statItem: { 
    alignItems: 'center' 
  },
  statValue: { 
    fontSize: isLargeDevice ? fontScale(30) : fontScale(24), 
    fontWeight: '900', 
    color: COLORS.primary 
  },
  statLabel: { 
    fontSize: fontScale(11), 
    color: COLORS.textLight, 
    textTransform: 'uppercase', 
    marginTop: verticalScale(4), 
    letterSpacing: 1 
  },
  statDivider: { 
    width: 1, 
    height: verticalScale(30), 
    backgroundColor: COLORS.border 
  },
  
  // Progress Section
  progressSection: { 
    alignItems: 'center' 
  },
  progressBarBg: { 
    width: '100%', 
    height: moderateScale(10), 
    backgroundColor: '#f1f5f9', 
    borderRadius: moderateScale(5), 
    overflow: 'hidden', 
    marginBottom: verticalScale(8) 
  },
  progressBarFill: { 
    height: '100%', 
    borderRadius: moderateScale(5) 
  },
  progressText: { 
    fontSize: fontScale(12), 
    fontWeight: '600', 
    color: COLORS.textLight 
  },

  // Glass Card
  glassCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: moderateScale(16),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: verticalScale(15) 
  },
  cardTitle: { 
    fontSize: isLargeDevice ? fontScale(20) : fontScale(16), 
    fontWeight: '700', 
    color: COLORS.textDark 
  },
  resetText: { 
    color: COLORS.danger, 
    fontWeight: '600', 
    fontSize: fontScale(13) 
  },
  inputGrid: { 
    flexDirection: isLargeDevice ? 'row' : 'row',
    flexWrap: 'wrap', 
    gap: moderateScale(12), 
    marginBottom: verticalScale(20),
    justifyContent: 'space-between'
  },
  inputBox: { 
    flexBasis: isTablet ? '45%' : isSmallDevice ? 140 : 200,
    flexGrow: 1, 
    minWidth: moderateScale(140),
  },
  label: { 
    fontSize: fontScale(13), 
    fontWeight: '700', 
    color: COLORS.textLight, 
    marginBottom: verticalScale(8) 
  },
  textInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    fontSize: fontScale(15),
    color: COLORS.textDark,
  },
  divideBtn: { 
    borderRadius: moderateScale(16), 
    overflow: 'hidden',
    marginTop: verticalScale(5),
  },
  fullBtnGradient: { 
    padding: moderateScale(16), 
    alignItems: 'center' 
  },
  btnText: { 
    color: COLORS.white, 
    fontWeight: '700', 
    fontSize: fontScale(16) 
  },

  // Table Styles
  table: { 
    marginTop: verticalScale(5) 
  },
  tableHeader: { 
    flexDirection: 'row', 
    paddingBottom: verticalScale(10), 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border 
  },
  hCell: { 
    fontSize: fontScale(11), 
    fontWeight: '800', 
    color: COLORS.textLight, 
    textTransform: 'uppercase' 
  },
  tableRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: moderateScale(12), 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9' 
  },
  paidRow: { 
    backgroundColor: '#f0fff4' 
  },
  cell: { 
    fontSize: fontScale(14), 
    color: COLORS.textDark 
  },
  statusTag: { 
    width: moderateScale(80), 
    paddingVertical: moderateScale(6), 
    borderRadius: moderateScale(10), 
    alignItems: 'center', 
    marginRight: moderateScale(10) 
  },
  statusTagText: { 
    color: COLORS.white, 
    fontSize: fontScale(10), 
    fontWeight: '800' 
  },
  delBtn: { 
    width: moderateScale(30), 
    height: moderateScale(30), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  // Footer Actions
  footer: { 
    paddingHorizontal: moderateScale(16), 
    gap: moderateScale(12) 
  },
  addMemberBtn: { 
    borderWidth: moderateScale(2), 
    borderColor: COLORS.primary, 
    borderStyle: 'dashed', 
    padding: moderateScale(16), 
    borderRadius: moderateScale(16), 
    alignItems: 'center' 
  },
  addMemberText: { 
    color: COLORS.primary, 
    fontWeight: '700',
    fontSize: fontScale(15),
  },
  rowActions: {
    flexDirection: isLargeDevice ? 'row' : 'column',
    gap: moderateScale(12),
  },
  saveBtn: { 
    backgroundColor: COLORS.primary, 
    padding: moderateScale(18), 
    borderRadius: moderateScale(16), 
    alignItems: 'center', 
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  saveBtnText: { 
    color: COLORS.white, 
    fontWeight: '700', 
    fontSize: fontScale(16) 
  },
});

export default styles;