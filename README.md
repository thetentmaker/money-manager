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

# 가게부 APP

로컬 DB 기반의 개인 가계부 앱입니다.

## 📱 프로젝트 개요

가계부 작성과 월별 분석 기능을 제공하는 모바일 앱입니다.

### 요구사항

| 홈                                                  | 수정                                                  | 추가                                               | 월간그래프                                             |
| --------------------------------------------------- | ----------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| <img src="./screenshot/req/home_1.png" width="200"> | <img src="./screenshot/req/update_1.png" width="200"> | <img src="./screenshot/req/add_1.png" width="200"> | <img src="./screenshot/req/monthly_1.png" width="200"> |

### 주요 기능

- 수입/지출 내역 등록 및 관리
- 월별 수입/지출 통계 및 차트 시각화
- 카메라를 통한 영수증 사진 첨부
- 달력 기반 일정 선택

### 화면

| 메인                       | 추가/수정 | 월별통계 | 카메라 |
|--------------------------|-------|------|-----|
| <img src="./screenshot/home_2.jpg" width="200"/> |<img src="./screenshot/addupdate_2.jpg" width="200"/>|<img src="./screenshot/monthlyaverage.jpg" width="200"/>|<img src="./screenshot/camera_1.jpg" width="200"/>|

## 🛠 기술 스택

- **Framework**: React Native 0.81.4
- **Language**: TypeScript 5.8.3
- **Navigation**: React Navigation 7.1.17
- **Database**: SQLite (react-native-sqlite-storage)
    - 거래 내역 저장
    - 사진 경로 저장
    - 오프라인에서도 동작

- **Charts**: React Native Chart Kit
- **Camera**: React Native Vision Camera 4.7.2
- **Camera Roll**: React Native Camera Roll 7.10.2
- **Icons**: React Native Vector Icons 10.3.0

## 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
├── designsystem/        # 디자인 시스템 컴포넌트
├── data/               # 데이터 모델
├── hooks/              # 커스텀 훅
├── navigations/        # 네비게이션 설정
├── screens/            # 화면 컴포넌트
│   ├── main/           # 메인 화면
│   ├── monthly/        # 월별 통계 화면
│   ├── addUpdate/      # 추가/수정 화면
│   ├── detail/         # 상세 화면
│   ├── takePhoto/      # 사진 촬영 화면
│   └── calendarSelect/ # 날짜 선택 화면
└── utils/              # 유틸리티 함수
```

## 주요 화면

1. **메인 화면** (`MainScreen`)
    - 최근 거래 내역 목록
    - 총 수입/지출 요약
    - |<img src="./screenshot/home_2.jpg" width="250" />|

```ts
const useMain = () => {
    const {getList, getMonthlyAverage} = useAccountBookHistoryDb();
    const [list, setList] = useState<AccountBookHistory[]>([]);
    const [average, setAverage] = useState<{ month: number; data: number[] }[]>(
        [],
    );
    const fetchList = useCallback(async () => {
        setList(await getList());
        const monthlyAverage = await getMonthlyAverage();
        setAverage(monthlyAverage);
    }, [getList, getMonthlyAverage]);

    useFocusEffect(
        useCallback(() => {
            fetchList();
        }, [fetchList]),
    );
...
}
```

2. **추가/수정 화면** (`AddUpdateScreen`)

    - 거래 내역 입력/수정
    - 사진 첨부 기능

   |<img src="./screenshot/addupdate_2.jpg" width="250"/>|

   ```ts
     const { insertItem, updateItem } = useAccountBookHistoryDb();
     const navigation = useRootNavigation<'Add' | 'Update'>();
     const route = useRootRoute<'Add' | 'Update'>();
     const [item, setItem] = useState<AccountBookHistory>(
       route.params?.item ??
         ({
           type: '사용',
           price: 0,
           comment: '',
           date: 0,
           createdAt: 0,
           updatedAt: 0,
           photoUrl: null,
         } as AccountBookHistory),
     );

     const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
       type => {
        ...
         setItem(prevState => ({ ...prevState, type }));
       },
       [route.name],
     );

     const onPressSave = useCallback(() => {
       console.log('onPressSave item:', item);
       if (route.name === 'Add') {
         insertItem(item)
           .then(() => {
             navigation.goBack();
           })
           .catch(error => {
             Alert.alert('저장 실패', error.message, [
               {
                 text: '확인',
                 onPress: () => {},
               },
             ]);
           });
       } else if (route.name === 'Update') {
         updateItem(item)
           .then(() => {
             route.params?.onChangeData(item);
             navigation.goBack();
           })
           .catch(error => {
             Alert.alert('수정 실패', error.message, [
               {
                 text: '확인',
                 onPress: () => {},
               },
             ]);
           });
       }
     }, [insertItem, item, route.name, navigation, updateItem, route.params]);

     const incomeColorStyle = useMemo(() => {
       return item.type === '수입'
         ? {
             backgroundColor: 'black',
             borderColor: 'black',
           }
         : {
             backgroundColor: 'white',
             borderColor: 'gray',
           };
     }, [item.type]);

   ```

3. **월별 통계 화면** (`MonthlyScreen`)

    - 월별 수입/지출 차트
    - 상세 거래 내역

   |<img src="./screenshot/monthlyaverage.jpg" width="250" />

   ```ts
   const useMonthly = () => {
    ...
     const [average, setAverage] = useState<{ month: number; data: number[] }[]>(
      [],
    );
    const { getMonthlyAverage } = useAccountBookHistoryDb();
    const getAverage = useCallback(async () => {
       setAverage(await getMonthlyAverage());
     }, [getMonthlyAverage]);

     useEffect(() => {
       getAverage();
    }, [getAverage]);
   ...
   }

   ```

    - useAccountBookHistoryDb

   ```ts
   const useAccountBookHistoryDb = () => {
     ...
     const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {...} )

     const insertItem = useCallback(async ( item: Omit<AccountBookHistory, 'id'>): Promise<AccountBookHistory> => {...}

     const updateItem = useCallback( async (item: AccountBookHistory): Promise<AccountBookHistory> => {...}

        * // 반환값: [
        * //   { month: 0, data: [100000, 200000] }, // 1월: 사용 10만원, 수입 20만원
        * //   { month: 1, data: [150000, 180000] }, // 2월: 사용 15만원, 수입 18만원
        * //   { month: 2, data: [80000, 220000] }   // 3월: 사용 8만원, 수입 22만원 (3월 1일~15일까지)
        * // ]
     const getMonthlyAverage = useCallback<
         () => Promise<MonthlyAverage[]>
       >(async (): Promise<MonthlyAverage}[]> => {...}
     ...
   }
   ```

4. **사진 촬영 화면** (`TakePhotoScreen`)

    - 영수증 사진 촬영
    - 갤러리에서 선택

   |<img src="./screenshot/camera_1.jpg" width="250"/>|

   ```ts
   const useTakePhoto = () => {
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
   };
   ```

5. 달력 기반 일정 선택
    - 날짜 선택
      |<img src="./screenshot/calendar_1.jpg" width="250"/>|

      ```ts
      const onDayPress: (time: number) => {
          route.params.onSelectDay(time);
          navigation.goBack();
      }
      ```

## 기타

- SQLite 사용법 강의와는 달라 에러를 찾는데 예상 외로 많은 시간이 소요

    - AS-IS

    ```ts
      const db:SQLiteDatabase = await openDB();
      db.executeSql(...Query..)
    ```

    - TO-BE

    ```ts
      const db:SQLiteDatabase = await openDB();
      db.transaction(transaction => {
        transaction.executeSql(...Query..) 
      }
    ```

- 요구사항을 다 구현하지 않음(누락)
    - 삭제 기능
    - 월별 사용 데이터 하단 월별 금액

<br>
<br>
<br>

# 추가 학습
## useFocusEffect 와 useCallback 를 함께 사용하는 이유?

`useFocusEffect`는 의존성 배열을 받지 않고 콜백 함수 자체가 변경되었는지를 비교합니다. `useCallback`으로 감싸지 않으면 매 렌더링마다 새로운 함수가 생성되어 불필요한 재실행이 발생합니다.

```ts
const useMain = () => {
  const {getList, getMonthlyAverage} = useAccountBookHistoryDb();
  const [list, setList] = useState<AccountBookHistory[]>([]);

  // fetchList를 useCallback으로 메모이제이션
  const fetchList = useCallback(async () => {
    console.log("A")
    setList(await getList());
    const monthlyAverage = await getMonthlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMonthlyAverage]);

  //매 렌더링마다 새로운 함수가 생성되어 fetchList가 재실행됨
  useFocusEffect(() => {
    fetchList();
  });

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList])
  );
};
```
- useCallback() 을 사용하지 않으면 나타나는 현상
```
[1단계] 컴포넌트 렌더링
    ↓
[2단계] () => { fetchList(); } 함수가 생성
    ↓
[3단계] useFocusEffect가 "콜백 함수가 바뀌었네?" 감지
    ↓
[4단계] useFocusEffect가 새 콜백 실행
    ↓
[5단계] fetchList() 실행 → setList(), setAverage() 호출
    ↓
[6단계] 상태 변경 → 컴포넌트 리렌더링
    ↓
[다시 1단계로...] 무한 루프!

```
- useCallback() 을 사용했을 때
```
[1단계] 컴포넌트 렌더링 
  ↓
[2단계] useFocusEffect의 useCallback 실행 
  ↓
[3단계] fetchList 실행 
  ↓
[4단계] 상태 변경으로 렌더링 
  ↓
[5단계] fetchList가 바뀌지 않았으므로 useCallback이 실행되지 않음 
```



## useState의 초기값 설정할 때 useState 객체 생성을 피해야 하는 이유

- `({ ... })` 객체는 매 리렌더링마다 새로 생성되나요? -> 예, JS 표현식이라 매번 실행됨
- 그 객체가 상태 초기화에 다시 사용되나요? -> X 초기값을 무시하고 기본 상태 유지함
- 그래서 성능에 영향이 있나요? -> 보통은 미미함.

리렌더링이 다른 이유(setItem 이외)로 발생해도, 이 줄은 다시 평가되지만, useStates는 이미 초기화됐기 때문에, 이 결과를 무시됩니다. 즉, {...} 객체는 새로 만들어지긴 하지만 상태값에는 아무 영향 없음.

```ts
const useAddUpdate = () => {

  // 객체 리터럴이 매 렌더링마다 생성됨 (하지만 실제 성능 영향은 미미함)
  const [item, setItem] = useState<AccountBookHistory>(
    route.params?.item ?? {
      type: '사용',
      price: 0,
      comment: '',
      date: 0,
      createdAt: 0,
      updatedAt: 0,
      photoUrl: null,
    }
  );
};
```

개선버전 #1 (지연초기화)

```ts
const useAddUpdate = () => {
  const [item, setItem] = useState<AccountBookHistory>(() => {
    return (
      route.params?.item ?? {
        type: '사용',
        price: 0,
        comment: '',
        date: 0,
        createdAt: 0,
        updatedAt: 0,
        photoUrl: null,
      }
    );
	}
}
```

개선버전 #2(지연초기화)

```ts
const DEFAULT_ITEM: AccountBookHistory = {
  type: '사용',
  price: 0,
  comment: '',
  date: 0,
  createdAt: 0,
  updatedAt: 0,
  photoUrl: null,
};

const useAddUpdate = () => {
  const [item, setItem] = useState<AccountBookHistory>(() => {
    return route.params?.item ?? DEFAULT_ITEM
  });
};
```



## TypeScript의 Type vs Interface

### Type이란?

`type`은 TypeScript에서 **타입 별칭(Type Alias)**을 만드는 키워드입니다. 모든 종류의 타입에 이름을 붙일 수 있으며, 원시 타입, 유니온, 튜플, 함수 등 다양한 타입을 표현할 수 있습니다.

```ts
// 다양한 타입 표현 가능
type Name = string | null
type Age = number;
type Status = 'active' | 'inactive';
type Point = [number, number];
type Callback = (data: string) => void;
```

### Interface란?

`interface`는 TypeScript에서 **객체의 구조(shape)**를 정의하는 키워드입니다. 주로 객체 타입을 선언하는 데 사용되며, 클래스나 객체가 따라야 할 계약(contract)을 명시합니다.

```ts
// 객체 구조 정의
interface User {
  name: string;
  age: number;
  email: string;
}
```



### 주요 차이점

1. **확장 방식**
   ```ts
   // Interface - extends 키워드 사용
   interface User {
     name: string;
     age: number;
   }
   
   interface Admin extends User {
     role: string;
   }
   
   // Type - 교차 타입(&) 사용
   type User = {
     name: string;
     age: number;
   }
   
   type Admin = User & {
     role: string;
   }
   ```

2. **선언 병합**
	
	```ts
	// Interface - 같은 이름으로 여러 번 선언 가능 (자동 병합)
	interface User {
	  name: string;
	}
	
	interface User {
	  age: number;
	}
	// 결과: User는 { name: string; age: number; }
	
	// Type - 같은 이름으로 재선언 불가 (에러 발생)
	type User = {
	  name: string;
	}
	
	// type User = { age: number; } // ❌ 에러!
	```

3. **표현 가능한 타입의 범위**

	```ts
	// Type - 모든 타입 표현 가능
	type ID = string | number;                    // 유니온
	type Coordinates = [number, number];           // 튜플
	type Callback = (data: string) => void;        // 함수
	type Status = 'loading' | 'success' | 'error'; // 리터럴 유니온
	
	// Interface - 객체 형태만 표현 가능
	interface User {
	  id: string | number;  // 프로퍼티로는 유니온 사용 가능
	  name: string;
	}
	
	// interface Status = 'loading' | 'success'; // ❌ 불가능
	```

### 모범 사례 (Best Practices)

#### Interface를 사용하는 경우

```tsx
// Props

// ✅ 권장: Interface 사용
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

```ts
// 객체 형태의 데이터 모델

// ✅ API 응답 데이터
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

// ✅ 확장 가능한 설정 객체
interface AppConfig {
  apiUrl: string;
  timeout: number;
}

interface ProductionConfig extends AppConfig {
  analyticsEnabled: boolean;
  logLevel: string;
}
```

```ts
// 클래스 구현

// ✅ 클래스가 따라야 할 계약 정의
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
  
  error(message: string) {
    console.error(message);
  }
}
```

### Type을 사용하는 경우

```ts
// 유니온 타입

// ✅ 권장: Type 사용
type Status = 'loading' | 'success' | 'error';
type Theme = 'light' | 'dark';
type ID = string | number;
type Result = SuccessResult | ErrorResult;

// React Native 실제 사용 예
const [status, setStatus] = useState<Status>('loading');

type ButtonVariant = 'primary' | 'secondary' | 'outline';
```

```ts
// 함수 타입

// ✅ 콜백 함수 시그니처
type OnChangeText = (text: string) => void;
type AsyncFetcher = (id: string) => Promise<UserData>;
type Validator = (value: string) => boolean;

// React Native 실제 사용
const handleChange: OnChangeText = (text) => {
  console.log(text);
};
```

### 서로 바꿔 쓸 수 있는 경우

```ts
// 이 둘은 거의 동일하게 작동
interface UserInterface {
  name: string;
  age: number;
  email: string;
}

type UserType = {
  name: string;
  age: number;
  email: string;
}

// 둘 다 확장 가능
interface AdminInterface extends UserInterface {
  role: string;
}

type AdminType = UserType & {
  role: string;
}

// React 컴포넌트에서도 둘 다 사용 가능
const Component1: React.FC<UserInterface> = (props) => <View />;
const Component2: React.FC<UserType> = (props) => <View />;

// 함수 매개변수에서도 동일
function processUser(user: UserInterface) { }
function processUser(user: UserType) { }
```

### 팀 컨벤션 권장사항

1. **일관성이 최우선** - 팀에서 하나의 스타일 가이드를 정하고 일관되게 사용합니다
2. **기본은 Interface** - 객체 타입 정의는 `interface`로 시작합니다
3. **필요할 때 Type** - 유니온, 튜플, 함수 타입, 복잡한 조합이 필요할 때 `type`을 사용합니다
4. **확장성 고려** - 나중에 확장될 가능성이 있으면 `interface`를 선택합니다
5. **혼용 가능** - 두 가지를 적재적소에 혼용하는 것이 실무에서 일반적입니다



## setCount(count + 1) vs setCount(prevState => prevState + 1)

- setCount(count + 1): 직접 업데이트
  - **새로운 state 값을 직접 전달**하여 state를 교체하는 방식입니다. 현재 렌더링 시점에 캡처된 state 값을 사용하여 새로운 값을 계산하고, 그 **결과 값**을 setState에 전달합니다. 여러 번 호출 시 **마지막 값만 적용**되며, **함수 종료 후 재렌더링**됩니다.

```ts
// 직접 업데이트
setCount(count + 9);
setCount(count + 1);
// ↓ 함수 종료
// ↓ React 배치 처리 (마지막 값만)
// ↓ 재렌더링 (count = 1)
```

- setCount(prevState => prevState + 1): 함수형 업데이트
  - **함수(updater function)를 전달**하여 state를 업데이트하는 방식입니다. React가 해당 함수를 실행할 때 **가장 최신의 state 값**을 매개변수로 전달하며, 함수가 반환하는 값이 새로운 state가 됩니다. 여러 번 호출 시 **순차적으로 모두 적용**되며, **함수 종료 후 재렌더링**됩니다.

```ts
// 함수형 업데이트
setCount(prev => prev + 9);x
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// ↓ 함수 종료
// ↓ React 순차 실행 (0→9→1)
// ↓ 재렌더링 (count = 11)
```

### 테스트: 직접, 합수형 모두 렌더링 1회
```tsx
      <Button
        onPress={() => {
          // setCount(count + 1);
          // console.log('count:', count);
          // setCount(count + 1);
          // console.log('count:', count);
          // setCount(count + 1);
          // console.log('count:', count);
          // setCount(count + 1);
          // console.log('count:', count);
          // setCount(count + 1);
          // console.log('count:', count);
          // setCount(count + 1);
          // console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
          setCount(prevState => prevState + 1);
          console.log('count:', count);
    
        }}
      >
```

### 왜 이렇게 설계했나?

#### JavaScript의 특성 때문입니다:

- `setCount(count + 1)`은 호출 시점에 이미 값으로 평가됨
- React가 개입할 타이밍이 없음
- 함수로 전달하면 React가 실행 시점을 제어 가능

# TypeScript 슈퍼셋과 Type/Interface 혼용 원리

## 1. TypeScript는 JavaScript의 슈퍼셋

**슈퍼셋(Superset)**: 상위 집합. TypeScript는 JavaScript의 모든 기능을 포함하면서 추가 기능(타입 시스템)을 제공합니다.

````ts
// ✅ 모든 JavaScript 코드는 유효한 TypeScript 코드
const greeting = "Hello";
function add(a, b) {
  return a + b;
}

// ✅ TypeScript 추가 기능 (타입 어노테이션)
const greeting: string = "Hello";
function add(a: number, b: number): number {
  return a + b;
}
```

### 슈퍼셋 관계
```
┌─────────────────────────────────┐
│       TypeScript (슈퍼셋)        │
│  ┌───────────────────────────┐  │
│  │   JavaScript (서브셋)      │  │
│  │                           │  │
│  │  - 변수, 함수, 객체       │  │
│  │  - 프로토타입             │  │
│  │  - 클로저                 │  │
│  └───────────────────────────┘  │
│                                 │
│  + 타입 시스템                   │
│  + Interface                    │
│  + Type Alias                   │
│  + 제네릭                        │
│  + Enum                         │
└─────────────────────────────────┘
````

## 2. 구조적 타이핑 (Structural Typing)

TypeScript는 **구조적 타이핑**을 사용합니다. 이는 타입의 이름이 아닌 **구조(형태)**로 호환성을 판단합니다.

```ts
interface Person {
  name: string;
  age: number;
}

type User = {
  name: string;
  age: number;
}

// 이름은 다르지만 구조가 같으면 호환됨
const person: Person = { name: "John", age: 30 };
const user: User = person; // ✅ 가능
```

### 타입의 슈퍼셋/서브셋 관계

```ts
interface Animal {
  name: string;
}

interface Dog {
  name: string;
  breed: string;
}

// Dog는 Animal의 슈퍼셋 (더 많은 속성을 가짐)
// Animal은 Dog의 서브셋 (더 적은 속성을 가짐)

const dog: Dog = { name: "Buddy", breed: "Labrador" };
const animal: Animal = dog; // ✅ 슈퍼셋을 서브셋에 할당 가능

const animal2: Animal = { name: "Cat" };
const dog2: Dog = animal2; // ❌ 서브셋을 슈퍼셋에 할당 불가 (breed 없음)
```

## 3. Interface와 Type의 혼용 원리

### 3.1 컴파일러의 내부 동작

TypeScript 컴파일러는 `interface`와 `type`을 모두 동일한 **구조 표현**으로 변환합니다.

```ts
interface IUser {
  name: string;
}

type TUser = {
  name: string;
}

// 컴파일러 내부적으로는 둘 다 동일하게 처리:
// { name: string }
```

### 3.2 타입 호환성 검사 알고리즘

````ts
function greet(user: IUser) {
  console.log(user.name);
}

const myUser: TUser = { name: "Alice" };
greet(myUser); // ✅ 작동!
```

**컴파일러 검사 과정:**
```
1. greet 함수는 IUser 타입을 요구
2. myUser는 TUser 타입
3. 호환성 검사:
   - IUser 구조: { name: string }
   - TUser 구조: { name: string }
   - 구조가 동일 → ✅ 호환 가능
````

### 3.3 확장 시 혼용

```ts
// Interface 기반
interface BaseProps {
  id: number;
}

// Type으로 확장
type WithName = {
  name: string;
}

// Interface와 Type 혼용
type UserProps = BaseProps & WithName;
// 결과: { id: number; name: string; }

// Type을 Interface로 확장
interface AdminProps extends WithName {
  role: string;
}
// 결과: { name: string; role: string; }
```

## 4. React Native Props에서의 실전 활용

### 패턴 1: 기본 혼용

```tsx
interface CommonProps {
  testID?: string;
  accessible?: boolean;
}

type StyleProps = {
  backgroundColor?: string;
  padding?: number;
}

// 혼용하여 컴포넌트 Props 정의
type ButtonProps = CommonProps & StyleProps & {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      testID={props.testID}
      style={{ 
        backgroundColor: props.backgroundColor,
        padding: props.padding 
      }}
      onPress={props.onPress}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};
```

### 패턴 2: 제네릭과 혼용

```tsx
interface ListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

type User = {
  id: number;
  name: string;
}

// 구체화
type UserListProps = ListProps<User> & {
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ data, renderItem, onUserSelect }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onUserSelect(item)}>
          {renderItem(item)}
        </TouchableOpacity>
      )}
    />
  );
};
```

### 패턴 3: 조건부 Props

```tsx
interface BaseCardProps {
  title: string;
}

type CardWithImage = BaseCardProps & {
  type: 'image';
  imageUrl: string;
}

type CardWithIcon = BaseCardProps & {
  type: 'icon';
  iconName: string;
}

// 유니온 타입으로 조합
type CardProps = CardWithImage | CardWithIcon;

const Card: React.FC<CardProps> = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
      {props.type === 'image' && <Image source={{ uri: props.imageUrl }} />}
      {props.type === 'icon' && <Icon name={props.iconName} />}
    </View>
  );
};
```

## 5. 컴파일 후 동작

**중요: 타입 정보는 컴파일 후 완전히 제거됩니다.**

```ts
// TypeScript 코드
interface IUser {
  name: string;
}

type TUser = {
  name: string;
}

function greet(user: IUser): void {
  console.log(user.name);
}

const myUser: TUser = { name: "Alice" };
greet(myUser);
```

## 6. Interface vs Type 선택 가이드

| 상황            | 권장      | 이유                          |
| --------------- | --------- | ----------------------------- |
| React Props     | Interface | 확장 가능성, 선언 병합.       |
| 유니온/인터섹션 | Type      | Union, Intersection 지워.     |
| 유틸리티 타입   | Type      | Pick, Omit, Partial 등과 조합 |
| API 응답        | Interface | 확장 및 구현에 유리           |
| 함수 타입       | Type      | 간결한 문법                   |

```ts
// Props: Interface 선호
interface ButtonProps {
  title: string;
  onPress: () => void;
}

// 유니온: Type 사용
type Status = 'idle' | 'loading' | 'success' | 'error';

// 유틸리티: Type 사용
type PartialUser = Partial<User>;
type UserKeys = keyof User;

// API: Interface 선호
interface ApiResponse {
  data: any;
  status: number;
}
```

## 7. 핵심 정리

### TypeScript 슈퍼셋의 의미

- TypeScript는 JavaScript의 모든 기능 + 타입 시스템
- 모든 JavaScript 코드는 유효한 TypeScript 코드
- 타입 정보는 컴파일 시에만 존재, 런타임 비용 없음

### Interface와 Type 혼용 가능 이유

1. **구조적 타이핑**: 이름이 아닌 구조로 판단
2. **동일한 내부 표현**: 컴파일러가 둘을 동일하게 처리
3. **런타임 제거**: 컴파일 후 모두 사라지므로 성능 차이 없음
4. **타입 호환성**: 구조만 맞으면 자유롭게 조합 가능

### 실무 권장사항

- **일관성 유지**: 팀 내 컨벤션 통일
- **적재적소 활용**: 각 키워드의 장점 활용
- **과도한 복잡도 지양**: 단순하고 명확하게 작성
- **문서화**: 복잡한 타입은 주석으로 의도 설명

```tsx
// ✅ 좋은 예: 명확하고 간결
interface UserProps {
  name: string;
  email: string;
}

type UserWithId = UserProps & { id: number };

// ❌ 나쁜 예: 과도하게 복잡
type ComplexType = (BaseType & ExtendedType) | 
  (Partial<BaseType> & Required<Pick<ExtendedType, 'id'>>) &
  Omit<OtherType, keyof BaseType>;
```

------

**참고 자료**

- [TypeScript 공식 문서 - Type vs Interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [구조적 타이핑 설명](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)