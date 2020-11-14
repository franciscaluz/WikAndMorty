import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, Navbar, Nav, NavItem } from 'reactstrap';
import { FiX, FiMenu } from 'react-icons/fi'


const NavigationModal = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}><FiX /></button>;

    return (
        <div className="modal-navigation-wrapper">
            <Button color="icon-nav" onClick={toggle}>
                <FiMenu />
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="navigation-mobile-modal" size="lg" modalClassName="left">
                <ModalHeader toggle={toggle} close={closeBtn}> </ModalHeader>
                <ModalBody>
                    <Navbar>
                        <Nav navbar className="top-navigation">
                            <NavItem>
                                <NavLink to="/character" className="nav-link">
                                    Personnages
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#" className="nav-link disabled">
                                    Planètes
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#" className="nav-link disabled">
                                    Épisodes
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="bottom-navigation">
                            <NavItem>
                                <NavLink to="#" className="nav-link disabled">
                                    Connexion
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#" className="nav-link disabled">
                                    S'enregistrer
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default NavigationModal;