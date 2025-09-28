import axios from "axios";
import { gameDetailsURL,gameScreenshotURL,searchGameURL } from "../api";
export const loadDetail = (id) => async (dispatch) => {
    dispatch({
        type: 'LOADING_DETAIL'
    });
    
    const detailData = await axios.get(gameDetailsURL(id));
    const screenshotData = await axios.get(gameScreenshotURL(id));
    
    dispatch({
        type: 'GET_DETAIL',
        payload: {
            game: detailData.data,
            screenshots: screenshotData.data,
        }
    })
}

export const fetchSearch = (game_name) => async (dispatch) => {
    const searchGames = await axios.get(searchGameURL(game_name));
    dispatch({
        type: 'SEARCH_GAMES',
        payload: {
            searchedGames: searchGames.data.results,
        }
    })
}