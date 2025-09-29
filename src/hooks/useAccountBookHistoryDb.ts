import { useCallback } from 'react';
import AccountBookHistory from '../data/AccountBookHistory';
import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';

// SQLite에서 반환되는 row 객체의 타입 정의
interface AccountHistoryRow {
  id: number;
  type: string;
  price: number;
  comment: string;
  date: number;
  created_at: number;
  updated_at: number;
  photo_url: string | null;
}

// 타입 가드 함수
const isAccountHistoryRow = (row: any): row is AccountHistoryRow => {
  return (
    typeof row === 'object' &&
    row !== null &&
    typeof row.id === 'number' &&
    typeof row.type === 'string' &&
    typeof row.price === 'number' &&
    typeof row.comment === 'string' &&
    typeof row.date === 'number' &&
    typeof row.created_at === 'number' &&
    typeof row.updated_at === 'number' &&
    (row.photo_url === null || typeof row.photo_url === 'string')
  );
};

const useAccountBookHistoryDb = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    console.log('=== openDB 시작 ===');
    try {
      const db = await SQLite.openDatabase(
        {
          name: 'account_history',
          location: 'default',
          createFromLocation: '~/www/account_history.db',
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

        console.log('필드 추출 완료:', {
          type,
          price,
          comment,
          date,
          photoUrl,
          createdAt,
          updatedAt,
        });

        const db = await openDB();
        console.log('db 객체:', db);
        console.log('db 타입:', typeof db);
        console.log('db 구조:', Object.keys(db || {}));

        if (!db) {
          throw new Error(
            'Database connection failed: db is null or undefined',
          );
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
        console.log(
          'params 타입들:',
          params.map(p => typeof p),
        );
        console.log(
          'params 상세:',
          params.map((p, i) => ({ index: i, value: p, type: typeof p })),
        );

        // 4. SQL 실행 - 다른 방식으로 시도
        console.log('executeSql 호출 시작');
        let result: ResultSet;
        try {
          result = await new Promise<ResultSet>((resolve, reject) => {
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
                },
              );
            });
          });
        } catch (executeError) {
          console.error('executeSql 새로운 방식 에러:', executeError);
          // 기존 방식으로 폴백
          console.log('기존 방식으로 재시도');
          const fallbackResult = await db.executeSql(
            'INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            params,
          );
          result = fallbackResult[0]; // 배열의 첫 번째 요소가 ResultSet
        }
        console.log('executeSql 최종 완료:', result);

        const insertId = result.insertId;
        console.log('insertId:', insertId);

        if (!insertId && insertId !== 0) {
          throw new Error('Failed to insert item: no insert ID returned');
        }

        const resultItem = {
          ...item,
          id: Number(insertId),
        };
        console.log('결과 item:', resultItem);
        return resultItem;
      } catch (error) {
        console.error('=== insertItem 에러 상세 ===');
        console.error('에러 타입:', typeof error);
        console.error('에러 객체:', error);
        console.error(
          '에러 메시지:',
          error instanceof Error ? error.message : String(error),
        );
        console.error(
          '에러 스택:',
          error instanceof Error ? error.stack : 'No stack trace',
        );
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
      console.log('=== updateItem 시작 ===');
      try {
        if (typeof item.id === 'undefined') {
          throw new Error('id is undefined');
        }
        const db = await openDB();
        const now = Date.now();

        const result = await new Promise<ResultSet>((resolve, reject) => {
          db.transaction(transaction => {
            transaction.executeSql(
              'UPDATE account_history SET type = ?, price = ?, comment = ?, date = ?, photo_url = ?, created_at = ?, updated_at = ? WHERE id = ?',
              [
                item.type,
                item.price,
                item.comment,
                item.date,
                item.photoUrl,
                now,
                now,
                item.id,
              ],
              (_, res) => {
                console.log('updateItem Transaction executeSql 성공:', res);
                resolve(res);
              },
              (_, err) => {
                console.error('updateItem Transaction executeSql 실패:', err);
                reject(err);
              },
            );
          });
        });

        console.log('updateItem result:', result);
        return { ...item, id: result.insertId || item.id };
      } catch (error) {
        console.error('updateItem 에러:', error);
        throw error;
      }
    },
    [openDB],
  );

  const getList = useCallback<
    () => Promise<AccountBookHistory[]>
  >(async (): Promise<AccountBookHistory[]> => {
    console.log('=== getList 시작 ===');
    try {
      const db = await openDB();
      console.log('getList db 객체:', db);

      // 트랜잭션 방식으로 변경
      const result = await new Promise<ResultSet>((resolve, reject) => {
        db.transaction(transaction => {
          transaction.executeSql(
            'SELECT * FROM account_history ORDER BY created_at DESC',
            [],
            (_, res) => {
              console.log('getList Transaction executeSql 성공:', res);
              resolve(res);
            },
            (_, err) => {
              console.error('getList Transaction executeSql 실패:', err);
              reject(err);
            },
          );
        });
      });

      console.log('getList result:', result);

      // SQLite 결과를 AccountBookHistory[] 타입으로 변환
      const rawRows = result.rows.raw();
      const accountHistoryList: AccountBookHistory[] = rawRows
        .filter(isAccountHistoryRow) // 타입 가드로 필터링
        .map((row: AccountHistoryRow) => ({
          id: row.id,
          type: row.type,
          price: row.price,
          comment: row.comment,
          date: row.date,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          photoUrl: row.photo_url,
        }));

      console.log('변환된 accountHistoryList:', accountHistoryList);
      return accountHistoryList;
    } catch (error) {
      console.error('=== getList 에러 ===');
      console.error('에러 타입:', typeof error);
      console.error('에러 객체:', error);
      console.error(
        '에러 메시지:',
        error instanceof Error ? error.message : String(error),
      );
      console.error(
        '에러 스택:',
        error instanceof Error ? error.stack : 'No stack trace',
      );
      console.error('에러가 언캐치됨:', error);
      throw error;
    }
  }, [openDB]);

  const getMonthlyAverage = useCallback<
    () => Promise<{ month: number; data: number[] }[]>
  >(async (): Promise<{ month: number; data: number[] }[]> => {
    try {
      const now = new Date();
      const currentMonthStart = new Date();
      currentMonthStart.setDate(1);

      const prevMonthList = [2, 1].map(monthDiff => {
        const date = new Date();
        date.setMonth(now.getMonth() - monthDiff);
        date.setDate(1);

        return date.getTime();
      });

      const queryMonth = prevMonthList.concat(
        currentMonthStart.getTime(),
        now.getTime(),
      );
      const db = await openDB();

      const monthly: { month: number; data: number[] }[] = [];

      const querySum = (
        start: number,
        end: number,
        historyType: '사용' | '수입',
      ): Promise<number> =>
        new Promise((resolve, reject) => {
          db.readTransaction(tx => {
            tx.executeSql(
              `
              SELECT COALESCE(SUM(price), 0) AS sum
              FROM account_history
              WHERE date >= ? AND date < ? AND type = ?
              `,
              [start, end, historyType],
              (_, res) => {
                const rowCount = res?.rows?.length ?? 0;
                const value = rowCount > 0 ? res.rows.item(0)?.sum ?? 0 : 0;
                resolve(Number(value) || 0);
              },
              (_t, err) => {
                reject(err);
                return false;
              },
            );
          });
        });

      for (let index = 0; index < queryMonth.length - 1; index++) {
        const start = queryMonth[index];
        const end = queryMonth[index + 1];

        const usedPrice = await querySum(start, end, '사용');
        const savedPrice = await querySum(start, end, '수입');

        monthly.push({
          month: new Date(start).getMonth(),
          data: [usedPrice, savedPrice],
        });
      }
      return monthly;
    } catch (error) {
      console.error('getMonthlyAverage 에러:', error);
      // 상세 로그 출력
      console.error('getMonthlyAverage 에러 상세:', error);
      console.error('getMonthlyAverage 에러 타입:', typeof error);
      console.error('getMonthlyAverage 에러 객체:', error);
      console.error('getMonthlyAverage 에러 메시지:', error instanceof Error ? error.message : String(error));
      console.error('getMonthlyAverage 에러 스택:', error instanceof Error ? error.stack : 'No stack trace');
      console.error('getMonthlyAverage 에러가 언캐치됨:', error);
      console.error('getMonthlyAverage 에러 상세:', error);
      throw error;
    }
  }, [openDB]);
  return {
    insertItem,
    updateItem,
    getList,
    getMonthlyAverage,
  };
};

export default useAccountBookHistoryDb;
