import React, { useState } from "react";
import { useParams, withRouter } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FiTrash2, FiX } from 'react-icons/fi'
import deleteImg from '../../assets/images/morty-snout.png'
import { API } from "../../constantes";
import { toast } from "react-toastify"

const CharacterDeleteModal = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}><FiX /></button>;
    const characterId = useParams().id;

    async function removeCharacter() {
        try {
            const response = await fetch(API + characterId, {
                method: 'delete',
            });
            if (response.ok) {
                props.history.push(`/character`);
                toggle()
                toast.error("Suppression du personnage ");
                return response;
            }
            throw new Error('Request failed!');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal-delete-wrapper">
            <Button color="cta-secondary" onClick={toggle}>
                <span className="btn-icon-wrap"><FiTrash2 /></span>
                <span className="desktop-text">Supprimer</span>
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="custom-modal-form">
                <ModalWrapper>
                    <ModalHeader toggle={toggle} close={closeBtn}> </ModalHeader>
                    <ModalBody>
                        <div className="modal-delete-content">
                            <img src={deleteImg} alt="delete" className="img-fluid" />
                            <h3 className="mb-0">Êtes-vous sûr de vouloir supprimer ce personnage?</h3>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="theme-secondary" onClick={toggle}>Annuler</Button>
                        <Button color="theme-primary" onClick={removeCharacter}>Supprimer</Button>
                    </ModalFooter>
                </ModalWrapper>
            </Modal>
        </div>
    );
};

export default withRouter(CharacterDeleteModal);

const ModalWrapper = styled.div`
.modal-delete-content {
    display: flex;
    align-items: center;
    padding: 0 5%;

    img {
        max-width: 125px;
        margin-right: 30px;   
    }

    @media(max-width:575.98px) {
        flex-direction: column;
        align-items: center;

        h3 {
            font-size: 16px;
            text-align: center;
        }

        img{
            margin-right:0;
            margin-bottom: 15px;
        }
    }
}
`;
