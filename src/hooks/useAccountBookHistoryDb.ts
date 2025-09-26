import { useCallback } from 'react';
import AccountBookHistory from '../data/AccountBookHistory';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';

const useAccountBookHistoryDb = () => {

  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    console.log('=== openDB 시작 ===');
    try {
      const db = await SQLite.openDatabase(
        {
          name: 'account_history',
          location: 'default',
          createFromLocation: "~/www/account_history.db",
        },
        () => {
          console.log('DB opened success callback 호출됨');
        },
        (err: any) => {
          console.error('DB opened error callback 호출됨:', err);
        },
      );
      console.log('openDatabase 반환값:', db);
      console.log('db 타입:', typeof db);
      return db;
    } catch (error) {
      console.error('openDB 에러:', error);
      throw error;
    }
  }, []);

  const insertItem = useCallback(
    async (
      item: Omit<AccountBookHistory, 'id'>,
    ): Promise<AccountBookHistory> => {
      console.log('=== insertItem 시작 ===');
      console.log('item 타입:', typeof item);
      console.log('item 내용:', JSON.stringify(item, null, 2));
      
      try {
        // 1. 데이터 유효성 먼저 확인
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
          throw new Error('Invalid item: item must be a valid object');
        }

        // 2. 각 필드를 안전하게 추출
        const type = item.type || '사용';
        const price = item.price || 0;
        const comment = item.comment || '';
        const date = item.date || Date.now();
        const photoUrl = item.photoUrl || null;
        const createdAt = item.createdAt || Date.now();
        const updatedAt = item.updatedAt || Date.now();

        console.log('필드 추출 완료:', { type, price, comment, date, photoUrl, createdAt, updatedAt });

        const db = await openDB();
        console.log('db 객체:', db);
        console.log('db 타입:', typeof db);
        console.log('db 구조:', Object.keys(db || {}));
        
        if (!db) {
          throw new Error('Database connection failed: db is null or undefined');
        }

        // 3. 파라미터 생성 및 검증
        const params = [
          String(type),
          Number(price),
          String(comment),
          Number(date),
          photoUrl ? String(photoUrl) : null,
          Number(createdAt),
          Number(updatedAt),
        ];

        console.log('SQL params:', params);
        console.log('params 타입들:', params.map(p => typeof p));
        console.log('params 상세:', params.map((p, i) => ({ index: i, value: p, type: typeof p })));

        // 4. SQL 실행 - 다른 방식으로 시도
        console.log('executeSql 호출 시작');
        let result: any;
        try {
          result = await new Promise((resolve, reject) => {
            db.transaction(transaction => {
              transaction.executeSql(
                'INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params,
                (_, res) => {
                  console.log('Transaction executeSql 성공:', res);
                  resolve(res);
                },
                (_, err) => {
                  console.error('Transaction executeSql 실패:', err);
                  reject(err);
                }
              );
            });
          });
        } catch (executeError) {
          console.error('executeSql 새로운 방식 에러:', executeError);
          // 기존 방식으로 폴백
          console.log('기존 방식으로 재시도');
          result = await db.executeSql(
            'INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            params,
          );
        }
        console.log('executeSql 최종 완료:', result);
        
        const insertId = result?.rows?.insertId || result?.insertId;
        console.log('insertId:', insertId);

        if (!insertId && insertId !== 0) {
          throw new Error('Failed to insert item: no insert ID returned');
        }

        const resultItem = { 
          ...item, 
          id: Number(insertId)
        };
        console.log('결과 item:', resultItem);
        return resultItem;
      } catch (error) {
        console.error('=== insertItem 에러 상세 ===');
        console.error('에러 타입:', typeof error);
        console.error('에러 객체:', error);
        console.error('에러 메시지:', error instanceof Error ? error.message : String(error));
        console.error('에러 스택:', error instanceof Error ? error.stack : 'No stack trace');
        console.error('에러가 언캐치됨:', error);
        console.error('item:', JSON.stringify(item, null, 2));
        console.error('=== 에러 로그 끝 ===');
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
