import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro'
import BaseScreen from './BaseScreen'
import { withRouter, Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { API } from "../constantes";
import cardBg from '../assets/images/character-bg.svg'
import CharacterAddModal from '../components/modals/CharacterAddModal';
import Default from "../assets/images/default-empty.jpeg"

const CharacterScreen = () => {
    const [donneesRecues, setDonneesRecues] = useState([]);

    useEffect(() => {
        getCharacter();
    }, []);

    async function getCharacter() {
        try {
            const response = await fetch(API);
            const reponseDeApi = await response.json();
            setDonneesRecues(reponseDeApi);
            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <BaseScreen>
            <Wrapper>
                <div className="page-header">
                    <h1 className="page-title page-title-alt">Personnages</h1>
                    <CharacterAddModal getCharacter={getCharacter} />
                </div>
                <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-xl-3 character-row">
                    {donneesRecues.map((donneesRecues, index) => {
                        const { _id, name, image, status, origin } = donneesRecues;
                        return (
                            <div key={_id} className="col character-col">
                                <Link to={'/character/' + _id}>
                                    <Card>
                                        <div className="card-inner">
                                            <div className="card-background">
                                                <div className="card-image-wrapper">
                                                    <div className="image-ratio-1">
                                                        {image === '' ?
                                                            <div className="img-wrapper" style={{ backgroundImage: `url(${Default})` }}> </div>
                                                            : <div className="img-wrapper" style={{ backgroundImage: `url(${image})` }}> </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="card-character-id">
                                                    <h4>{index + 1}</h4>
                                                </div>
                                            </div>
                                            <CardBody>
                                                <CardTitle>
                                                    <h3 className="mb-0">{name}</h3>
                                                </CardTitle>
                                                <CardSubtitle>
                                                    <span className="character-page-field-title">Statut:</span> {status} <br />
                                                    <span className="character-page-field-title">Origine:</span> {origin}
                                                </CardSubtitle>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </Wrapper>
        </BaseScreen >
    );
};

export default withRouter(CharacterScreen);
const Wrapper = styled.div`
.character-row {
    align-content: stretch;
}

.character-col {
    margin-bottom: 30px;

    a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: #9a9a9a;
        border-radius: 10px;
        box-shadow: 4px 4px 10px 0px rgba(0,0,0,0.2);
        transform: scale(1);
        transition: all .3s ease;

        &:hover {
            text-decoration: none;
            transform: scale(1.05);
            box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.2);
        }
    }
}

.card {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    background-image: url(${cardBg});
    background-repeat: no-repeat;
    background-size: 100%;
    border: none;
}

.card-background {
    position: relative;
    width: 100%;
    height: 91px;
}

.card-character-id {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 50px;
    width: 29px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #604CA5;
    border-radius: 10px;

    h4 {
        margin-bottom: 0;
        color: #fff;
    }
}

.card-image-wrapper {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100px;
    z-index: 3;

    .image-ratio-1 {
        border-radius: 100%;
        border: 5px solid #ffffff;
    }
}

.card-body {
    display: flex;
    flex-direction: column;
    padding: 50px 1.25rem 1.25rem;
}

.card-subtitle {
    margin-bottom: 20px;
    flex-grow: 1;
}

.button-container {
    .btn:first-of-type {
        margin-right: 10px;
    }
}

@media(max-width: 767.98px) {
    .page-header {
        flex: direction: column;
    }
}
`;
