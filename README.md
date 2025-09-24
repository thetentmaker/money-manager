## 추가학습
### 유틸리티 타입

#### Omit - 특정 속성 제외
```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 특정 속성 제외
type PublicUser = Omit<User, 'password'>;
// { id: number; name: string; email: string; }

type UserWithoutId = Omit<User, 'id' | 'password'>;
// { name: string; email: string; }
```

#### Pick - Omit의 반대
```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 특정 속성만 선택
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }
```
#### Partial - 모든 속성을 선택적으로
```ts
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string; }

// React Native에서 업데이트 함수에 유용
const updateUser = (updates: Partial<User>) => {
  // 일부 필드만 업데이트 가능
};
```
#### Required - 모든 속성을 필수로
```ts
interface OptionalProps {
  title?: string;
  subtitle?: string;
}

type RequiredProps = Required<OptionalProps>;
// { title: string; subtitle: string; }
```

#### Record - 키-값 쌍 타입 생성
```ts
  type UserRoles = Record<string, boolean>;
  const userRoles: UserRoles = {
    admin: true,
    user: true,
    guest: true,
  };

  type StatusMap = Record<'loading' | 'success' | 'error', string>;
  const statusMap: StatusMap = {
    loading: 'Loading...',
    success: 'Success!',
    error: 'false',
  };

```

#### React Native에서 실용적인 사용 예시
```ts
// 컴포넌트 Props 정의
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

// 1. 특정 props 제외하고 새 타입 생성
type SimpleButtonProps = Omit<ButtonProps, 'style' | 'testID'>;

// 2. 특정 props만 선택
type ButtonActions = Pick<ButtonProps, 'onPress' | 'disabled'>;

// 3. 모든 props를 선택적으로 (기본값 제공용)
type ButtonDefaults = Partial<ButtonProps>;

// 4. API 응답과 폼 데이터 구분
interface ApiUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

type UserFormData = Omit<ApiUser, 'id' | 'createdAt'>;
// { name: string; email: string; }

type UserUpdate = Partial<UserFormData>;
// { name?: string; email?: string; }
```

#### 조합해서 사용하기
```ts
// 복합 유틸리티 타입 사용
interface FullScreenProps {
  navigation: any;
  route: any;
  title: string;
  showBackButton: boolean;
  headerStyle?: ViewStyle;
}

// navigation, route 제외하고 나머지는 선택적으로
type ScreenConfigProps = Partial<Omit<FullScreenProps, 'navigation' | 'route'>>;

// 또는 Pick + Partial 조합
type HeaderProps = Partial<Pick<FullScreenProps, 'title' | 'showBackButton' | 'headerStyle'>>;

// Required + Omit 조합
type RequiredUserData = Required<Omit<ApiUser, 'id'>>;
// { name: string; email: string; createdAt: string; } - 모두 필수
```

#### 실제 React Native 컴포넌트에서 활용
```ts
// TextInput 확장 예시
interface CustomInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label: string;
  onChangeText: (text: string, isValid: boolean) => void; // 파라미터 추가
}
// TouchableOpacity 확장 예시
interface CustomButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  title: string;
  onPress: () => Promise<void> | void;
  loading?: boolean;
}
```

### Bodoc 에서의 Thunk 예시
```ts
/**
   * 생체 인증 사용 여부 confirm 함수
   * @param type
   */
  const showConfirmBio = (type) => {
    const successFn = () => {
      dispatch(makeBioData());
      dispatch(userSetLock({ useBio: Toggle.ON }));
      dispatch(userSetLock({ useEasyPassword: Toggle.ON }));
      navigate(currentTab);
    };
    ...
  }
```
```ts
export const makeBioData =
  (reset = true) =>
  async (dispatch, getState) => {
    try {
      let keyExist = await keysExist();
      if (keyExist) {
        if (!reset) {
          dispatch({
            type: ACTION_TYPES.USER_BIO_DONE,
          });
          return;
        }

        let proHWDelete = deleteKeys();
        let proSEVERDelete = apiDeleteKey({});
        await Promise.all([proHWDelete, proSEVERDelete]);
      }
    } catch (e) {
      dispatch({
        type: ACTION_TYPES.USER_BIO_ERROR,
        error: ErrorCode.E_BIO_BAD_KEY,
      });
    }
    dispatch({
      type: ACTION_TYPES.USER_BIO_REQ,
    });
  }
```