import { StyleSheet, Platform } from 'react-native';

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
  container: { flex: 1, backgroundColor: COLORS.background },
  mainScrollView: { flex: 1 },
  
  dashboardCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...Platform.select({
      ios: { shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 5 },
    }),
  },
  dashHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  dashboardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
  monthPill: { backgroundColor: '#eef2ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  monthText: { color: COLORS.primary, fontWeight: '700', fontSize: 12 },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textLight, textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
  statDivider: { width: 1, height: 30, backgroundColor: COLORS.border },
  
  progressSection: { alignItems: 'center' },
  progressBarBg: { width: '100%', height: 10, backgroundColor: '#f1f5f9', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', borderRadius: 5 },
  progressText: { fontSize: 12, fontWeight: '600', color: COLORS.textLight },

  glassCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  resetText: { color: COLORS.danger, fontWeight: '600', fontSize: 13 },
  inputGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  inputBox: { flex: 1, minWidth: '45%' },
  label: { fontSize: 12, fontWeight: '700', color: COLORS.textLight, marginBottom: 6 },
  textInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: COLORS.textDark,
  },
  divideBtn: { borderRadius: 16, overflow: 'hidden' },
  fullBtnGradient: { padding: 16, alignItems: 'center' },
  btnText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },

  table: { marginTop: 5 },
  tableHeader: { flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  hCell: { fontSize: 11, fontWeight: '800', color: COLORS.textLight, textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  paidRow: { backgroundColor: '#f0fff4' },
  cell: { fontSize: 14, color: COLORS.textDark },
  statusTag: { width: 80, paddingVertical: 6, borderRadius: 10, alignItems: 'center', marginRight: 10 },
  statusTagText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  delBtn: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },

  footer: { paddingHorizontal: 16, gap: 12 },
  addMemberBtn: { 
    borderWidth: 2, 
    borderColor: COLORS.primary, 
    borderStyle: 'dashed', 
    padding: 16, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  addMemberText: { color: COLORS.primary, fontWeight: '700' },
  saveBtn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', width: '100%' },
  saveBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
});

export default styles;
