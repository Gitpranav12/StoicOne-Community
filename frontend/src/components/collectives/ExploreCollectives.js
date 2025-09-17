import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Layout from "../../Layout/Layout"; // 1. Import the standard Layout

const ExploreCollectives = () => {
    const [collectives, setCollectives] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/collectives")
            .then(res => res.json())
            .then(data => setCollectives(data.data))
            .catch(err => console.error("Error fetching collectives:", err));
    }, []);

    return (
        // 2. Wrap everything in the Layout component
        <Layout>
            {/* 3. Your page's main content goes directly inside */}
            <Container fluid className="my-4 px-3 px-md-5">
                <div>
                    <h1 className="mb-3">Explore all Collectives</h1>
                    <p>
                        Collectives™ helps you find trusted answers faster, engage with product experts, and share knowledge around the technologies you use most.
                    </p>
                    <Button variant="primary" className="mb-4">Learn more about Collectives</Button>

                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {collectives.map((collective, index) => (
                            <Col key={index}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <div className="d-flex align-items-center mb-3">
                                            <img src={collective.icon} alt={collective.name} style={{ width: "40px", height: "40px", marginRight: "12px" }} />
                                            <div>
                                                <Card.Title className="mb-0">{collective.name}</Card.Title>
                                                <small className="text-muted">{collective.members}</small>
                                            </div>
                                        </div>
                                        <Card.Text style={{ fontSize: "0.9rem" }}>
                                            {collective.description}
                                        </Card.Text>
                                        <Button variant="outline-primary" size="sm">Join</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </Layout>
    );
};

export default ExploreCollectives;