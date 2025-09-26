import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../designsystem/Header';
import useAddUpdate from './useAddUpdate';
import Button from '../../designsystem/Button';
import Typography from '../../designsystem/Typography';
import Spacer from '../../designsystem/Spacer';
import SingleLineInput from '../../designsystem/SingleLineInput';
import Icon from '../../designsystem/Icons';
import MultiLineInput from '../../designsystem/MultiLineInput';

const AddUpdateScreen = () => {

  const {
    onPressType,
    onChangePrice,
    priceValue,
    commentValue,
    onChangeComment,
    onPressCalendar,
    onPressSave,
    onPressClose,
    ctaButtonName,
    usageColorStyle,
    incomeColorStyle,
    usageTextColor,
    incomeTextColor,
    calendarColorStyle,
    calendarDisplayText,
  } = useAddUpdate();

  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Add/Update screen</Header.Title>
        <Header.Icon name="close" onPress={onPressClose} />
      </Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <View style={styles.contentLeft}>
            <Button onPress={() => onPressType('사용')}>
              <View style={[usageColorStyle, styles.contentLeftButton]}>
                <Typography variant="body1" color={usageTextColor}>
                  사용
                </Typography>
              </View>
            </Button>
          </View>

          <View style={styles.contentRight}>
            <Button onPress={() => onPressType('수입')}>
              <View style={[incomeColorStyle, styles.contentRightButton]}>
                <Typography variant="body1" color={incomeTextColor}>
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
                style={[styles.inputContainerPriceButton, calendarColorStyle]}
              >
                <Typography variant={'body1'} color={'gray'}>
                  {calendarDisplayText}
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
          value={commentValue}
          onChangeText={onChangeComment}
          onSubmitEditing={() => {}}
        />
        <Spacer size={64} />
        <Button onPress={onPressSave}>
          <View style={styles.saveButton}>
            <Typography variant={'body1'} color={'white'}>
              {ctaButtonName}
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
  saveButton: {
    paddingVertical: 12,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
