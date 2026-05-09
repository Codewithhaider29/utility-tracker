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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import styles, { COLORS } from '../styles/TrackerStyles';

const TrackerScreen = ({
  month, setMonth,
  totalEirBill, setTotalEirBill,
  totalGasBill, setTotalGasBill,
  totalWaterBill, setTotalWaterBill,
  members, updateMember, removeMember,
  autoDivide, totals, formatCurrency,
  addMember, saveData, clearAllData,
  onOpenMenu, logoImg
}) => {

  const totalMonthlyBills = (parseFloat(totalEirBill) || 0) + (parseFloat(totalGasBill) || 0) + (parseFloat(totalWaterBill) || 0);
  const paidMembers = members.filter(m => m.paid).length;
  const progressPercentage = members.length > 0 ? (paidMembers / members.length) * 100 : 0;

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
          {/* Dashboard Summary Card */}
          <View style={styles.dashboardCard}>
            <View style={styles.dashHeader}>
              <Text style={styles.dashboardTitle}>Monthly Overview</Text>
              <View style={styles.monthPill}>
                <Text style={styles.monthText}>{month || 'Set Month'}</Text>
              </View>
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
          </View>

          {/* Bill Inputs Section */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Bill Details</Text>
              <TouchableOpacity onPress={clearAllData}>
                <Text style={styles.resetText}>Reset All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGrid}>
              <View style={styles.inputBox}>
                <Text style={styles.label}>📅 Period</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="01 October 2023"
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
          </View>

          {/* Members Table */}
          <View style={[styles.glassCard, { paddingHorizontal: 10 }]}>
            <Text style={[styles.cardTitle, { marginBottom: 15, paddingHorizontal: 10 }]}>Member Breakdown</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.hCell, { width: 120 }]}>Member</Text>
                  <Text style={[styles.hCell, { width: 70 }]}>Elec</Text>
                  <Text style={[styles.hCell, { width: 70 }]}>Gas</Text>
                  <Text style={[styles.hCell, { width: 70 }]}>Water</Text>
                  <Text style={[styles.hCell, { width: 90 }]}>Status</Text>
                  <Text style={[styles.hCell, { width: 80 }]}>Total</Text>
                </View>

                {members.map((item) => (
                  <View key={item.id} style={[styles.tableRow, item.paid && styles.paidRow]}>
                    <TextInput
                      style={[styles.cell, { width: 120, fontWeight: '700' }]}
                      value={item.name}
                      onChangeText={(val) => updateMember(item.id, 'name', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: 70 }]}
                      keyboardType="numeric"
                      value={item.eir}
                      onChangeText={(val) => updateMember(item.id, 'eir', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: 70 }]}
                      keyboardType="numeric"
                      value={item.gas}
                      onChangeText={(val) => updateMember(item.id, 'gas', val)}
                    />
                    <TextInput
                      style={[styles.cell, { width: 70 }]}
                      keyboardType="numeric"
                      value={item.water}
                      onChangeText={(val) => updateMember(item.id, 'water', val)}
                    />
                    <TouchableOpacity 
                      style={[styles.statusTag, { backgroundColor: item.paid ? COLORS.success : COLORS.danger }]}
                      onPress={() => updateMember(item.id, 'paid', !item.paid)}
                    >
                      <Text style={styles.statusTagText}>{item.paid ? 'PAID' : 'UNPAID'}</Text>
                      {item.paid && item.paidAt && (
                        <Text style={{ color: COLORS.white, fontSize: 7, marginTop: 2, textAlign: 'center' }}>
                          {item.paidAt}
                        </Text>
                      )}
                    </TouchableOpacity>
                    <Text style={[styles.cell, { width: 80, fontWeight: 'bold' }]}>
                      {formatCurrency((parseFloat(item.eir) || 0) + (parseFloat(item.gas) || 0) + (parseFloat(item.water) || 0))}
                    </Text>
                    <TouchableOpacity onPress={() => removeMember(item.id)} style={styles.delBtn}>
                      <Text style={{color: COLORS.danger, fontWeight: 'bold'}}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Bottom Actions */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.addMemberBtn} onPress={addMember}>
              <Text style={styles.addMemberText}>+ Add Member</Text>
            </TouchableOpacity>
            
            <View style={styles.rowActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveData}>
                <Text style={styles.saveBtnText}>Save Report</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TrackerScreen;