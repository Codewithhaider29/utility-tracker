import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AnimatedRN, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import Header from './Header';
import { COLORS } from '../styles/TrackerStyles';
import { fontScale, moderateScale, verticalScale } from '../../utils/responsive';

const HistoryScreen = ({ history, onOpenMenu, onSelectMonth, onDeleteMonth, logoImg, formatCurrency }) => {
  const historyKeys = Object.keys(history).sort((a, b) => b.localeCompare(a));

  return (
    <View style={styles.container}>
      <Header onOpenMenu={onOpenMenu} title="Billing History" logoImg={logoImg} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedRN.View entering={FadeInDown.duration(600)} style={styles.infoBox}>
          <Text style={styles.infoText}>
            You have {historyKeys.length} records saved in your ledger.
          </Text>
        </AnimatedRN.View>

        {historyKeys.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📂</Text>
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptySubtitle}>
              Save your first monthly report to see it listed here.
            </Text>
          </View>
        ) : (
          historyKeys.map((key, index) => {
            const data = history[key];
            const total = (parseFloat(data.totalEirBill) || 0) + (parseFloat(data.totalGasBill) || 0) + (parseFloat(data.totalWaterBill) || 0);
            const paidCount = data.members ? data.members.filter(m => m.paid).length : 0;
            const totalCount = data.members ? data.members.length : 0;

            return (
              <AnimatedRN.View 
                key={key}
                entering={FadeInRight.delay(index * 100).duration(500)}
              >
                <TouchableOpacity 
                  style={styles.historyCard}
                  onPress={() => onSelectMonth(key)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cardMain}>
                    <View>
                      <Text style={styles.monthName}>{key}</Text>
                      <Text style={styles.statsText}>
                        {totalCount} Members • {paidCount} Paid
                      </Text>
                    </View>
                    <View style={styles.amountBox}>
                      <Text style={styles.amountLabel}>Total Bill</Text>
                      <Text style={styles.amountValue}>{formatCurrency(total)}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardFooter}>
                    <TouchableOpacity 
                      style={styles.actionBtn} 
                      onPress={() => onSelectMonth(key)}
                    >
                      <Text style={styles.viewText}>View Details →</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionBtn, styles.delBtn]} 
                      onPress={() => onDeleteMonth(key)}
                    >
                      <Text style={styles.delText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </AnimatedRN.View>
            );
          })
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faff',
  },
  scrollContent: {
    padding: moderateScale(20),
  },
  infoBox: {
    backgroundColor: '#e6f4fe',
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
    marginBottom: verticalScale(20),
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    color: '#1e40af',
    fontSize: fontScale(14),
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    marginBottom: verticalScale(15),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  monthName: {
    fontSize: fontScale(18),
    fontWeight: '800',
    color: '#1e293b',
  },
  statsText: {
    fontSize: fontScale(13),
    color: '#64748b',
    marginTop: verticalScale(4),
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: fontScale(10),
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountValue: {
    fontSize: fontScale(16),
    fontWeight: '700',
    color: COLORS.primary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: verticalScale(15),
  },
  actionBtn: {
    paddingVertical: moderateScale(5),
  },
  viewText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: fontScale(14),
  },
  delText: {
    color: COLORS.danger,
    fontWeight: '600',
    fontSize: fontScale(14),
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  emptyEmoji: {
    fontSize: fontScale(60),
    marginBottom: verticalScale(20),
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: fontScale(20),
    fontWeight: '700',
    color: '#475569',
  },
  emptySubtitle: {
    fontSize: fontScale(14),
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(40),
  },
});

export default HistoryScreen;
