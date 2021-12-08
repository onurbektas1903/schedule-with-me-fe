import store from '@/state/store'

export default [{
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/account/login'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({
                        name: 'home'
                    })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/account/register'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({
                        name: 'home'
                    })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/pages/account/forgot-password'),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({
                        name: 'home'
                    })
                } else {
                    // Continue to the login page
                    next()
                }
            },
        },
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
                    store.dispatch('auth/logOut')
                } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
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
        component: () => import('../views/pages/calendar/index')
    },
    {
        path: '/meeting/:id',
        name: 'editMeet',
        component: () => import('../views/pages/calendar/index')
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/calendar/index')
    },
    {
        path: '/apps/chat',
        name: 'chat',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/chat/index')
    },
    {
        path: '/auth/login-1',
        name: 'sample-login',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/login-1')
    },
    {
        path: '/auth/register-1',
        name: 'register-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/register-1')
    },
    {
        path: '/auth/recoverpwd-1',
        name: 'recoverpwd-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/recoverpwd-1')
    },
    {
        path: '/auth/lock-screen-1',
        name: 'lock-screen-1',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/lock-screen-1')
    },
    {
        path: '/auth/two-step-verification',
        name: 'two-step-verification',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/two-step-verification')
    },
    {
        path: '/auth/confirm-mail',
        name: 'confirm-mail',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/confirm-mail')
    },
    {
        path: '/auth/email-verification',
        name: 'email-verification',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/sample-auth/email-verification')
    },
    {
        path: '/pages/starter',
        name: 'starter',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/starter')
    },
    {
        path: '/pages/timeline',
        name: 'timeline',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/timeline')
    },
    {
        path: '/pages/invoice',
        name: 'invoice',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/invoice')
    },
    {
        path: '/pages/comingsoon',
        name: 'comingsoon',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/comingsoon')
    },
    {
        path: '/pages/404',
        name: 'error-404',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/404')
    },
    {
        path: '/pages/profile',
        name: 'profile',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/profile')
    },
    {
        path: '/pages/500',
        name: 'error-500',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/500')
    },
    {
        path: '/pages/pricing',
        name: 'pricing',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/pricing')
    },
    {
        path: '/pages/maintenance',
        name: 'maintenance',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/extras/maintenance')
    },
    {
        path: '/email/inbox',
        name: 'Inbox',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/email/inbox')
    },
    {
        path: '/email/read/:id',
        name: 'Read Email',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/email/reademail')
    },
    {
        path: '/ui-components',
        name: 'ui-components',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/ui/index')
    },
    {
        path: '/advanced/sweet-alert',
        name: 'advanced-sweetalert',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/advanced/sweet-alert')
    },
    {
        path: '/advanced/rangeslider',
        name: 'rangeslider',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/advanced/rangeslider')
    },
    {
        path: '/advanced/notifications',
        name: 'notifications',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/advanced/notifications')
    },
    {
        path: '/advanced/carousel',
        name: 'carousel',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/advanced/carousel')
    },
    {
        path: '/typography',
        name: 'typography',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/typography')
    },
    {
        path: '/form/elements',
        name: 'elements',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/form/elements')
    },
    {
        path: '/form/advanced',
        name: 'advanced',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/form/advanced')
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
        path: '/accounts/meetingAccounts',
        name: 'meetingAccount',
        meta: {
            authRequired: false,
        },
        component: () => import('../views/pages/accounts/meetingAccounts')
    },
    {
        path: '/charts',
        name: 'chart',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/charts')
    },
    {
        path: '/icons/boxicons',
        name: 'boxicons',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/boxicons')
    },
    {
        path: '/icons/fontawesome',
        name: 'fontawesome',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/fontawesome')
    },
    {
        path: '/icons/dripicons',
        name: 'dripicons',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/dripicons')
    },
    {
        path: '/icons/materialdesign',
        name: 'materialdesign',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/icons/materialdesign')
    },
    {
        path: '/maps',
        name: 'Google Maps',
        meta: {
            authRequired: true,
        },
        component: () => import('../views/pages/maps/index')
    },
]
