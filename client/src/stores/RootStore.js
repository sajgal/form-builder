import FormStore from './FormStore';

import FormTransportLayer from './transport/FormTransportLayer';

class RootStore {
  constructor() {
    this.formStore = new FormStore(new FormTransportLayer());
  }
}

export default RootStore;