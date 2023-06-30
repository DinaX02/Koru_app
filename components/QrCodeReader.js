import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

export default function QrCodeReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');
  const { userInfo } = useContext(AuthContext);
  const token = userInfo.token;
  const id_user = userInfo.id_user;
  const navigation = useNavigation();

  const fetchToken = () => {
    const tokenValues = qrData.tokens.map(token => token.value);
    const fetchPromises = tokenValues.map(tokenValue =>
        axios.post(
            `${BASE_URL}/qr/firstread`,
            {
              token: tokenValue,
            },
            {
              headers: {
                Authorization: token,
                id: id_user,
              },
            }
        )
    );

    Promise.all(fetchPromises)
        .then(results => {
          const tokenData = results.map(result => result.data);
          navigation.navigate('Join', {
            tokenInfo: tokenData,
            tokens: qrData.tokens,
          });
        })
        .catch(error => {
          console.log('error', error);
          Alert.alert('Warning', 'You cannot acquire any more of these coins.');
        });
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const qrDataObject = JSON.parse(data);
      setQrData(qrDataObject);
    } catch (error) {
      Alert.alert('Invalid QR Code', 'Please try again with a valid QR Code');
    }
  };

  useEffect(() => {
    if (qrData && qrData.tokens && qrData.tokens.length > 0) {
      fetchToken();
    }
  }, [qrData]);

  const handleScanAgain = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
      <View style={styles.container}>
        {scanned ? (
            <View>
              <Text style={styles.qrText}>QR Code Scanned!</Text>
              <Button
                  style={styles.btn_scan}
                  title="Scan Again"
                  color="#2F2E5F"
                  onPress={handleScanAgain}
              />
            </View>
        ) : (
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        )}
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  qrText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn_scan: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 20,
    backgroundColor: '#2F2E5F',
  },
});
