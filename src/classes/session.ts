export class Session {
 getItem(key: string): string | null {
  return sessionStorage.getItem(key);
 }

 setItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
 }

 removeItem(key: string): void {
  sessionStorage.removeItem(key);
 }
}

// Crie uma instância da classe para usar
export const session = new Session();
