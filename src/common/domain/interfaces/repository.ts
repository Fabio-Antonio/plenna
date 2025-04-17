export interface IRepository {
  connectDb(bd: string): Promise<void>;

  getAll(): Promise<any[]>;

  register(entity: unknown): Promise<any>;

  findOne(params: any): Promise<any | null>;

  remove(id: string): Promise<any>;

  update(params: any, updatedDate: unknown): Promise<any | null>;

  getAllWhere(params: any, limit?: number): Promise<any[] | null>;
}
