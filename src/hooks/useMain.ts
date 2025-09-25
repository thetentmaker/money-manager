import AccountBookHistory from "../data/AccountBookHistory";
import { useState } from "react";
import { useRootNavigation } from "../navigations/RootNavigation";

const now = Date.now();
const useMain = () => {
  const navigation = useRootNavigation();
  const [list] = useState<AccountBookHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'TEST_01',
      date: now,
      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 20000,
      comment: 'TEST_02',
      date: now,
      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://media.istockphoto.com/id/1434464167/ko/%EC%82%AC%EC%A7%84/%ED%9A%8C%EC%83%89-%EC%BD%98%ED%81%AC%EB%A6%AC%ED%8A%B8-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B9%A8%EB%81%97%ED%95%9C-%EC%8B%9D%EC%8A%B5%EA%B4%80-%EC%84%A0%ED%83%9D-%EA%B3%BC%EC%9D%BC-%EC%95%BC%EC%B1%84-%EC%94%A8%EC%95%97-%EC%8A%88%ED%8D%BC-%ED%91%B8%EB%93%9C-%EC%8B%9C%EB%A6%AC%EC%96%BC-%EC%9E%8E-%EC%B1%84%EC%86%8C.webp?a=1&b=1&s=612x612&w=0&k=20&c=A98OZqyic6CGd65Us1WtmvYyMsk4nUMEk2CSOz2XhQY=',
    },
  ]);

  const onPressItem = (item: AccountBookHistory) => {
    navigation.push('Detail', { item });
  };

  const onPressAdd = () => {
    navigation.push('Add');
  };

  return {
    list,
    onPressItem,
    onPressAdd,
  };
};

export default useMain;
