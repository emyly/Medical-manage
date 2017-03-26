/**
 * Created by liuyali on 2016/11/4.
 */

import { injectReducer } from 'store/reducers'

export default store => ({

  path: 'basicInformation',

  /* Async getComponent is only invoked when route matches */
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const BasicInformation = require('./components/BasicInformation').default
      const reducer = require('./modules/BasicInformation').default

      /* Add the reducer to the store on key 'employee' */
      injectReducer(store, { key: 'BasicInformation', reducer })

      /* Return getComponent */
      callback(null, BasicInformation)

      /* webpack named bundle */
    }, 'BasicInformation')
  }
})

