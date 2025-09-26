import { useCallback } from 'react';
import AccountBookHistory from '../data/AccountBookHistory';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';

const useAccountBookHistoryDb = () => {
  // 추가 validation과 강력한 undefined 제거
  const validateParams = (params: any[]) => {
    return params.map(param => {
      if (param === undefined) {
        console.warn('Found undefined in params, replacing with null');
        return null;
      }
      return param;
    });
  };

  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    return await SQLite.openDatabase(
      {
        name: 'account_history',
        location: 'default',
      },
      (db: SQLiteDatabase) => {
        console.log('DB opened', db);
      },
      err => {
        console.error('DB opened error:', err);
        throw err;
      },
    );
  }, []);

  const insertItem = useCallback(
    async (
      item: Omit<AccountBookHistory, 'id'>,
    ): Promise<AccountBookHistory> => {
      console.log('insertItem item:', item);
      try {
        // 1. 데이터 유효성 먼저 확인
        console.log('insertItem item:', item);
        if (!item || typeof item !== 'object') {
          throw new Error('Invalid item: undefined or null');
        }

        // 2. 각 필드 검증
        const { type, price, comment, date, photoUrl, createdAt, updatedAt } =
          item;
        console.log('Fields check:', {
          type,
          price,
          comment,
          date,
          photoUrl,
          createdAt,
          updatedAt,
        });

        const db = await openDB();
        if (!db || typeof db !== 'object') {
          throw new Error('Database connection failed');
        }

        const now = Date.now();

        // 3. 안전한 파라미터 배열 생성
        const params = validateParams([
          type !== undefined ? type : '사용',
          price !== undefined ? price : 0,
          comment !== undefined ? comment : '',
          date !== undefined ? date : now,
          photoUrl !== undefined ? photoUrl : null,
          createdAt !== undefined ? createdAt : now,
          updatedAt !== undefined ? updatedAt : now,
        ]);

        console.log('SQL params:', params);

        const result = await db.executeSql(
          `
          INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) 
          VALUES ( 
            "${item.type}", 
            ${item.price}, 
            "${item.comment}", 
            ${item.date}, 
            "${item.photoUrl}", 
            ${item.createdAt}, 
            ${item.updatedAt} 
          )
          `,
          [],
        );
        console.log('insertItem result:', result);
        const insertId = result[0]?.insertId;
        console.log('insertId:', insertId);

        if (!insertId) {
          throw new Error('Failed to insert item');
        }

        return { ...item, id: insertId };
      } catch (error) {
        console.error('insertItem error:', error);
        throw error;
      }
    },
    [openDB],
  );

  const updateItem = useCallback(
    async (item: AccountBookHistory): Promise<AccountBookHistory> => {
      const db = await openDB();
      const now = Date.now();
      const result = await db.executeSql(
        'UPDATE account_history SET type = ?, price = ?, comment = ?, date = ?, created_at = ?, updated_at = ?, photo_url = ? WHERE id = ?',
        [
          item.type,
          item.price,
          item.comment,
          item.date,
          now,
          now,
          item.photoUrl,
          item.id,
        ],
      );
      console.log(result);
      return { ...item, id: result[0].insertId };
    },
    [openDB],
  );

  return {
    insertItem,
    updateItem,
  };
};

export default useAccountBookHistoryDb;
