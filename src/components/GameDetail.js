import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {motion} from "framer-motion";
import {useSelector, useDispatch} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {loadDetail} from "../actions/detailAction";
import { ArrowLeft, X } from "lucide-react";
import PCIcon from "../img/pc.svg";
import PlayStationIcon from "../img/playstation.svg";
import XboxIcon from "../img/xbox.svg";
import NintendoIcon from "../img/nintendo.svg";
import smallImage from "../utils";
import StarEmpty from "../img/star.png";
import StarFull from "../img/star-full.png";
import MacIcon from "../img/macos.svg";
import LinuxIcon from "../img/linux.svg";

const GameDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {game, screenshots, isLoading} = useSelector(state => state.detail);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);
    
    useEffect(() => {
        dispatch(loadDetail(id));
    }, [dispatch, id]);

    const getStars = (rating) => {
        const star = [];
        const starRating = Math.floor(rating || 0);
        for(let i=1;i<=5;i++){
            if(i<=starRating){
                star.push(<img src={StarFull} alt="Star" key={i} />);
            }else{
                star.push(<img src={StarEmpty} alt="Star" key={i} />);
            }
        }
        return star;
    };


    const exitDetailHandler = (e) => {
        const element = e.target;
        if (element.classList.contains("shadow")) {
            navigate("/");
        }
    };

    const openScreenshotModal = (screenshot) => {
        setSelectedScreenshot(screenshot);
    };

    const closeScreenshotModal = () => {
        setSelectedScreenshot(null);
    };

    const modalClickHandler = (e) => {
        if (e.target.classList.contains("modal-backdrop")) {
            closeScreenshotModal();
        }
    };

    return (
        <StyledGameDetail>
            <CardShadow className="shadow" onClick={exitDetailHandler}>
                <Detail>
                    <BackButton onClick={() => navigate("/")}>
                        <ArrowLeft size={24} />
                        <span>Geri</span>
                    </BackButton>
                    
                    {isLoading ? (
                        <LoadingMessage>Yükleniyor...</LoadingMessage>
                    ) : game && game.name ? (
                        <>
                            <Stats>
                                <div className="rating">
                                    <h3>{game.name}</h3>
                                    <p>Rating: {game.rating}/5</p>
                                    {getStars(game.rating)}
                                    {game.metacritic && <p>Metacritic: {game.metacritic}/100</p>}
                                    <p>Release Date: {game.released}</p>
                                    {game.website && (
                                        <a href={game.website} target="_blank" rel="noopener noreferrer">
                                            Official Website
                                        </a>
                                    )}
                                </div>
                                <Info>
                                    <h3>Platforms</h3>
                                    <Platforms>
                                        {game.platforms?.map(data => (
                                            <PlatformIcon key={data.platform.id}>
                                                {getPlatformIcon(data.platform.name)}
                                                <span>{data.platform.name}</span>
                                            </PlatformIcon>
                                        ))}
                                    </Platforms>
                                </Info>
                            </Stats>
                            <Media>
                                <img src={game.background_image ? smallImage(game.background_image, 1280) : ''} alt={game.name} />
                            </Media>
                            <Description>
                                <h3>Description</h3>
                                <div dangerouslySetInnerHTML={{ __html: game.description_raw }} />
                                {game.description && game.description !== game.description_raw && (
                                    <div className="additional-info">
                                        <h4>Additional Information</h4>
                                        <div dangerouslySetInnerHTML={{ __html: game.description }} />
                                    </div>
                                )}
                            </Description>
                            <Gallery>
                                <h3>Screenshots ({screenshots?.results?.length || 0})</h3>
                                {screenshots?.results?.length > 0 ? (
                                    <ScreenshotGrid>
                                        {screenshots.results.map(screen => (
                                            <ScreenshotItem key={screen.id} onClick={() => openScreenshotModal(screen)}>
                                                <img src={screen.image ? smallImage(screen.image, 640) : ''} alt={game.name} />
                                            </ScreenshotItem>
                                        ))}
                                    </ScreenshotGrid>
                                ) : (
                                    <p>No screenshots available</p>
                                )}
                            </Gallery>
                        </>
                    ) : (
                        <LoadingMessage>Oyun bilgileri yükleniyor...</LoadingMessage>
                    )}
                </Detail>
            </CardShadow>
            
            {/* Screenshot Modal */}
            {selectedScreenshot && (
                <ScreenshotModal className="modal-backdrop" onClick={modalClickHandler}>
                    <ModalContent>
                        <CloseButton onClick={closeScreenshotModal}>
                            <X size={24} />
                        </CloseButton>
                        <ModalImage src={selectedScreenshot.image} alt={game.name} />
                    </ModalContent>
                </ScreenshotModal>
            )}
        </StyledGameDetail>
    )
}

const StyledGameDetail = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: #1b1b1b;
`;

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    max-height: 90vh;
    overflow-y: auto;
    img {
        width: 100%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 2rem;
        height: 2rem;
        display:inline
    }
`;

const Info = styled(motion.div)`
    text-align: center;
`;

const Platforms = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const Media = styled(motion.div)`
    margin-top: 5rem;
    img {
        width: 100%;
    }
`;

const Description = styled(motion.div)`
    margin: 5rem 0rem;
    
    h3 {
        color: #333;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
    
    h4 {
        color: #555;
        margin: 2rem 0 1rem 0;
        font-size: 1.2rem;
    }
    
    p {
        line-height: 1.8;
        color: #666;
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    
    div {
        line-height: 1.8;
        color: #666;
        font-size: 1rem;
    }
    
    .additional-info {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #f8f8f8;
        border-radius: 0.5rem;
        border-left: 4px solid #ff7676;
    }
`;

const LoadingMessage = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-size: 2rem;
    color: white;
`;

const BackButton = styled(motion.button)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #ff7676;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
    
    &:hover {
        background: #ff5252;
        transform: translateY(-2px);
    }
    
    span {
        font-weight: 600;
    }
`;

const PlatformIcon = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #f0f0f0;
    border-radius: 0.5rem;
    min-width: 80px;
    
    img {
        width: 24px;
        height: 24px;
    }
    
    span {
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
    }
`;

// Platform icon function
const getPlatformIcon = (platformName) => {
    console.log('Platform Name:', platformName); // Debug için
    const icons = {
        'PC': <img src={PCIcon} alt="PC" />,
        'PlayStation 5': <img src={PlayStationIcon} alt="PlayStation" />,
        'PlayStation 4': <img src={PlayStationIcon} alt="PlayStation" />,
        'Xbox Series S/X': <img src={XboxIcon} alt="Xbox" />,
        'Xbox One': <img src={XboxIcon} alt="Xbox" />,
        'Xbox Series X': <img src={XboxIcon} alt="Xbox" />,
        'Xbox Series S': <img src={XboxIcon} alt="Xbox" />,
        'Nintendo Switch': <img src={NintendoIcon} alt="Nintendo" />,
        'Nintendo 3DS': <img src={NintendoIcon} alt="Nintendo" />,
        'Nintendo 64': <img src={NintendoIcon} alt="Nintendo" />,
        'Nintendo DS': <img src={NintendoIcon} alt="Nintendo" />,
        'Nintendo GameCube': <img src={NintendoIcon} alt="Nintendo" />,
        'Nintendo Wii': <img src={NintendoIcon} alt="Nintendo" />,
        'Mac': <img src={MacIcon} alt="Mac" />,
        'macOS': <img src={MacIcon} alt="macOS" />,
        'Apple Macintosh': <img src={MacIcon} alt="Mac" />,
        'Linux': <img src={LinuxIcon} alt="Linux" />,
    };
    
    return icons[platformName] || <img src={PCIcon} alt="Platform" />;
};

const Gallery = styled(motion.div)`
    margin: 3rem 0rem;
    padding: 2rem 0rem;
    border-top: 2px solid #f0f0f0;
    
    h3 {
        color: #333;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
`;

const ScreenshotGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
    width: 100%;
`;

const ScreenshotItem = styled(motion.div)`
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    background: #f8f8f8;
    min-height: 150px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        transition: transform 0.3s ease;
        display: block;
    }
    
    &:hover img {
        transform: scale(1.1);
    }
`;

const ScreenshotModal = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled(motion.button)`
    position: absolute;
    top: -50px;
    right: -50px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    z-index: 1001;
    
    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }
`;

const ModalImage = styled(motion.img)`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
`;


export default GameDetail;  