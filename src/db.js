import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const { MONGO_URI } = process.env;

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(
        process.env.NODE_ENV === 'test'
          ? global.__DB_URL__
          : process.env.MONGO_URI,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log('Database connected succesfully');
      })
      .catch(error => console.log(error));
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map(collection =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = {
  connect,
  truncate,
  disconnect,
};

// const db = mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch(error => console.log(error));

// export default db;
