let state = {}

const getState = () => {
    return state
}

const updateState = (newState) => {
    state = { ...state, ...newState }
}

let loadingState = false

const getLoadingState = () => {
    return loadingState
}

const updateLoadingState = (boolean) => {
    loadingState = boolean
}

export { getState, updateState, getLoadingState, updateLoadingState }
