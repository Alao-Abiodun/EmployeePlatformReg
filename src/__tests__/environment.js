import NodeEnvironment from 'jest-environment-node';

import MemoryDatabaseServer from '../lib/MemoryDatabaseServer';

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.global.__DB_URL__ = await MemoryDatabaseServer.getConnectionString();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

export default new CustomEnvironment();

// module.exports = CustomEnvironment;
