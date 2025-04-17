import mongoose from 'mongoose';

export class MongooseConnection {
  public static async connect(bdName: string) {
    try {
      function getConnectionStatus() {
        switch (mongoose.connection.readyState) {
          case 0:
            return 'Disconnected';
          case 1:
            return 'Connected';
          case 2:
            return 'Connecting';
          case 3:
            return 'Disconnecting';
          default:
            return 'Unknown';
        }
      }

      const status = getConnectionStatus();
      //const url = mongoose.connection.getClient();
      if (status === 'Connected') {
        await this.disconnect();
      }

      await mongoose.connect(
        `${process.env.MONGO_URL}${bdName}?authSource=admin`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
    } catch (error) {
      console.info(error);
    }
  }

  public static async disconnect() {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.info(error);
    }
  }
}
