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
    try {
      const db = await SQLite.openDatabase(
        {
          name: 'account_history',
          location: 'default',
          createFromLocation: '~/www/account_history.db',
        },
        () => {},
        (err: any) => {
          console.error('DB opened error callback 호출됨:', err);
        },
      );
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

        const db: SQLiteDatabase = await openDB();

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

        // 4. SQL 실행 - 다른 방식으로 시도
        let result: ResultSet;
        try {
          result = await new Promise<ResultSet>((resolve, reject) => {
            db.transaction(transaction => {
              transaction.executeSql(
                'INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                params,
                (_, res) => {
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
          const fallbackResult = await db.executeSql(
            'INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            params,
          );
          result = fallbackResult[0]; // 배열의 첫 번째 요소가 ResultSet
        }
        const insertId = result.insertId;

        if (!insertId && insertId !== 0) {
          throw new Error('Failed to insert item: no insert ID returned');
        }

        const resultItem = {
          ...item,
          id: Number(insertId),
        };
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
        console.error('=== 에러 로그 끝 ===');
        throw error;
      }
    },
    [openDB],
  );

  const updateItem = useCallback(
    async (item: AccountBookHistory): Promise<AccountBookHistory> => {
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
                resolve(res);
              },
              (_, err) => {
                console.error('updateItem Transaction executeSql 실패:', err);
                reject(err);
              },
            );
          });
        });
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
    try {
      console.log(' getList');
      const db = await openDB();

      // 트랜잭션 방식으로 변경
      const result = await new Promise<ResultSet>((resolve, reject) => {
        db.transaction(transaction => {
          transaction.executeSql(
            'SELECT * FROM account_history ORDER BY created_at DESC',
            [],
            (_, res) => {
              resolve(res);
            },
            (_, err) => {
              console.error('getList Transaction executeSql 실패:', err);
              reject(err);
            },
          );
        });
      });

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

  interface MonthlyAverage {
    month: number;
    data: number[];
  }
  /**
   * 차트용 월별 수입/지출 평균 데이터를 가져오는 함수
   *
   * @returns Promise<{ month: number; data: number[] }[]>
   * - month: 월 번호 (0~11, 0=1월, 11=12월)
   * - data: [지출금액, 수입금액] 배열
   *
   * @example
   * // 현재가 2024년 3월 15일이라면
   * // 반환값: [
   * //   { month: 0, data: [100000, 200000] }, // 1월: 지출 10만원, 수입 20만원
   * //   { month: 1, data: [150000, 180000] }, // 2월: 지출 15만원, 수입 18만원
   * //   { month: 2, data: [80000, 220000] }   // 3월: 지출 8만원, 수입 22만원 (3월 1일~15일까지)
   * // ]
   */
  const getMonthlyAverage = useCallback<
    () => Promise<MonthlyAverage[]>
  >(async (): Promise<MonthlyAverage[]> => {
    try {
      console.log(' getMonthlyAverage');
      // === 1단계: 날짜 범위 계산 ===
      const now = new Date(); // 현재 시간
      const currentMonthStart = new Date(); // 이번 달 1일 계산용
      currentMonthStart.setDate(1); // 이번 달 1일로 설정

      // 이전 2개월(2개월 전, 1개월 전)의 1일 타임스탬프 생성
      // [2, 1] → 2개월 전, 1개월 전 순서로 처리
      const prevMonthList = [2, 1].map(monthDiff => {
        const date = new Date();
        date.setMonth(now.getMonth() - monthDiff); // 현재 월에서 차감
        date.setDate(1); // 해당 월의 1일로 설정

        return date.getTime(); // 타임스탬프로 변환
      });

      // 쿼리할 날짜 배열 생성: [2개월전 1일, 1개월전 1일, 이번달 1일, 현재시간]
      // 예: 현재가 2024-03-15라면 → [2024-01-01, 2024-02-01, 2024-03-01, 2024-03-15]
      const queryMonth = prevMonthList.concat(
        currentMonthStart.getTime(), // 이번 달 1일
        now.getTime(), // 현재 시간
      );

      const db = await openDB();
      const monthly: MonthlyAverage[] = []; // 결과 저장 배열

      // === 2단계: 특정 기간의 수입/지출 합계를 구하는 내부 함수 ===
      /**
       * 지정된 기간과 타입의 거래 합계를 계산
       * @param start 시작 날짜 (타임스탬프)
       * @param end 종료 날짜 (타임스탬프)
       * @param historyType '사용' 또는 '수입'
       * @returns 해당 기간의 거래 합계
       */
      const querySum = (
        start: number,
        end: number,
        historyType: '사용' | '수입',
      ): Promise<number> =>
        new Promise((resolve, reject) => {
          // readTransaction: 읽기 전용 트랜잭션 (성능 최적화)
          db.readTransaction(tx => {
            tx.executeSql(
              `
              SELECT COALESCE(SUM(price), 0) AS sum
              FROM account_history
              WHERE date >= ? AND date < ? AND type = ?
              `,
              [start, end, historyType], // SQL 파라미터
              (_, res) => {
                // 쿼리 성공 시
                const rowCount = res?.rows?.length ?? 0;
                const value = rowCount > 0 ? res.rows.item(0)?.sum ?? 0 : 0;
                resolve(Number(value) || 0); // 숫자로 변환 후 반환
              },
              (_t, err) => {
                // 쿼리 실패 시
                reject(err);
                return false;
              },
            );
          });
        });

      // === 3단계: 각 월별 데이터 수집 ===
      // queryMonth 배열의 인접한 두 날짜를 사용해 월별 구간 생성
      // 예: [2024-01-01, 2024-02-01, 2024-03-01, 2024-03-15]
      //     → 구간1: 2024-01-01 ~ 2024-02-01 (1월)
      //     → 구간2: 2024-02-01 ~ 2024-03-01 (2월)
      //     → 구간3: 2024-03-01 ~ 2024-03-15 (3월)
      for (let index = 0; index < queryMonth.length - 1; index++) {
        const start = queryMonth[index]; // 해당 월 시작 시간
        const end = queryMonth[index + 1]; // 다음 구간 시작 시간 (= 해당 월 종료 시간)

        // 해당 월의 지출과 수입 합계를 각각 계산
        const usedPrice = await querySum(start, end, '사용'); // 지출 합계
        const savedPrice = await querySum(start, end, '수입'); // 수입 합계

        // 결과 배열에 추가
        monthly.push({
          month: new Date(start).getMonth(), // 월 번호 (0~11)
          data: [usedPrice, savedPrice], // [지출, 수입] 순서
        });
      }

      return monthly;
    } catch (error) {
      console.error('getMonthlyAverage 에러:', error);
      // 상세 로그 출력
      console.error('getMonthlyAverage 에러 상세:', error);
      console.error('getMonthlyAverage 에러 타입:', typeof error);
      console.error('getMonthlyAverage 에러 객체:', error);
      console.error(
        'getMonthlyAverage 에러 메시지:',
        error instanceof Error ? error.message : String(error),
      );
      console.error(
        'getMonthlyAverage 에러 스택:',
        error instanceof Error ? error.stack : 'No stack trace',
      );
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
