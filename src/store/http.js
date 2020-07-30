import Axios from 'axios'
import Qs from 'qs'
// import { BASE_URL, REQUEST_METHOD, CONFIGJSON } from './url'

let BASE_URL = '/'
let CONFIGJSON = ''
let REQUEST_METHOD = 'post'

// initial state
const state = {
  isLoading: false,
  response: {},
  httpShowMask: false,
  commonParams: { 
    os: String(window.navigator.platform).slice(0, 10),
    channelType: 'zhangcaifeng'
  }
}

// getters
const getters = {
  isLoading: state => state.isLoading,
  getResponse: state => state.response,
  httpShowMask: state => state.httpShowMask
}

// actions
const actions = {
  httpRequest: ({ state, commit }, { url, params={}, mutations }) => {
    return new Promise((resolve, reject) => {
      Object.assign(params, state.commonParams)
      commit('isLoading', true)
      Axios({
        url,
        data: Qs.stringify(params),
        method: REQUEST_METHOD,
        baseURL: BASE_URL,
        timeout: 60000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(({data}) => {
        setTimeout(function name(params) {
          commit('isLoading', false)
          commit('setResponse', data)
          // if (data.flag === '1') {
            commit(mutations, data.data)
            //这里也有弊端呀，有时候不是 data.data呢。。
            resolve(data.data)
          // }
          
        }, 200)
        
      })
      .catch(() => {
        commit('isLoading', false)
        commit('setResponse', {
          flag: '2',
          msg: '网络异常，请稍后再试！'
        })
      })
    })
  },
  requestJson: ({ state, commit }, { url, params }) => {
    return new Promise((resolve, reject) => {
      Axios({
        url,
        data: {},
        method: 'get',
        baseURL: CONFIGJSON,
        timeout: 60000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(({data}) => {
        resolve(data)
      })
      .catch(() => {
      })
    })
  }
}

// mutations
const mutations = {
  isLoading: (state, data) => {
    state.isLoading = data
  },
  setResponse: (state, data) => {
    state.response = data
  },
  setCommonParams: (state, data) => {
    Object.assign(state.commonParams, {
      accountId: data.accountId,
      token: data.token
    })
  },
  setHttpShowMask: ( state, data) => {
    state.httpShowMask = data
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
