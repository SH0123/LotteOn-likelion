import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask'

export default function FavoritesScreen() {
  const [barcode, setBarcode] = React.useState("");
  const onBarcodeRead = (scanResult) => {
    setBarcode(scanResult.data)
  }
  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={this.onBarCodeRead}
      // ... other related props of RNCamera
      >
        <BarcodeMask
          width={100} height={300} showAnimatedLine={false} outerMaskOpacity={0.8}
        />
      </RNCamera>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});