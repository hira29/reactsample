import React, {Component} from 'react';
import Axios from "axios";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Container, Row, Col, CardDeck,
} from 'reactstrap';
import CarouselComponent from "../components/carousel-2";

const uri = 'http://localhost:6996'

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        Axios.get(uri + "/products")
            .then( (x)=> {
                    console.log("Data: ", x.data);
                    this.setState({
                        productData: x.data
                    })
                }
            )
            .catch( (err) => {
                console.log("Error: ", err)
            });
    }

    productsViews = () => {
        return this.state.productData.map((item, index) => {
            return(
                <Col sm="12" md="6" lg="4" xl="4" key={index}>
                    <Card style={{marginTop: "15px", marginLeft: "5px", marginRight: "5px"}}>
                        <div>
                            <CarouselComponent style={{width: "100%"}} dataSlider={item.images} />
                        </div>
                        <CardBody style={{marginTop: "12px",fontSize: "12px"}}>
                            <CardTitle >
                                <h2>{item.name}</h2>
                            </CardTitle>
                            <CardSubtitle>
                                <h4>{item.brand}</h4>
                            </CardSubtitle>
                            <CardText style={{width: "280px", marginTop: "8px",display: "-webkit-box", webkitLineClamp: "5", webkitBoxOrient: "vertical", overflow: "hidden"}}>
                                <p>{item.description}</p>
                            </CardText>
                            <h5 style={{fontSize: "12px"}}>Category : {item.category}</h5>
                            <h5 style={{fontSize: "12px"}}>Price    : IDR {item.price}</h5>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    }

    render() {
        return (
            <div style={{marginLeft: "12px", marginRight: "10px"}}>
                <Row>
                    {this.productsViews()}
                </Row>
            </div>
        );
    }
}

export default ProductPage;
