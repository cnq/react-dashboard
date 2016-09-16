//TODO: Integrate this to track connection counts in state
export const FETCHING_CONNECTION_COUNT = 'FETCHING_CONNECTION_COUNT'
export const FETCHING_CONNECTION_COUNT_ERROR = 'FETCHING_CONNECTION_COUNT_ERROR'
export const FETCHING_CONNECTION_COUNT_SUCCESS = 'FETCHING_CONNECTION_COUNT_SUCCESS'

const fetchingConnectionCount = () => ({
    type: FETCHING_CONNECTION_COUNT
})

const fetchingConnectionCountError = (error) => ({
    type: FETCHING_CONNECTION_COUNT_ERROR,
    error: 'Error fetching connection'
})

const fetchingConnectionCountSuccess = (appId, count) => ({
    type: FETCHING_CONNECTION_COUNT_SUCCESS,
    appId,
    count
})
