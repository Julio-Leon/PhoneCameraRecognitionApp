import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function App() {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [permission, setPermission] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function getPermission() {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    }
    getPermission();
  }, []);

  const handleDetect = async () => {
    if (!camera.current) return;
    setDetecting(true);
    setResult(null);
    setPhotoUri(null);
    try {
      // Take a snapshot
      const photo = await camera.current.takePhoto({ quality: 80 });
      setPhotoUri(photo.path);

      // Prepare the image for upload
      const formData = new FormData();
      formData.append('image', {
        uri: photo.path,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      // Send to backend for detection
      const response = await fetch('http://<YOUR_BACKEND_URL>/detect', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (data && data.labels && data.labels.length > 0) {
        setResult('Detected: ' + data.labels.join(', '));
      } else {
        setResult('No object/animal detected');
      }
    } catch (err) {
      Alert.alert('Detection Error', err.message);
    } finally {
      setDetecting(false);
    }
  };

  if (permission === 'denied') {
    return <View style={styles.center}><Text>No camera permission</Text></View>;
  }

  if (device == null || permission !== 'authorized') return <View style={styles.center}><Text>Loading camera...</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={handleDetect} disabled={detecting}>
          <Text style={styles.buttonText}>{detecting ? 'Detecting...' : 'Detect Object/Animal'}</Text>
        </TouchableOpacity>
        {detecting && <ActivityIndicator color="#fff" style={{ marginTop: 10 }} />}
        {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}
        {result && <Text style={styles.result}>{result}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8,
  },
  preview: {
    width: 120,
    height: 120,
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
// ...existing code from Front-End/App.js will be copied here...
