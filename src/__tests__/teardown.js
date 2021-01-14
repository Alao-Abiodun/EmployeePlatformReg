import MemoryDatabaseServer from '../lib/MemoryDatabaseServer';

module.exports = async () => {
  await MemoryDatabaseServer.stop();
};
