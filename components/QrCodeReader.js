import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrCodeReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(data);
    handleRedirection(data);
  };

  const handleRedirection = (data) => {
    if (data.startsWith('http://') || data.startsWith('https://')) {
      // Redirecionar para uma URL
      Linking.openURL(data);
    } else {
      // Executar outra ação com base no conteúdo do QR Code
      alert(`Scanned QR code: ${data}`);
    }
  };

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
          <Button style={styles.btn_scan} title="Scan Again" color="#2F2E5F" onPress={handleScanAgain} />
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
    marginBottom:50,
  },
  qrText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  }, btn_scan: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
    borderRadius:20,
    backgroundColor:"#2F2E5F",
  }
});