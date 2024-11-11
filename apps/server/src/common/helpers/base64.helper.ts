export class Base64Helper {
  static parse<T>(history: string): T {
    let decoded = Buffer.from(history, "base64").toString("utf-8");
    return JSON.parse(decoded);
  }

  static encode<T>(history: T): string {
    let jsonString = JSON.stringify(history);
    return Buffer.from(jsonString).toString("base64");
  }
}
