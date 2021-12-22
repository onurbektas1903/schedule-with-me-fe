export const state = {
 events:[]
}

export const getters = {
  EVENTS() {
    return state.events
  },
}

export const mutations = {
  ADD_EVENT: (state, eventObj) => {
    console.log(state + " pushing");
    state.events.push(eventObj)
  },
  UPDATE_EVENT: (state, {id, title, start, end}) => {
    let index = state.events.findIndex(_event => _event.id == id)

    state.events[index].title = title;
    state.events[index].start = start;
    state.events[index].end = end;
  }
};

export const actions = {
  addEventObj({ commit, dispatch, getters }, event  = {}) {
    console.log(event + " created");
    commit('ADD_EVENT',event);
  }
}
