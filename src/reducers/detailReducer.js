const initState = {
    game: {},
    screenshots: {},
    isLoading: false,
}
const detailReducer = (state=initState,action) => {
    switch(action.type){
        case 'LOADING_DETAIL':
            return{
                ...state,
                isLoading: true,
            }
        case 'GET_DETAIL':
            return{
                ...state,
                game: action.payload.game,
                screenshots: action.payload.screenshots,
                isLoading: false,
            }
        default:
            return{
                ...state
            }
    }
}
export default detailReducer;