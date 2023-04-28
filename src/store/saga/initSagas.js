import * as Sagas from 'store/saga/sagas';

export const initSagas = (sagaMiddleware) =>
  Object.values(Sagas).map((saga) => sagaMiddleware.run(saga));
