import * as Sagas from './sagas';

export const initSagas = (sagaMiddleware) =>
  Object.values(Sagas).map((saga) => sagaMiddleware.run(saga));
