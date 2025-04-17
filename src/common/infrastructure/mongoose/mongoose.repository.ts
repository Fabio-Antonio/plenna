import { injectable } from 'inversify';
import * as mongoose from 'mongoose';
import { MongooseConnection } from './connection';

@injectable()
abstract class MongooseRepository<T extends mongoose.Document> {
  protected model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }

  public async connectDb(bd: string): Promise<void> {
    await MongooseConnection.connect(bd);
  }

  public async getAll(): Promise<T[]> {
    try {
      const result = await this.model.find().exec();
      return result;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  public async register(entity: unknown): Promise<T> {
    try {
      const result = await this.model.create(entity);
      return result;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  public async findOne(params: any) {
    try {
      const result = await this.model.findOne({ ...params }).exec();

      if (!result) return null;

      return result;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.model.findByIdAndDelete(id).exec();
      if (!result) return null;

      return true;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  public async update(params: any, updatedDate: unknown): Promise<T | null> {
    try {
      const updatedUser = await this.model
        .findOneAndUpdate({ ...params }, updatedDate || {}, { new: true })
        .exec();

      return updatedUser;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  public async getAllWhere(params: any, limit?: number): Promise<T[] | null> {
    try {
      const result = limit
        ? await this.model.find(params).limit(limit).exec()
        : await this.model.find(params).exec();

      return result;
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}

export default MongooseRepository;
