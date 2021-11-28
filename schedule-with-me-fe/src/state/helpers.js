import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}
export const authkeycloakComputed = {
  ...mapState('authkeyclaok', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('authkeyclaok', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    layoutMode: (state) => state.layoutMode,
    layoutScrollable: (state) => state.layoutScrollable,
    sidebarColor: (state) => state.sidebarColor,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader
  })
}
export const calendarComputed = {
  ...mapState('calendar', {
    EVENTS: (state) => state.events
  }),
  ...mapGetters('calendar',['EVENTS']),
}
export const providerComputed = {
  ...mapState('provider', {
    providers: (state) => state.providers
  }),
  ...mapGetters('provider',['providers']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword'])

export const authkeycloakMethods = mapActions('auth', ['logIn', 'logOut'])

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutMode', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 
'changeLoaderValue', 'changeLayoutPosition','changeSidebarColor'])

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout'])

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])

export const calendarMethods = mapActions('calendar', ['addEventObj'])
export const providerMethods = mapActions('provider', ['addMeetingProvider'])

