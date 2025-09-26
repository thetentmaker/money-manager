import { useCameraPermission } from 'react-native-vision-camera';
import {
  useRootNavigation,
  useRootRoute,
} from '../../navigations/RootNavigation';
import { useCallback, useEffect, useRef } from 'react';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';

const useTakePhoto = () => {
  const navigation = useRootNavigation<'TakePhoto'>();
  const route = useRootRoute<'TakePhoto'>();
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back') as CameraDevice;
  const { hasPermission } = useCameraPermission();

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const onPressTakePhoto = useCallback(async () => {
    try {
      if (!cameraRef.current) return;
      const result = await cameraRef.current?.takePhoto();
      if (result) {
        const path = `${Platform.OS === 'android' ? 'file://' : ''}${
          result.path
        }`;
        const saveAssetResult = await CameraRoll.saveAsset(path, {
          type: 'photo',
          album: 'MoneyManager',
        });
        route.params?.onTakePhoto(saveAssetResult.node.image.uri);
        navigation.goBack();
      }
    } catch (error) {
      console.log('onPressTakePhoto error', error);
    }
  }, [cameraRef, route.params, navigation]);

  return {
    onPressTakePhoto,
    onPressClose: () => {
      navigation.goBack();
    },
    device,
    hasPermission,
    cameraRef,
  };
};

export default useTakePhoto;
