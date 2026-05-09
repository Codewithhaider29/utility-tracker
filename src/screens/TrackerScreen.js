import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedRN, { FadeIn, FadeInDown, FadeInLeft } from 'react-native-reanimated';
import Header from '../components/Header';
import styles, { COLORS } from '../styles/TrackerStyles';

const TrackerScreen = ({
  month, setMonth,
  totalEirBill, setTotalEirBill,
  totalGasBill, setTotalGasBill,
  totalWaterBill, setTotalWaterBill,
  members, updateMember, removeMember,
  autoDivide, totals, formatCurrency,
  addMember, saveData, 
  history, switchMonth, createNewMonth, deleteMonth,
  onOpenMenu, logoImg
}) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isTablet = SCREEN_WIDTH >= 768;
  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;

  const totalMonthlyBills = (parseFloat(totalEirBill) || 0) + (parseFloat(totalGasBill) || 0) + (parseFloat(totalWaterBill) || 0);
  const paidMembers = members.filter(m => m.paid).length;
  const progressPercentage = members.length > 0 ? (paidMembers / members.length) * 100 : 0;

  // Dynamic column widths based on device and orientation
  const colWidths = {
    member: isTablet ? 180 : 130,
    bill: isTablet ? 100 : 75,
    status: isTablet ? 120 : 95,
    total: isTablet ? 110 : 85,
  };

  const tableTotalWidth = colWidths.member + (colWidths.bill * 3) + colWidths.status + colWidths.total + 40;
  const shouldScrollTable = tableTotalWidth > (SCREEN_WIDTH - 40);

  const historyKeys = Object.keys(history);

  return (
    <View style={styles.container}>
      <Header onOpenMenu={onOpenMenu} title="Bill Tracker" logoImg={logoImg} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={styles.mainScrollView} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* History / Month Switcher */}
          {historyKeys.length > 0 && (
            <View style={{ marginBottom: 15, paddingHorizontal: 15 }}>
              <Text style={[styles.cardTitle, { fontSize: 14, marginBottom: 10, color: COLORS.textLight }]}>
                Saved Months History
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {historyKeys.map((key) => (
                  <TouchableOpacity 
                    key={key} 
                    style={[
                      styles.monthPill, 
                      { marginRight: 10, backgroundColor: month === key ? COLORS.primary : COLORS.white, paddingHorizontal: 15 }
                    ]}
                    onPress={() => switchMonth(key)}
                  >
                    <Text style={[styles.monthText, { color: month === key ? COLORS.white : COLORS.primary }]}>
                      {key}
                    </Text>
                    {month !== key && (
                      <TouchableOpacity onPress={() => deleteMonth(key)} style={{ marginLeft: 8 }}>
                        <Text style={{ color: COLORS.danger, fontSize: 12 }}>✕</Text>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Dashboard Summary Card */}
          <AnimatedRN.View 
            entering={FadeInDown.delay(100).springify().damping(12)}
            style={[
              styles.dashboardCard,
              isLandscape && !isTablet && { marginTop: 10, marginBottom: 10 }
            ]}
          >
            <View style={styles.dashHeader}>
              <Text style={styles.dashboardTitle}>Monthly Overview</Text>
              <TouchableOpacity style={styles.monthPill} onPress={createNewMonth}>
                <Text style={styles.monthText}>{month || 'Tap to set Month'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{formatCurrency(totalMonthlyBills)}</Text>
                <Text style={styles.statLabel}>Total Due</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{paidMembers}/{members.length}</Text>
                <Text style={styles.statLabel}>Paid Status</Text>
              </View>
            </View>
            
            <View style={styles.progressSection}>
              <View style={styles.progressBarBg}>
                <Animated.View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}>
                  <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  />
                </Animated.View>
              </View>
              <Text style={styles.progressText}>{Math.round(progressPercentage)}% Collected</Text>
            </View>
          </AnimatedRN.View>

          {/* Bill Inputs Section */}
          <AnimatedRN.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.glassCard}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Bill Details</Text>
              <TouchableOpacity onPress={createNewMonth}>
                <Text style={styles.resetText}>+ New Month</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGrid}>
              <View style={styles.inputBox}>
                <Text style={styles.label}>📅 Period</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Oct 2023"
                  value={month}
                  onChangeText={setMonth}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.label}>⚡ Electric</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={totalEirBill}
                  onChangeText={setTotalEirBill}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.label}>🔥 Gas</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={totalGasBill}
                  onChangeText={setTotalGasBill}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.label}>💧 Water</Text>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="0.00"
                  value={totalWaterBill}
                  onChangeText={setTotalWaterBill}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.divideBtn} onPress={autoDivide}>
              <LinearGradient
                colors={[COLORS.primary, '#3046c4']}
                style={styles.fullBtnGradient}
              >
                <Text style={styles.btnText}>Auto Divide Bills</Text>
              </LinearGradient>
            </TouchableOpacity>
          </AnimatedRN.View>

          {/* Members Table */}
          <AnimatedRN.View 
            entering={FadeInDown.delay(300).duration(600)}
            style={[styles.glassCard, { paddingHorizontal: 10 }]}
          >
            <Text style={[styles.cardTitle, { marginBottom: 15, paddingHorizontal: 10 }]}>
              Member Breakdown
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              scrollEnabled={shouldScrollTable}
              contentContainerStyle={{
                minWidth: shouldScrollTable ? tableTotalWidth : '100%',
                paddingRight: shouldScrollTable ? 20 : 0
              }}
            >
              <View style={[styles.table, !shouldScrollTable && { width: '100%' }]}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.hCell, { width: colWidths.member }]}>Member</Text>
                  <Text style={[styles.hCell, { width: colWidths.bill }]}>Elec</Text>
                  <Text style={[styles.hCell, { width: colWidths.bill }]}>Gas</Text>
                  <Text style={[styles.hCell, { width: colWidths.bill }]}>Water</Text>
                  <Text style={[styles.hCell, { width: colWidths.status }]}>Status</Text>
                  <Text style={[styles.hCell, { width: colWidths.total }]}>Total</Text>
                </View>

                {members.map((item, index) => (
                  <AnimatedRN.View 
                    key={item.id}
                    entering={FadeInLeft.delay(400 + (index * 50)).duration(400)}
                    style={[styles.tableRow, item.paid && styles.paidRow]}
                  >
                    <TextInput
                      style={[styles.cell, { width: colWidths.member, fontWeight: '700' }]}
                      value={item.name}
                      onChangeText={(val) => updateMember(item.id, 'name', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: colWidths.bill }]}
                      keyboardType="numeric"
                      value={item.eir}
                      onChangeText={(val) => updateMember(item.id, 'eir', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: colWidths.bill }]}
                      keyboardType="numeric"
                      value={item.gas}
                      onChangeText={(val) => updateMember(item.id, 'gas', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: colWidths.bill }]}
                      keyboardType="numeric"
                      value={item.water}
                      onChangeText={(val) => updateMember(item.id, 'water', val)}
                    />
                    <TouchableOpacity 
                      style={[styles.statusTag, { 
                        backgroundColor: item.paid ? COLORS.success : COLORS.danger,
                        width: colWidths.status - 10
                      }]}
                      onPress={() => updateMember(item.id, 'paid', !item.paid)}
                    >
                      <Text style={styles.statusTagText}>
                        {item.paid ? 'PAID' : 'UNPAID'}
                      </Text>
                      {item.paid && item.paidAt && (
                        <Text style={{ color: COLORS.white, fontSize: 7, marginTop: 2, textAlign: 'center' }}>
                          {item.paidAt}
                        </Text>
                      )}
                    </TouchableOpacity>
                    <Text style={[styles.cell, { width: colWidths.total, fontWeight: 'bold' }]}>
                      {formatCurrency((parseFloat(item.eir) || 0) + (parseFloat(item.gas) || 0) + (parseFloat(item.water) || 0))}
                    </Text>
                    <TouchableOpacity onPress={() => removeMember(item.id)} style={styles.delBtn}>
                      <Text style={{color: COLORS.danger, fontWeight: 'bold'}}>✕</Text>
                    </TouchableOpacity>
                  </AnimatedRN.View>
                ))}
              </View>
            </ScrollView>
          </AnimatedRN.View>

          {/* Bottom Actions */}
          <View style={styles.footer}>
            <AnimatedRN.View entering={FadeIn.delay(500).springify()}>
              <TouchableOpacity style={styles.addMemberBtn} onPress={addMember}>
                <Text style={styles.addMemberText}>+ Add Member</Text>
              </TouchableOpacity>
            </AnimatedRN.View>
            
            <AnimatedRN.View 
              entering={FadeIn.delay(600).springify()}
              style={styles.rowActions}
            >
              <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
                <Text style={styles.saveBtnText}>Save Report</Text>
              </TouchableOpacity>
            </AnimatedRN.View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TrackerScreen;