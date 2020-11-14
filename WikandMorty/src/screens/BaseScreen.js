import React from 'react';
import styled from 'styled-components/macro'
import { Container } from 'reactstrap';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


const BaseScreen = ({ children }) => {
    return (
        <Wrapper>
            <Container>
                <Navigation />
            </Container>
            <div className="page-wrapper">
                <Container>
                    {children}
                </Container>
            </div>
            <Footer />
        </Wrapper>
    );
};

export default BaseScreen;
const Wrapper = styled.div``;