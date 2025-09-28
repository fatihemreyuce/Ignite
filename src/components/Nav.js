import React , {useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import { ReactComponent as LogoIcon } from "../img/Logo.svg";
import { fetchSearch } from "../actions/detailAction";
import { useDispatch } from "react-redux";
import { clearSearch } from "../actions/gamesAction";

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");
    const inputHandler = (e) => {
        setTextInput(e.target.value);
    }
    const submitSearch = (e) => {
        e.preventDefault();
        if (textInput.trim()) {
            dispatch(fetchSearch(textInput));
        }
    }
    
    const clearSearchResults = () => {
        dispatch(clearSearch());
        setTextInput("");
    }
    return(
        <StyledNav>
            <Logo>
                <LogoIcon />
                <h1>Ignite</h1>
            </Logo>
            <form className="search">
                <input 
                    type="text" 
                    value={textInput} 
                    onChange={inputHandler}
                    placeholder="Oyun ara..."
                />
                <button type="submit" onClick={submitSearch}>Search</button>
                <button type="button" onClick={clearSearchResults} className="clear-btn">Temizle</button>
            </form>
        </StyledNav>
    )
}
const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        width: 2rem;
        height: 2rem;
    }
`;
const StyledNav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 10rem;
    background: #FFFF;
    
    .search {
        display: flex;
        gap: 0.5rem;
    }
    
    input {
        font-size: 1rem;
        padding: 0.5rem;
        border: none;
        outline: none;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
    }
    
    button {
        font-size: 1rem;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #ff7676;
        color: white;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        border-radius: 0.5rem;
    }
    
    .clear-btn {
        background: #6c757d !important;
        border-radius: 0.5rem;
        
        &:hover {
            background: #495057 !important;
        }
    }
`;
export default Nav;