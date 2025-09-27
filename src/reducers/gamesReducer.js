const initState = {
    popular: [],
    newGames: [],
    upcoming: [],
    searchedGames: [],
    isLoading: false,
}

const gamesReducer = (state=initState,action) => {
    switch(action.type){
        case 'LOADING_GAMES':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_GAMES':
            return {
                ...state,
                popular: action.payload.popular,
                upcoming: action.payload.upcoming,
                newGames: action.payload.newGames,
                isLoading: false,
            }
        default:
            return {
                ...state
            }
    }
}

export default gamesReducer;