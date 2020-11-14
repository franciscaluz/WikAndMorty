import React, { useState } from "react";
import { useParams, withRouter } from 'react-router-dom'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { FiEdit, FiX } from 'react-icons/fi';
import Default from "../../assets/images/default-empty.jpeg"
import { API } from "../../constantes";
import { toast } from "react-toastify"

const CharacterEditModal = (props) => {
    const { donneesRecues, getCharacterInfos } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}><FiX /></button>;
    const characterId = useParams().id;
    const [photos, setPhotos] = useState("");

    async function editCharacter(nom, statut, genre, espece, type_espece, origine, emplacement, photo, id) {
        try {
            const response = await fetch(API + characterId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    /* id: id, */
                    name: nom,
                    status: statut,
                    gender: genre,
                    species: espece,
                    type: type_espece,
                    origin: origine,
                    location: emplacement,
                    image: photo,
                })
            });
            if (response.ok) {
                props.history.push(`/character/${characterId}`);
                toast.success("Modification du personnage " + nom);
                getCharacterInfos()
                return response;
            }
            throw new Error('Request failed!');
        }
        catch (error) {
            console.log(error);
        }
    }

    function handleEdit(event) {
        event.preventDefault();

        const nom = document.getElementById('nom_personnage').value;
        const statut = document.getElementById('statut_personnage').value;
        const genre = document.getElementById('genre_personnage').value;
        const espece = document.getElementById('espece_personnage').value;
        const type_espece = document.getElementById('type_personnage').value;
        const origine = document.getElementById('origine_personnage').value;
        const emplacement = document.getElementById('emplacement_personnage').value;
        const photo = document.getElementById('photo_personnage').value;

        editCharacter(nom, statut, genre, espece, type_espece, origine, emplacement, photo);
        toggle()
    }

    function handlePhoto(event) {
        const photos = document.getElementById('photo_personnage').value;
        setPhotos(photos);
    }

    return (
        <>
            <Button color="cta-primary" onClick={toggle}>
                <span className="btn-icon-wrap"><FiEdit /></span>
                <span className="desktop-text">Modifier</span>
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="custom-modal-form" size="lg">
                <Form>
                    <ModalHeader toggle={toggle} close={closeBtn}>Modifier le personnage</ModalHeader>
                    <ModalBody>
                        <Row form>
                            <Col md={12}>
                                <div className="modal-form-photo-wrapper">
                                    <div className="modal-character-image-wrapper">
                                        <div className="image-ratio-1">
                                            {photos
                                                ? <div className="img-wrapper" style={{ backgroundImage: `url(${photos})` }}></div>
                                                : donneesRecues.image !== ""
                                                    ? <div className="img-wrapper" style={{ backgroundImage: `url(${donneesRecues.image})` }}></div>
                                                    : <div className="img-wrapper" style={{ backgroundImage: `url(${Default})` }}></div>
                                            }
                                        </div>
                                    </div>

                                    <FormGroup className="w-100">
                                        <Label for="photo_personnage">Photo</Label>
                                        <Input type="url" id="photo_personnage" name="photo_personnage" defaultValue={donneesRecues.image} onBlur={handlePhoto} placeholder="Entrez une URL valide" />
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="nom_personnage">Nom complet</Label>
                                    <Input type="text" name="nom_personnage" id="nom_personnage" defaultValue={donneesRecues.name} placeholder="Entrez le prénom et le nom" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="genre_personnage">Genre</Label>
                                    <Input type="text" name="genre_personnage" id="genre_personnage" defaultValue={donneesRecues.gender} placeholder="Entrez le genre" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="statut_personnage">Statut</Label>
                                    <Input type="text" name="statut_personnage" id="statut_personnage" defaultValue={donneesRecues.status} placeholder="Entrez le statut" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="espece_personnage">Espèce</Label>
                                    <Input type="text" name="espece_personnage" id="espece_personnage" defaultValue={donneesRecues.species} placeholder="Entrez l'espèce" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="type_personnage">Type d'espèce</Label>
                                    <Input type="text" name="type_personnage" id="type_personnage" defaultValue={donneesRecues.type} placeholder="Entrez le type d'espèce" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="origine_personnage">Planète d'origine</Label>
                                    <Input type="text" name="origine_personnage" id="origine_personnage" defaultValue={donneesRecues.origin} placeholder="Nom de la planète d'origine" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="emplacement_personnage">Emplacement Actuel</Label>
                                    <Input type="text" name="emplacement_personnage" id="emplacement_personnage" defaultValue={donneesRecues.location} placeholder="Entrez l'emplacement actuel" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="theme-secondary" onClick={toggle}>Annuler</Button>
                        <Button color="theme-primary" type="submit" onClick={handleEdit}>Modifier</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}

export default withRouter(CharacterEditModal);