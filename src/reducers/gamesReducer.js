const initState = {
    popularGames: [],
    newGames: [],
    upcomingGames: [],
    searchedGames: [],
}

const gamesReducer = (state=initState,action) => {
    switch(action.type){
        case 'GET_GAMES':
            return {
                ...state,
                games: action.payload
            }
        default:
            return {
                ...state
            }
    }
}