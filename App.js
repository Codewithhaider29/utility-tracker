import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Alert, View, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/components/LoadingScreen';
import SideMenu from './src/components/SideMenu';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TrackerScreen from './src/screens/TrackerScreen';
import ComingSoonScreen from './src/components/ComingSoonScreen';
import HistoryScreen from './src/components/HistoryScreen';

const STORAGE_KEY = '@UtilityTrackerData';
const CURRENT_VERSION = '1.0.0'; 
const UPDATE_CHECK_URL = 'https://your-server.com/version.json';
const logoImg = require('./assets/images/logo.png');

// Import Screens and Components


const App = () => {
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Month-wise History State
  const [history, setHistory] = useState({});
  const [selectedMonthKey, setSelectedMonthKey] = useState('');

  // Current Working Data
  const [month, setMonth] = useState('');
  const [totalEirBill, setTotalEirBill] = useState('');
  const [totalGasBill, setTotalGasBill] = useState('');
  const [totalWaterBill, setTotalWaterBill] = useState('');
  const [members, setMembers] = useState([
    { id: Date.now().toString(), name: 'Member 1', eir: '0', gas: '0', water: '0', paid: false, paidAt: null },
  ]);

  useEffect(() => {
    loadData();
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    if (UPDATE_CHECK_URL.includes('your-server.com')) return; // Don't check if it's still the placeholder
    
    try {
      const response = await fetch(UPDATE_CHECK_URL);
      const data = await response.json();
      if (data.latestVersion > CURRENT_VERSION) {
        Alert.alert(
          'New Update Available',
          `Version ${data.latestVersion} is out! Upgrade now to keep your ledger up to date.`,
          [
            { text: 'Maybe Later', style: 'cancel' },
            { text: 'Update Now', onPress: () => Linking.openURL(data.downloadUrl) }
          ]
        );
      }
    } catch (_e) {
      // Quiet fail to avoid annoying logs if server is down or URL is invalid
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        const hist = data.history || {};
        const lastKey = data.selectedMonthKey || Object.keys(hist)[0] || '';
        
        setHistory(hist);
        setSelectedMonthKey(lastKey);

        if (lastKey && hist[lastKey]) {
          const mData = hist[lastKey];
          setMonth(lastKey);
          setTotalEirBill(mData.totalEirBill || '');
          setTotalGasBill(mData.totalGasBill || '');
          setTotalWaterBill(mData.totalWaterBill || '');
          setMembers(mData.members || []);
        }
      }
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const saveData = async () => {
    if (!month.trim()) {
      Alert.alert('Error', 'Please set a Month name (e.g. October 2023) first.');
      return;
    }
    try {
      const currentMonthData = { totalEirBill, totalGasBill, totalWaterBill, members };
      const updatedHistory = { ...history, [month]: currentMonthData };
      
      const fullData = { 
        history: updatedHistory, 
        selectedMonthKey: month 
      };
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
      setHistory(updatedHistory);
      setSelectedMonthKey(month);
      Alert.alert('Success', `Data for ${month} saved successfully!`);
    } catch (_error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const switchMonth = (key) => {
    if (history[key]) {
      const mData = history[key];
      setSelectedMonthKey(key);
      setMonth(key);
      setTotalEirBill(mData.totalEirBill || '');
      setTotalGasBill(mData.totalGasBill || '');
      setTotalWaterBill(mData.totalWaterBill || '');
      setMembers(mData.members || []);
    }
  };

  const createNewMonth = () => {
    setMonth('');
    setTotalEirBill('');
    setTotalGasBill('');
    setTotalWaterBill('');
    // Keep members names but reset their bills/paid status
    setMembers(members.map(m => ({ ...m, eir: '0', gas: '0', water: '0', paid: false, paidAt: null })));
    setSelectedMonthKey('');
  };

  const deleteMonth = (key) => {
    Alert.alert('Delete Month', `Are you sure you want to delete ${key}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        const updatedHistory = { ...history };
        delete updatedHistory[key];
        setHistory(updatedHistory);
        if (selectedMonthKey === key) {
          createNewMonth();
        }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ history: updatedHistory, selectedMonthKey: '' }));
      }}
    ]);
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
    }
    ));
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
        {currentScreen === 'welcome' ? (
          <WelcomeScreen 
            logoImg={logoImg} 
            onGetStarted={() => setCurrentScreen('tracker')} 
            onOpenMenu={() => setMenuVisible(true)} 
          />
        ) : currentScreen === 'tracker' ? (
          <TrackerScreen 
            month={month} setMonth={setMonth}
            totalEirBill={totalEirBill} setTotalEirBill={setTotalEirBill}
            totalGasBill={totalGasBill} setTotalGasBill={setTotalGasBill}
            totalWaterBill={totalWaterBill} setTotalWaterBill={setTotalWaterBill}
            members={members} updateMember={updateMember} removeMember={removeMember}
            autoDivide={autoDivide} totals={calculateTotals()} formatCurrency={formatCurrency}
            addMember={addMember} saveData={saveData} 
            history={history} switchMonth={switchMonth} createNewMonth={createNewMonth} deleteMonth={deleteMonth}
            onOpenMenu={() => setMenuVisible(true)} logoImg={logoImg}
          />
        ) : currentScreen === 'history' ? (
          <HistoryScreen 
            history={history}
            onOpenMenu={() => setMenuVisible(true)}
            onSelectMonth={(key) => { switchMonth(key); setCurrentScreen('tracker'); }}
            onDeleteMonth={deleteMonth}
            logoImg={logoImg}
            formatCurrency={formatCurrency}
          />
        ) : (
          <ComingSoonScreen 
            title="Petrol"
            onOpenMenu={() => setMenuVisible(true)}
            onBack={() => setCurrentScreen('welcome')}
            logoImg={logoImg}
          />
        )}
        </View>
        {menuVisible && (
          <SideMenu 
            setVisible={setMenuVisible} 
            setCurrentScreen={setCurrentScreen} 
            currentScreen={currentScreen}
            logoImg={logoImg} 
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f4f7f6', 
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    width: '100%', 
    maxWidth: 900, // Increased for better Tablet/Web experience
    backgroundColor: '#f8faff',
    alignSelf: 'center', // Ensure it stays centered
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
});

export default App;
