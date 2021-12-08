import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#3b4044' }}>
            <Container>
                <Row>
                    <Col className="text-center p-3" sm={12} style={{ color: 'white' }}>Email - garg.sid6665@gmail.com</Col>
                
                    <Col className="text-center p-3" sm={12} style={{ color: 'white' }}>LinkedIn - <a style={{ color: 'white', textDecoration: 'none' }} href='https://www.linkedin.com/in/siddharth-garg6665/'>https://www.linkedin.com/in/siddharth-garg6665/</a> </Col>
                </Row>
                <Row>
                    <Col className="text-center p-3" style={{ color: 'white' }}>
                        Copyright &copy; YourEShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
