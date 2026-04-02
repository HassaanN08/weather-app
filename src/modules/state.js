let state = {};

const getState = () => {
    return state;
}

const updateState = (newState) => {
    state = {...state, ...newState};
}

let loadingState = false;

const getLoadingState = () => {
    return loadingState;
}

const updateLoadingState = () => {
    loadingState = !loadingState;
}

export { getState, updateState, getLoadingState, updateLoadingState };