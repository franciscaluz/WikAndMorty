import React from 'react';
import styled from 'styled-components/macro'
import { Container } from 'reactstrap';

const Footer = () => {
    return (
        <Wrapper>
            <Container>
                <p>Wik & Morty - FA/VS © copyright.2020</p>
            </Container>
        </Wrapper>
    );
};

export default Footer;
const Wrapper = styled.div`
@media(max-width:767.98px){
    p{
        font-size: 12px;
    }
}
`;
