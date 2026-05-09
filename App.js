import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Screens and Components
import LoadingScreen from './src/components/LoadingScreen';
import SideMenu from './src/components/SideMenu';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TrackerScreen from './src/screens/TrackerScreen';

const STORAGE_KEY = '@UtilityTrackerData';
const logoImg = require('./assets/images/logo.png');

const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [menuVisible, setMenuVisible] = useState(false);
  const [month, setMonth] = useState('');
  const [totalEirBill, setTotalEirBill] = useState('');
  const [totalGasBill, setTotalGasBill] = useState('');
  const [totalWaterBill, setTotalWaterBill] = useState('');
  const [members, setMembers] = useState([
    { id: Date.now().toString(), name: 'Member 1', eir: '0', gas: '0', water: '0', paid: false, paidAt: null },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        setMonth(data.month || '');
        setTotalEirBill(data.totalEirBill || '');
        setTotalGasBill(data.totalGasBill || '');
        setTotalWaterBill(data.totalWaterBill || '');
        setMembers(data.members || []);
      }
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const saveData = async () => {
    try {
      const data = { month, totalEirBill, totalGasBill, totalWaterBill, members };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      Alert.alert('Success', 'Data saved successfully!');
    } catch (_error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const clearAllData = () => {
    Alert.alert(
      'Confirm Clear',
      'Are you sure you want to clear all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            setMonth('');
            setTotalEirBill('');
            setTotalGasBill('');
            setTotalWaterBill('');
            setMembers([{ id: Date.now().toString(), name: 'Member 1', eir: '0', gas: '0', water: '0', paid: false, paidAt: null }]);
            await AsyncStorage.removeItem(STORAGE_KEY);
          },
        },
      ]
    );
  };

  const addMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: `Member ${members.length + 1}`,
      eir: '0', gas: '0', water: '0', paid: false, paidAt: null,
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (id) => {
    if (members.length === 1) return;
    setMembers(members.filter(m => m.id !== id));
  };

  const autoDivide = () => {
    const count = members.length;
    if (count === 0) return;
    const eirPerPerson = (parseFloat(totalEirBill) || 0) / count;
    const gasPerPerson = (parseFloat(totalGasBill) || 0) / count;
    const waterPerPerson = (parseFloat(totalWaterBill) || 0) / count;
    const updatedMembers = members.map(m => ({
      ...m,
      eir: Math.round(eirPerPerson).toString(),
      gas: Math.round(gasPerPerson).toString(),
      water: Math.round(waterPerPerson).toString(),
    }));
    setMembers(updatedMembers);
  };

  const updateMember = (id, field, value) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const updatedMember = { ...m, [field]: value };
        if (field === 'paid' && value === true) {
          const now = new Date();
          updatedMember.paidAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (field === 'paid' && value === false) {
          updatedMember.paidAt = null;
        }
        return updatedMember;
      }
      return m;
    }));
  };

  const calculateTotals = () => {
    let eirTotal = 0, gasTotal = 0, waterTotal = 0, grandTotal = 0;
    members.forEach(m => {
      const e = parseFloat(m.eir) || 0, g = parseFloat(m.gas) || 0, w = parseFloat(m.water) || 0;
      eirTotal += e; gasTotal += g; waterTotal += w;
      grandTotal += (e + g + w);
    });
    return { eirTotal, gasTotal, waterTotal, grandTotal };
  };

  const formatCurrency = (val) => `PKR ${Math.round(parseFloat(val || 0))}`;

  if (loading) return <LoadingScreen logoImg={logoImg} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SideMenu 
        visible={menuVisible} 
        setVisible={setMenuVisible} 
        setCurrentScreen={setCurrentScreen} 
        logoImg={logoImg} 
      />
      
      {currentScreen === 'welcome' ? (
        <WelcomeScreen 
          logoImg={logoImg} 
          onGetStarted={() => setCurrentScreen('tracker')} 
          onOpenMenu={() => setMenuVisible(true)} 
        />
      ) : (
        <TrackerScreen 
          month={month} setMonth={setMonth}
          totalEirBill={totalEirBill} setTotalEirBill={setTotalEirBill}
          totalGasBill={totalGasBill} setTotalGasBill={setTotalGasBill}
          totalWaterBill={totalWaterBill} setTotalWaterBill={setTotalWaterBill}
          members={members} updateMember={updateMember} removeMember={removeMember}
          autoDivide={autoDivide} totals={calculateTotals()} formatCurrency={formatCurrency}
          addMember={addMember} saveData={saveData} clearAllData={clearAllData}
          onOpenMenu={() => setMenuVisible(true)} logoImg={logoImg}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
});

export default App;
