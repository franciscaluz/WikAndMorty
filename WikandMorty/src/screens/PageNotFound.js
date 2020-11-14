import React from 'react';
import styled from 'styled-components/macro';
import BaseScreen from './BaseScreen';
import { Row, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { FiArrowLeftCircle } from "react-icons/fi";

const PageNotFound = () => {
    const history = useHistory();
    return (
        <BaseScreen>
            <Wrapper>
                <Row className="flex-column-reverse flex-md-row">
                    <Col md={6}>
                        <img src={require('../assets/images/pickle-rick.gif')} alt="pickle rick..." className="img-fluid" />
                    </Col>
                    <Col md={6} className="text-center text-md-left mb-5 mb-md-0">
                        <h1 className="display-1 mb-0"><span className="underline--magical">404</span></h1>
                        <h2 className="mb-5">Oh ben! On dirait que cette page n'existe pas...</h2>
                        <Button onClick={() => history.goBack()} className="btn btn-theme-primary-alt">
                            <span className="icon"><FiArrowLeftCircle /></span>
                            Retour
                        </Button>
                    </Col>
                </Row>
            </Wrapper>
        </BaseScreen>
    );
};

export default PageNotFound;
const Wrapper = styled.div`
.display-1 {
    font-size: 10rem;
}

@media(max-width: 991.98px) {
    .display-1 {
        font-size: 70px;
    }

    h2 {
        font-size: 24px;
    }
}

@media(max-width: 767.98px) {

}
`;
