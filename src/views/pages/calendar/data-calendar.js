const categories = [{
        name: 'Danger',
        value: 'bg-danger'
    },
    {
        name: 'Success',
        value: 'bg-success'
    },
    {
        name: 'Primary',
        value: 'bg-primary'
    },
    {
        name: 'Info',
        value: 'bg-info'
    },
    {
        name: 'Dark',
        value: 'bg-dark'
    },
    {
        name: 'Warning',
        value: 'bg-warning'
    },
];

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

const calendarEvents = [{
        id: 1,
        title: 'All Day Event',
        start: new Date(y, m, 1)
    },
    {
        id: 2,
        title: 'Long Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        className: 'bg-warning'
    },
    {
        id: 3,
        title: 'Repeating Event',
        start: new Date(y, m, d - 3, 16, 0),
        allDay: false,
        className: 'bg-info'
    },
    {
        id: 4,
        title: 'Repeating Event',
        start: new Date(y, m, d + 4, 16, 0),
        allDay: false,
        className: 'bg-primary'
    },
    {
        id: 5,
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false,
        className: 'bg-success'
    },
    {
        id: 6,
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false,
        className: 'bg-danger'
    },
    {
        id: 7,
        title: 'Birthdayy Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false,
        className: 'bg-success'
    }
];

export {
    categories,
    calendarEvents
};
