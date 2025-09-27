import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
const Game = ({name,released,id,platform,rating,description,img}) => {
    return (
        <StyledGame>
            <h3>{name}</h3>
            <p>Date: {released}</p>
            <p>Platform: {platform}</p>
            <p>Rating: {rating}</p>
            <p>{description}</p>
            <img src={img} alt={name} />
        </StyledGame>
    )
}
const StyledGame = styled(motion.div)`
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`;
export default Game;