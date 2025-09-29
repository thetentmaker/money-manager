import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../designsystem/Header';
import { useRootNavigation } from '../../navigations/RootNavigation';
import Typography from '../../designsystem/Typography';
import Spacer from '../../designsystem/Spacer';
import RemoteImage from '../../designsystem/RemoteImage';
import Button from '../../designsystem/Button';
import useDetail from './useDetail';

const DetailScreen = () => {
  const navigation = useRootNavigation<'Detail'>();
  const {
    usageColorStyle,
    incomeColorStyle,
    usageTextColor,
    incomeTextColor,
    photoUrl,
    calendarDisplayText,
    calendarColorStyle,
    ctaButtonName,
    onPressUpdate,
    displayPrice,
    displayComment,
  } = useDetail();
  return (
    <View style={styles.container}>
      <Header>
        <Header.Title>Detail screen</Header.Title>
        <Header.Icon name="close" onPress={navigation.goBack} />
      </Header>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <View style={styles.contentLeft}>
            <View style={[usageColorStyle, styles.contentLeftButton]}>
              <Typography variant="body1" color={usageTextColor}>
                사용
              </Typography>
            </View>
          </View>

          <View style={styles.contentRight}>
            <View style={[incomeColorStyle, styles.contentRightButton]}>
              <Typography variant="body1" color={incomeTextColor}>
                수입
              </Typography>
            </View>
          </View>
        </View>
        <Spacer size={15} />
        <View style={styles.inputContainer}>
          <View style={styles.inputContainerPrice}>
            <View
              style={[styles.inputContainerPriceButton, calendarColorStyle]}
            >
              <Typography variant={'body1'} color={'gray'}>
                {displayPrice}
              </Typography>
            </View>

            <Spacer size={24} />
            <View
              style={[styles.inputContainerPriceButton, calendarColorStyle]}
            >
              <Typography variant={'body1'} color={'gray'}>
                {calendarDisplayText}
              </Typography>
            </View>
          </View>
          <Spacer size={15} horizontal />
          <View>
            {photoUrl ? (
              <RemoteImage
                uri={photoUrl}
                width={100}
                height={100}
                style={styles.image}
              />
            ) : (
              <View style={styles.cameraButton} />
            )}
          </View>
        </View>
        <Spacer size={24} />
        <View style={styles.commentContainer}>
          <Typography variant="body1" color="gray">
            {displayComment}
          </Typography>
        </View>
        <Spacer size={64} />
        <Button onPress={onPressUpdate}>
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

export default DetailScreen;

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
  image: {
    borderRadius: 12,
  },
  commentContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    height: 100,
  },
});
