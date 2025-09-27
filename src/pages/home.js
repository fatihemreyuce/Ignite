import React ,{useEffect} from "react";
import { useDispatch,useSelector} from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import styled from "styled-components";
import {motion} from "framer-motion";

const GameList = styled(motion.div)`
    padding: 0rem 5rem;
    h2 {
        padding: 5rem 0rem;
    }
`;

const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 5rem;
`;

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadGames());
    }, [dispatch])
    const {popular,newGames,upcoming} = useSelector(state => state.games);
    return (
        <GameList>
            <h2>Upcoming Games</h2>
            <Games>
                {upcoming && upcoming.map((game)=>(
                    <Game key={game.id} game={game} 
                    img={game.background_image}
                    name={game.name}
                    released={game.released}
                    id={game.id}
                    platform={game.platforms[0].platform.name}
                    rating={game.rating}
                    description={game.description}
                   />
                ))}
            </Games>
        </GameList>
    )
}


export default Home;