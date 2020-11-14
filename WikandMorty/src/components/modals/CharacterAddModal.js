import React, { useState } from "react";
import { withRouter, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FiPlus, FiX } from 'react-icons/fi'
import { API } from "../../constantes";
import { toast } from "react-toastify"
import Default from "../../assets/images/default-empty.jpeg"
import { AvForm, AvField } from 'availity-reactstrap-validation';

const CharacterAddModal = (props) => {
    const { getCharacter } = props;
    const [modal, setModal] = useState(false);
    const [state, setState] = useState({})
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}><FiX /></button>;
    const [photos, setPhotos] = useState("");
    let history = useHistory();

    async function addCharacter(nom, statut, genre, espece, type, origine, emplacement, photo, ) {
        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nom,
                    status: statut,
                    gender: genre,
                    species: espece,
                    type: type,
                    origin: origine,
                    location: emplacement,
                    image: photo,
                })
            });

            console.log({ response });
            if (response.ok) {
                history.push("/character");
                toast.success("Ajout du personnage " + nom);
                console.log("response", response);
                getCharacter();
                return response;
            }
            throw new Error('Request failed!');
        }
        catch (error) {
            console.log(error);
        }
    }

    function handlePhoto(event) {
        const photos = document.getElementById('photo_personnage').value;
        setPhotos(photos);
    }

    function handleValidSubmit(event, values) {
        event.preventDefault();
        const nom = document.getElementById('nom_personnage').value;
        const statut = document.getElementById('statut_personnage').value;
        const genre = document.getElementById('genre_personnage').value;
        const espece = document.getElementById('espece_personnage').value;
        const type = document.getElementById('type_personnage').value;
        const origine = document.getElementById('origine_personnage').value;
        const emplacement = document.getElementById('emplacement_personnage').value;
        const photo = document.getElementById('photo_personnage').value;

        addCharacter(nom, statut, genre, espece, type, origine, emplacement, photo);
        toggle();
    }

    function handleInvalidSubmit(event, errors, values) {
        setState({
            nom_personnage: values.nom_personnage,
            errors: true,
        });
    }

    return (
        <div className="modal-add-wrapper">
            <Button color="cta-primary" onClick={toggle}>
                <span className="btn-icon-wrap"><FiPlus /></span>
                <span className="desktop-text">Ajouter</span>
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="custom-modal-form" size="lg">
                <ModalWrapper>
                    <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
                        <ModalHeader toggle={toggle} close={closeBtn}>Ajouter un personnage</ModalHeader>
                        <ModalBody>
                            <Row form>
                                <Col md={12}>
                                    <div className="modal-form-photo-wrapper">
                                        <div className="modal-character-image-wrapper">
                                            <div className="image-ratio-1">
                                                {photos ?
                                                    <div className="img-wrapper" style={{ backgroundImage: `url(${photos})` }}></div>
                                                    : <div className="img-wrapper" style={{ backgroundImage: `url(${Default})` }}></div>
                                                }
                                            </div>
                                        </div>
                                        <FormGroup className="w-100">
                                            <Label for="photo_personnage">Photo</Label>
                                            <Input type="url" id="photo_personnage" name="photo_personnage" placeholder="Entrez un URL valide" onBlur={handlePhoto} />
                                            <FormText>Ex: https://rickandmortyapi.com/api/character/avatar/199.jpeg</FormText>
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="nom_personnage">Nom complet<span className="form-required">*</span></Label>
                                        <AvField type="text" name="nom_personnage" id="nom_personnage" placeholder="Entrez le prénom et le nom" required
                                            errorMessage="Ce champs est requis"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="genre_personnage">Genre</Label>
                                        <Input type="text" name="genre_personnage" id="genre_personnage" placeholder="Entrez le genre" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="statut_personnage">Statut</Label>
                                        <Input type="text" name="statut_personnage" id="statut_personnage" placeholder="Entrez le statut" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="espece_personnage">Espèce</Label>
                                        <Input type="text" name="espece_personnage" id="espece_personnage" placeholder="Entrez l'espèce" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="type_personnage">Type d'espèce</Label>
                                        <Input type="text" name="type_personnage" id="type_personnage" placeholder="Entrez le type d'espèce" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="origine_personnage">Planète d'origine</Label>
                                        <Input type="text" name="origine_personnage" id="origine_personnage" placeholder="Nom de la planète d'origine" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="emplacement_personnage">Emplacement Actuel</Label>
                                        <Input type="text" name="emplacement_personnage" id="emplacement_personnage" placeholder="Entrez l'emplacement actuel" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="theme-secondary" onClick={toggle}>Annuler</Button>
                            <Button color="theme-primary" type="submit">Ajouter</Button>
                        </ModalFooter>
                    </AvForm>
                </ModalWrapper>
            </Modal>
        </div>
    );
}

export default withRouter(CharacterAddModal);

const ModalWrapper = styled.div``