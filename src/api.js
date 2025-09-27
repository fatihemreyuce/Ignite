const BASE_URL = "https://api.rawg.io/api/platforms?key=031ec46f28b64120aad67fc31b92af7d"

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

const popular_games = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10`;
export const popularGamesURL = () => `${BASE_URL}${popular_games}`;