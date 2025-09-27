const BASE_URL = "https://api.rawg.io/api/"

const getCurrentMonth = () => {
    const month = new Date().getMonth();
    if(month < 10) {
        return `0${month}`;
    }else{
        return month;
    }
}
const getCurrentDay = () => {
    const day = new Date().getDate();
    if(day < 10) {
        return `0${day}`;
    }else{
        return day;
    }
}
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popular_games = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=50`;
const upcoming_games = `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=50`;
const new_games = `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=50`;
export const popularGamesURL = () => `${BASE_URL}${popular_games}&key=031ec46f28b64120aad67fc31b92af7d`;
export const upcomingGamesURL = () => `${BASE_URL}${upcoming_games}&key=031ec46f28b64120aad67fc31b92af7d`;
export const newGamesURL = () => `${BASE_URL}${new_games}&key=031ec46f28b64120aad67fc31b92af7d`;

export const gameDetailsURL = (game_id) => `${BASE_URL}games/${game_id}?key=031ec46f28b64120aad67fc31b92af7d`;
export const gameScreenshotURL = (game_id) => `${BASE_URL}games/${game_id}/screenshots?key=031ec46f28b64120aad67fc31b92af7d`;