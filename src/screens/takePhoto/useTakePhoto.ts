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
  // Camera 컴포넌트를 제어하기 위한 ref
  const cameraRef = useRef<Camera>(null);
  // 디바이스에 연결된 모든 카메라 목록 가져오기
  const devices = useCameraDevices();
  // 후면 카메라를 찾아서 선택
  const device = devices.find(d => d.position === 'back') as CameraDevice;
  // 카메라 권한 확인
  const { hasPermission } = useCameraPermission();

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  // 사진 촬영 버튼 클릭 핸들러
  const onPressTakePhoto = () => takePhoto();

  const takePhoto = useCallback(async () => {
    try {
      // 카메라 ref가 없으면 종료
      if (!cameraRef.current) return;
      // 사진 촬영 실행
      const result = await cameraRef.current?.takePhoto();
      if (result) {
        // Android는 'file://' 접두사 필요, iOS는 불필요
        const path = `${Platform.OS === 'android' ? 'file://' : ''}${
          result.path
        }`;
        // 촬영한 사진을 디바이스 갤러리의 'MoneyManager' 앨범에 저장
        const saveAssetResult = await CameraRoll.saveAsset(path, {
          type: 'photo',
          album: 'MoneyManager',
        });
        // 저장된 사진의 URI를 콜백으로 전달
        route.params?.onTakePhoto(saveAssetResult.node.image.uri);
        // 사진 촬영 화면 닫기
        navigation.goBack();
      }
    } catch (error) {
      console.log('onPressTakePhoto error', error);
    }
  }, [route.params, navigation]);
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
