import { popularGamesURL, upcomingGamesURL, newGamesURL } from "../api";
import axios from "axios";

export const loadGames = () => async (dispatch) => {
    const popularGames = await axios.get(popularGamesURL());
    const upcomingGames = await axios.get(upcomingGamesURL());
    const newGamesData = await axios.get(newGamesURL());
    dispatch({
        type: 'GET_GAMES',
        payload:{
            popular: popularGames.data.results,
            upcoming: upcomingGames.data.results,
            newGames: newGamesData.data.results
        }
    })
}