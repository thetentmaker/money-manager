import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import Button from '../../designsystem/Button';
import useTakePhoto from './useTakePhoto';
import Typography from '../../designsystem/Typography';
import Header from '../../designsystem/Header';

const TakePhotoScreen = () => {
  const { onPressTakePhoto, hasPermission, device, cameraRef, onPressClose } =
    useTakePhoto();
  if (!hasPermission)
    return <Typography>Camera permission not granted</Typography>;
  if (device == null) return <Typography>No camera device</Typography>;

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>TakePhotoScreen</Header.Title>
        <Header.Icon name="close" onPress={onPressClose} />
      </Header>
      <View style={styles.flex1}>
        <View style={styles.flex2}>
          <Camera
            ref={cameraRef}
            style={styles.flex1}
            device={device}
            isActive={true}
            photo
          />
        </View>
        <View style={styles.takePhotoButtonContainer}>
          <Button onPress={onPressTakePhoto}>
            <View style={styles.cameraButton}>
              <View style={styles.cameraButtonInner} />
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TakePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  takePhotoButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButtonInner: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
