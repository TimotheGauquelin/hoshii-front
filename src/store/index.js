import { createStore } from 'vuex'
import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'

const store = createStore({
    state,
    actions,
    mutations,
})

export default store