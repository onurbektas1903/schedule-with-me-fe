const chatData = [
    {
        id: 1,
        image: require('@/assets/images/users/avatar-2.jpg'),
        name: 'John Howard',
        message: 'Hey! there I\'m available',
        time: '02 min',
        color: 'success'
    },
    {
        id: 2,
        name: 'Galen Rizo',
        message: 'I\'ve finished it! See you so',
        time: '10 min',
        color: 'success'
    },
    {
        id: 3,
        image: require('@/assets/images/users/avatar-3.jpg'),
        name: 'Bernard Spencer',
        message: 'This theme is awesome!',
        time: '22 min',
        color: 'warning'
    },
    {
        id: 4,
        image: require('@/assets/images/users/avatar-4.jpg'),
        name: 'Annie Holder',
        message: 'Nice to meet you',
        time: '04 hrs',
        color: 'secondary'
    },
    {
        id: 5,
        name: 'Vernon Smith',
        message: 'Wow that\'s great',
        time: '3 hrs',
        color: 'success'
    },
    {
        id: 6,
        image: require('@/assets/images/users/avatar-8.jpg'),
        name: 'Anni Holder',
        message: 'Nice to meet you',
        time: '5 hrs',
        color: 'secondary'
    },
    {
        id: 7,
        image: require('@/assets/images/users/avatar-7.jpg'),
        name: 'Verno Smith',
        message: 'Wow that\'s great',
        time: '04 hrs',
        color: 'secondary'
    },
];

const chatMessagesData = [
    {
        profile: require('@/assets/images/users/avatar-2.jpg'),
        message: 'Good morning ! ',
        time: '10:00'
    },
    {
        align: 'right',
        profile: require('@/assets/images/users/avatar-4.jpg'),
        message: 'Good morning, How are you? What about our next meeting?',
        time: '10:02'
    },
    {
        profile: require('@/assets/images/users/avatar-2.jpg'),
        message: 'Yeah everything is fine',
        time: '10:06'
    },
    {
        profile: require('@/assets/images/users/avatar-2.jpg'),
        message: '& Next meeting tomorrow 10.00AM',
        time: '10:06'
    },
    {
        align: 'right',
        profile: require('@/assets/images/users/avatar-4.jpg'),
        message: 'Wow that\'s great',
        time: '10:07'
    }
];

export { chatData, chatMessagesData };