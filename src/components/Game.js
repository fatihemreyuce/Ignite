import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadDetail} from "../actions/detailAction";
import smallImage from "../utils";

const Game = ({name,released,id,platform,rating,description,img}) => {
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        dispatch(loadDetail(id));
    }
    return (
        <StyledGame onClick={loadDetailHandler}>
            <Link to={`/game/${id}`}>
                <h3>{name}</h3>
                <p>Date: {released}</p>
                <p>Platform: {platform}</p>
                <p>Rating: {rating}</p>
                <p>{description}</p>
                {img && <img src={smallImage(img,640)} alt={name} />}
            </Link>
        </StyledGame>
    )
}
const StyledGame = styled(motion.div)`
    min-height: 30vh;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4);
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
`;
export default Game;