const MEETING_API_URL = '/meeting-manager'

const GET_ALL = '/meetings';
const SEARCH_ALL = '/search-meetings';
const BASE_URL = '/meeting';
const MEETING_USAGE_URL = '/meeting-usage';
const MEETING_ORGANIZER_URL = '/meeting-organizers';
const SLOT_REQUETS_URL = '/meeting-slot-request';
const SLOT_REQUETS_GET_ALL = '/meeting-slot-requests';
export const MEETING_API_BASE_URL  = MEETING_API_URL + BASE_URL;
export const MEETING_SLOT_URL  = MEETING_API_URL + SLOT_REQUETS_URL;
export const MEETING_API_GET_ALL_URL = MEETING_API_URL + GET_ALL;
export const MEETING_API_SEARCH_ALL_URL = MEETING_API_URL + SEARCH_ALL;
export const MEETING_API_USAGE_URL = MEETING_API_URL + MEETING_USAGE_URL;
export const MEETING_API_ORGANIZER_URL = MEETING_API_URL + MEETING_ORGANIZER_URL;
export const MEETING_API_GET_ALL_SLOTS_URL = MEETING_API_URL + SLOT_REQUETS_GET_ALL;
