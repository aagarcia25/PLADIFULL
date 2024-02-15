import { post } from "./apiService";

export class AuthService {
  public static async login(data: any) {
    return await post("login", data);
  }

  public static async inapGralAll(data: any) {
    return await post("inapGralAll", data);
  }

  public static async inapGral01All(data: any) {
    return await post("inapGral01All", data);
  }
  public static async inapGral0101All(data: any) {
    return await post("inapGral0101All", data);
  }
  public static async inapGral0102All(data: any) {
    return await post("inapGral0102All", data);
  }
  public static async inapGral0103All(data: any) {
    return await post("inapGral0103All", data);
  }
  public static async inapGral010301All(data: any) {
    return await post("inapGral010301All", data);
  }
  public static async getFile(data: any) {
    return await post("getFile", data);
  }
  public static async adminfiles(data: any) {
    return await post("adminfiles", data);
  }

  public static async migrafile(data: any) {
    return await post("migrafile", data);
  }
}
