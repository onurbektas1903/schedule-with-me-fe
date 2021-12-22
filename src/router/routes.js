import store from '@/state/store'

export default [
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch('auth/logOut')
                } else if (process.env.VUE_APP_DEFAULT_AUTH === "backend") {
                    store.dispatch('authfack/logout')
                }
                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    (route) => route.push('/login')
                )
                // Navigate back to previous page, or home as a fallback
                next(authRequiredOnPreviousRoute ? {
                    name: 'home'
                } : {
                    ...routeFrom
                })
            },
        },
    },
    {
        path: '/',
        name: 'home',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/calendar/meetingCalendar')
    },
    {
        path: '/meeting/:id',
        name: 'editMeet',
        component: () => import('../views/pages/calendar/meetingCalendar')
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/calendar/meetingCalendar')
    },
    {
        path: '/tables/bootstrap',
        name: 'bootstrap-table',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/tables/bootstrap')
    },
    {
        path: '/tables/meetingProvider',
        name: 'datatable',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/tables/meetingProvider')
    },
    {
        path: '/dashboards/index',
        name: 'dashboard',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/dashboard/index')
    },
    {
        path: '/accounts/meetingAccounts',
        name: 'meetingAccount',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/accounts/meetingAccounts')
    }
]
