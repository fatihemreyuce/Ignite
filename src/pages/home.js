import React ,{useEffect} from "react";
import { useDispatch,useSelector} from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import styled from "styled-components";
import {motion} from "framer-motion";
import { SearchIcon } from "lucide-react";

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

const LoadingMessage = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 2rem;
    color: #ff7676;
`;

const NoResultsMessage = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    text-align: center;
    
    h2 {
        color: #ff7676;
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    p {
        color: #666;
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
    
    .search-icon {
        font-size: 4rem;
        color: #ddd;
        margin-bottom: 1rem;
    }
`;

const SearchResults = styled(motion.div)`
    margin-bottom: 3rem;
    
    h2 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
        background: linear-gradient(45deg, #ff7676, #ff5252);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadGames());
    }, [dispatch])
    const {popular,newGames,upcoming,isLoading,searchedGames,hasSearched} = useSelector(state => state.games);
    return (
        <GameList>
            {isLoading ? (
                <LoadingMessage>Yükleniyor...</LoadingMessage>
            ) : (
                <>
                    {hasSearched && searchedGames && searchedGames.length > 0 ? (
                        <SearchResults>
                            <h2>Arama Sonuçları ({searchedGames.length} oyun bulundu)</h2>
                            <Games>
                                {searchedGames.map((game)=>(
                                    <Game key={game.id} game={game} 
                                    img={game.background_image}
                                    name={game.name}
                                    released={game.released}
                                    id={game.id}
                                    platform={game.platforms?.[0]?.platform?.name || 'Unknown'}
                                    rating={game.rating}
                                    description={game.description}
                                   />
                                ))}
                            </Games>
                        </SearchResults>
                    ) : hasSearched && searchedGames && searchedGames.length === 0 ? (
                        <NoResultsMessage>
                            <SearchIcon size={40} />
                            <h2>Oyun Bulunamadı</h2>
                            <p>Aradığınız kriterlere uygun oyun bulunamadı.</p>
                            <p>Farklı anahtar kelimeler deneyebilirsiniz.</p>
                        </NoResultsMessage>
                    ) : null}
                    
                    <h2>Popular Games</h2>
                    <Games>
                        {popular && popular.map((game)=>(
                            <Game key={game.id} game={game} 
                            img={game.background_image}
                            name={game.name}
                            released={game.released}
                            id={game.id}
                            platform={game.platforms?.[0]?.platform?.name || 'Unknown'}
                            rating={game.rating}
                            description={game.description}
                           />
                        ))}
                    </Games>
                    
                    <h2>New Games</h2>
                    <Games>
                        {newGames && newGames.map((game)=>(
                            <Game key={game.id} game={game} 
                            img={game.background_image}
                            name={game.name}
                            released={game.released}
                            id={game.id}
                            platform={game.platforms?.[0]?.platform?.name || 'Unknown'}
                            rating={game.rating}
                            description={game.description}
                           />
                        ))}
                    </Games>
                    
                    <h2>Upcoming Games</h2>
                    <Games>
                        {upcoming && upcoming.map((game)=>(
                            <Game key={game.id} game={game} 
                            img={game.background_image}
                            name={game.name}
                            released={game.released}
                            id={game.id}
                            platform={game.platforms?.[0]?.platform?.name || 'Unknown'}
                            rating={game.rating}
                            description={game.description}
                           />
                        ))}
                    </Games>
                </>
            )}
        </GameList>
    )
}


export default Home;