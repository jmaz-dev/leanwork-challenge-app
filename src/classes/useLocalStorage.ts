import { UserData } from "@/context/UserContext";

export class UseLocalStorage {
 getItem(key: string): UserData | null {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
 }

 setItem(key: string, value: UserData): void {
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
 }

 removeItem(key: string): void {
  localStorage.removeItem(key);
 }
}

// Crie uma instância da classe para usar
export const store = new UseLocalStorage();
