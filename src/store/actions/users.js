import { POPULATE_PROFILE } from 'API/types/users';

export const populateProfile = ( profile = {}) => ({
    type: POPULATE_PROFILE,
    payload: profile,
})