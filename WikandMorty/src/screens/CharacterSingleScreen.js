import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro'
import { withRouter, useParams, Link } from 'react-router-dom'
import { API } from "../constantes";
import BaseScreen from './BaseScreen'
import { Row, Col } from 'reactstrap';
import CharacterEditModal from '../components/modals/CharacterEditModal';
import { FiArrowLeftCircle } from "react-icons/fi";
import singleCharacterBg from '../assets/images/character-single-bg.svg'
import CharacterDeleteModal from '../components/modals/CharacterDeleteModal';
import Default from "../assets/images/default-empty.jpeg"

const CharacterSingleScreen = () => {
    const [donneesRecues, setDonneesRecues] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const characterId = useParams().id;
    /* const {id: characterId} = useParams() */

    async function getCharacterInfos() {
        setIsLoading(true)
        try {
            const response = await fetch(API + characterId);
            const reponseDeApi = await response.json();
            setDonneesRecues(reponseDeApi);
            setIsLoading(false)
            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCharacterInfos();
        return () => { }
    }, [characterId]);

    console.log({ donneesRecues });

    return (
        <BaseScreen>
            <Wrapper className="character-single-wrapper">
                {!isLoading && <div>
                    <Row>
                        <Col md="6">
                            <div className="character-single-image-wrapper">
                                <div className="image-ratio-1">
                                    {donneesRecues.image === "" ?
                                        <div className="img-wrapper" style={{ backgroundImage: `url(${Default})` }}></div>
                                        : <div className="img-wrapper" style={{ backgroundImage: `url(${donneesRecues.image})` }}></div>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col md="6" className="d-flex align-items-center">
                            <div className="character-single-info-wrapper">
                                <h2>{donneesRecues.name}</h2>
                                <span className="character-page-field-title">Statut</span>
                                <p>{donneesRecues.status}</p>
                                <span className="character-page-field-title">Genre</span>
                                <p>{donneesRecues.gender}</p>
                                <span className="character-page-field-title">Espèce</span>
                                <p>{donneesRecues.species}</p>
                                <span className="character-page-field-title">Type</span>
                                <p>{donneesRecues.type ? donneesRecues.type : "--"}</p>
                                <span className="character-page-field-title">Planète d'origine</span>
                                <p>{donneesRecues.location}</p>
                                <span className="character-page-field-title">Emplacement</span>
                                <p>{donneesRecues.origin}</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="button-container">
                        <Link to="/character" className="btn btn-theme-primary"><span className="icon"><FiArrowLeftCircle /></span>Retour</Link>
                        <div className="button-container-cta-wrapper">
                            <CharacterDeleteModal />
                            <CharacterEditModal getCharacterInfos={getCharacterInfos} donneesRecues={donneesRecues} />
                        </div>
                    </div>
                </div>
                }
            </Wrapper>
        </BaseScreen>
    );
};

export default withRouter(CharacterSingleScreen);
const Wrapper = styled.div`
padding: 30px;
border-radius: 10px;
overflow: hidden;
background-image: url(${singleCharacterBg});
background-repeat: no-repeat;
background-size: 100%;
box-shadow: 4px 4px 10px 0px rgba(0,0,0,0.2);

.character-single-image-wrapper {
    margin-bottom: 30px;
    .image-ratio-1 {
        border-radius: 100%;
    }
}

.character-page-field-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 700;
}

.button-container {
    display:flex;
    align-items: center;
    justify-content: space-between;
}

.button-container-cta-wrapper {
    display: flex;
    align-items: center;

    .btn:first-of-type {
        margin-left: 10px;
    }
}

@media(max-width: 767.98px) {
    padding: 15px;
}
`;