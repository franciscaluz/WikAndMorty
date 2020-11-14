import React from 'react';
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import NavigationModal from './modals/NavigationModal'
import { Navbar, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Navigation = () => {
    return (
        <Wrapper>
            <Navbar expand="xs" className="px-0">
                <NavbarBrand href="/">
                    Wik<span> & </span>Morty
                </NavbarBrand>
                <Nav className="navbar-center d-none d-lg-flex" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Informations
                            </DropdownToggle>
                        <DropdownMenu right>
                            <Link to="/character" className="dropdown-item">
                                Personnages
                                </Link>
                            <DropdownItem disabled>Planètes</DropdownItem>
                            <DropdownItem disabled>Episodes</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <Nav className="navbar-right d-none d-lg-flex" navbar>
                    <NavItem>
                        <Link to="#" className="btn btn-theme-white">Connexion</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="#" className="btn btn-theme-secondary-alt">S'enregistrer</Link>
                    </NavItem>
                </Nav>
                <div className="navigation-mobile-modal-wrapper d-lg-none">
                    <NavigationModal />
                </div>
            </Navbar>
        </Wrapper>
    );
};

export default Navigation;
const Wrapper = styled.div`
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-brand {
    font-size: 22px;
    text-transform: uppercase;
    color: #312651;
    flex: 0 1 30%;
    font-weight: 300;

    span {
        color: #8BD4F5;
    }
}

.navbar-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 1 40%;
}

.navbar-right {
    display: flex;
    justify-content: flex-end;
    flex: 0 1 30%;

    .btn {
        pointer-events: none;
    }
}

.nav-link {
    font-weight: 500;
    color: #312651 !important;
    &:hover {
        background: 
    }
}
`;
