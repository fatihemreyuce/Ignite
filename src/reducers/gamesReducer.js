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
        case 'SEARCH_GAMES':
            return {
                ...state,
                searchedGames: action.payload.searchedGames,
                isLoading: false,
            }
        case 'CLEAR_SEARCH':
            return {
                ...state,
                searchedGames: [],
            }
        default:
            return {
                ...state
            }
    }
}

export default gamesReducer;