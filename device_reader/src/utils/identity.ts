import type { UserInfo } from "../types/entity/auth";


export interface StorageTypeMap {
    user: UserInfo | null;
    // token: string;
    // isRememberMe: boolean;
}

export const storage = {
  /**
   * local保存
   */
  setItem<K extends keyof StorageTypeMap>(key: K, value: StorageTypeMap[K]): void {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`localStorage setItem error for key "${key}":`, error);
    }
  },

  /**
   * local獲得（自动解析 JSON）
   */
  getItem<K extends keyof StorageTypeMap>(key: K): StorageTypeMap[K] | null {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;

      // JSON の場合解析する
      if (
        (value.startsWith('{') && value.endsWith('}')) || 
        (value.startsWith('[') && value.endsWith(']')) ||
        value === 'true' || 
        value === 'false' ||
        !isNaN(Number(value))
      ) {
        return JSON.parse(value) as StorageTypeMap[K];
      }

      return value as unknown as StorageTypeMap[K];
    } catch (error) {
      console.error(`localStorage getItem error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * local削除
   */
  removeItem<K extends keyof StorageTypeMap>(key: K): void {
    localStorage.removeItem(key);
  }
};