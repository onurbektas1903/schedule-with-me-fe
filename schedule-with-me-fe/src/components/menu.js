export const menuItems = [{
        id: 1,
        label: 'menuitems.menu.text',
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "bxs-dashboard",
        link: "/"
    },
    {
        id: 3,
        label: 'menuitems.more.text',
        isTitle: true
    },
    {
        id: 4,
        label: "menuitems.apps.text",
        icon: "bxs-grid",
        subItems: [{
                id: 5,
                label: "menuitems.apps.calendar.text",
                link: "/apps/calendar",
                parentId: 4
            },
            {
                id: 6,
                label: "menuitems.apps.chat.text",
                link: "/apps/chat",
                parentId: 4
            },
            {
                id: 7,
                label: "menuitems.apps.email.text",
                parentId: 4,
                subItems: [{
                        id: 8,
                        label: 'menuitems.apps.email.list.inbox',
                        link: '/email/inbox'
                    },
                    {
                        id: 9,
                        label: 'menuitems.apps.email.list.reademail',
                        link: '/email/read/1'
                    }
                ]
            }
        ]
    },
    {
        id: 10,
        label: 'menuitems.authentication.text',
        icon: 'bx-user-circle',
        badge: {
            variant: 'success',
            text: '7'
        },
        subItems: [{
                id: 11,
                label: 'menuitems.authentication.list.login',
                link: '/auth/login-1'
            },
            {
                id: 12,
                label: 'menuitems.authentication.list.register',
                link: '/auth/register-1'
            },
            {
                id: 13,
                label: 'menuitems.authentication.list.recoverpwd',
                link: '/auth/recoverpwd-1'
            },
            {
                id: 14,
                label: 'menuitems.authentication.list.lockscreen',
                link: '/auth/lock-screen-1'
            },
            {
                id: 15,
                label: 'menuitems.authentication.list.confirm-mail',
                link: '/auth/confirm-mail'
            },
            {
                id: 16,
                label: 'menuitems.authentication.list.verification-step',
                link: '/auth/two-step-verification'
            },
            {
                id: 17,
                label: 'menuitems.authentication.list.verification',
                link: '/auth/email-verification'
            },
        ]
    },
    {
        id: 18,
        label: 'menuitems.pages.text',
        icon: 'bx-file',
        subItems: [{
                id: 19,
                label: 'menuitems.utility.list.starter',
                link: '/pages/starter'
            },
            {
                id: 20,
                label: 'menuitems.utility.list.profile',
                link: '/pages/profile'
            },
            {
                id: 21,
                label: 'menuitems.utility.list.invoice',
                link: '/pages/invoice'
            },
            {
                id: 22,
                label: 'menuitems.utility.list.maintenance',
                link: '/pages/maintenance'
            },
            {
                id: 23,
                label: 'menuitems.utility.list.comingsoon',
                link: '/pages/comingsoon'
            },
            {
                id: 24,
                label: 'menuitems.utility.list.timeline',
                link: '/pages/timeline'
            }, {
                id: 25,
                label: 'menuitems.utility.list.pricing',
                link: '/pages/pricing'
            }, {
                id: 26,
                label: 'menuitems.utility.list.error404',
                link: '/pages/404'
            }, {
                id: 27,
                label: 'menuitems.utility.list.error500',
                link: '/pages/500'
            }
        ]
    },
    {
        id: 28,
        label: 'menuitems.adminkit.text',
        isTitle: true
    },
    {
        id: 29,
        icon: 'bx-briefcase',
        label: 'menuitems.uielements.text',
        link: '/ui-components'
    },
    {
        id: 30,
        label: "menuitems.advancedkit.text",
        icon: "bxs-cube-alt",
        subItems: [{
                id: 31,
                label: "menuitems.advancedkit.list.sweetalert",
                link: "/advanced/sweet-alert",
                parentId: 30
            },
            {
                id: 32,
                label: "menuitems.advancedkit.list.rangeslider",
                link: "/advanced/rangeslider",
                parentId: 30
            },
            {
                id: 33,
                label: "menuitems.advancedkit.list.notifications",
                link: "/advanced/notifications",
                parentId: 30
            },
            {
                id: 34,
                label: "menuitems.advancedkit.list.carousel",
                link: "/advanced/carousel",
                parentId: 30
            }
        ]
    },
    {
        id: 35,
        label: "menuitems.typography.text",
        icon: 'bx-text',
        link: "/typography"
    },
    {
        id: 36,
        label: 'menuitems.forms.text',
        icon: "bxs-magic-wand",
        badge: {
            variant: 'danger',
            text: '2'
        },
        subItems: [{
                id: 37,
                label: 'menuitems.forms.list.elements',
                link: '/form/elements',
                parentId: 36
            },
            {
                id: 38,
                label: 'menuitems.forms.list.advanced',
                link: '/form/advanced',
                parentId: 36
            }
        ]
    },
    {
        id: 39,
        label: 'menuitems.tables.text',
        icon: 'bx-table',
        subItems: [{
                id: 40,
                label: 'menuitems.tables.list.bootstrap',
                link: '/tables/bootstrap',
                parentId: 39
            },
            {
                id: 41,
                label: 'menuitems.tables.list.advanced',
                link: '/tables/datatable',
                parentId: 39
            }
        ]
    },
    {
        id: 40,
        icon: 'bx-doughnut-chart',
        label: 'menuitems.charts.text',
        link: '/charts'
    },
    {
        id: 41,
        icon: 'bx-layer',
        label: 'menuitems.icons.text',
        subItems: [{
                id: 42,
                label: 'menuitems.icons.list.boxicons',
                link: '/icons/boxicons'
            },
            {
                id: 43,
                label: 'menuitems.icons.list.materialdesign',
                link: '/icons/materialdesign'
            },
            {
                id: 44,
                label: 'menuitems.icons.list.dripicons',
                link: '/icons/dripicons'
            },
            {
                id: 45,
                label: 'menuitems.icons.list.fontawesome',
                link: '/icons/fontawesome'
            }
        ]
    },
    {
        id: 46,
        icon: 'bx-map',
        label: 'menuitems.maps.text',
        link: '/maps'
    },
    {
        id: 47,
        label: "menuitems.multilevel.text",
        icon: "bx-share-alt",
        subItems: [
            {
                id: 48,
                label: "menuitems.multilevel.list.level1.1",
                link: "#"
            },
            {
                id: 49,
                label: "menuitems.multilevel.list.level1.2",
                subItems: [
                    {
                        id: 50,
                        label: "menuitems.multilevel.list.level1.level2.1",
                        link: "#"
                    },
                    {
                        id: 51,
                        label: "menuitems.multilevel.list.level1.level2.2",
                        link: "#"
                    }
                ]
            }
        ]
    }
];