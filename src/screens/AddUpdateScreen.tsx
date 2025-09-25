import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../designsystem/Header';
import { useRootNavigation, useRootRoute } from '../navigations/RootNavigation';
import useAddUpdate from '../hooks/useAddUpdate';
import Button from '../designsystem/Button';
import AccountBookHistory from '../data/AccountBookHistory';
import Typography from '../designsystem/Typography';
import { useCallback, useState } from 'react';
import Spacer from '../designsystem/Spacer';
import SingleLineInput from '../designsystem/SingleLineInput';
import Icon from '../designsystem/Icons';
import { convertToDateString } from '../utils/DateUtils';
import MultiLineInput from '../designsystem/MultiLineInput';

const AddUpdateScreen = () => {
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const route = useRootRoute<'Add' | 'Update'>();
  const {} = useAddUpdate();
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
      if (route.name === 'Update') return;

      setItem(prevItem => ({ ...prevItem, type }));
    },
    [route.name],
  );

  const onChangePrice = useCallback<(text: string) => void>(text => {
    if (text === '') {
      setItem(prevItem => ({ ...prevItem, price: 0 }));
      return;
    }
    if (isNaN(parseInt(text, 10))) return;

    setItem(prevItem => ({
      ...prevItem,
      price: parseInt(text, 10),
    }));
  }, []);

  const priceValue = item.price === 0 ? '' : item.price.toString();

  const onChangeComment = useCallback<(text: string) => void>(text => {
    setItem(prevItem => ({ ...prevItem, comment: text }));
  }, []);

  const onPressCalendar = useCallback(() => {
    console.log('onPressCalendar');
  }, []);

  const onPressSave = useCallback(() => {
    console.log('onPressSave');
  }, []);

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Add/Update screen</Header.Title>
        <Header.Icon name="close" onPress={navigation.goBack} />
      </Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <View style={styles.contentLeft}>
            <Button onPress={() => onPressType('사용')}>
              <View
                style={[
                  item.type === '사용' ? styles.bgBlack : styles.bgWhite,
                  styles.contentLeftButton,
                ]}
              >
                <Typography
                  variant="body1"
                  color={item.type === '사용' ? 'white' : 'black'}
                >
                  사용
                </Typography>
              </View>
            </Button>
          </View>

          <View style={styles.contentRight}>
            <Button onPress={() => onPressType('수입')}>
              <View
                style={[
                  item.type === '수입' ? styles.bgBlack : styles.bgWhite,
                  styles.contentRightButton,
                ]}
              >
                <Typography
                  variant="body1"
                  color={item.type === '수입' ? 'white' : 'black'}
                >
                  수입
                </Typography>
              </View>
            </Button>
          </View>
        </View>
        <Spacer size={15} />
        <View style={styles.inputContainer}>
          <View style={styles.inputContainerPrice}>
            <SingleLineInput
              placeholder="금액을 입력해 주세요."
              value={priceValue.toString()}
              onChangeText={onChangePrice}
              keyboardType="number-pad"
            />
            <Spacer size={10} />
            <Button onPress={onPressCalendar}>
              <View
                style={[
                  item.date === 0 ? styles.lightGray : styles.gray,
                  styles.inputContainerPriceButton,
                ]}
              >
                <Typography
                  variant="body1"
                  color={'gray'}
                >
                  {item.date === 0
                    ? '날짜를 선택하세요'
                    : convertToDateString(item.date)}
                </Typography>
              </View>
            </Button>
          </View>
          <Spacer size={15} horizontal />
          <View>
            <Button onPress={() => {}}>
              <View style={styles.cameraButton}>
                <Icon name="plus" size={24} color="gray" />
              </View>
            </Button>
          </View>
        </View>
        <Spacer size={24} />
        <MultiLineInput
          placeholder="내용을 입력해 주세요."
          height={100}
          value={item.comment}
          onChangeText={onChangeComment}
          onSubmitEditing={() => {}}
        />
        <Spacer size={64} />
        <Button onPress={onPressSave}>
          <View style={styles.saveButton}>
            <Typography variant="body1" color={"white"}>
              {route.name === 'Add' ? "저장하기" : "수정하기"}
            </Typography>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
  },
  contentLeft: {
    flex: 1,
  },
  contentRight: {
    flex: 1,
  },
  contentLeftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    flex: 1,
  },
  contentRightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  bgBlack: {
    backgroundColor: 'black',
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputContainerPrice: {
    flex: 1,
  },
  cameraButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerPriceButton: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  lightGray: {
    borderColor: 'lightgray',
  },
  gray: {
    borderColor: 'gray',
  },
  saveButton: {
    paddingVertical: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
