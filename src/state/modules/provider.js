import {providerService} from "@/helpers/fakebackend/provider.service";

export const state = {
 providers:[]
}

export const getters = {
  providers() {
    return state.providers
  },
}

export const mutations = {
  ADD_MEETING_PROVIDER: (state, providerObj) => {
    console.log(state + " pushing");
    state.providers.push(providerObj)
  }
};

export const actions = {
  addMeetingProvider({ commit, dispatch, getters }, provider  = {}) {
    console.log(provider + " created");
    providerService.createMeetingProvider(provider).then(result => {
      commit('ADD_MEETING_PROVIDER',result);
    })
  }
}
