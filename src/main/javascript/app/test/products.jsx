import React from "react";
import gqlQueries from "../gqlQueries";
import {graphql} from "react-apollo/index";
import {withApollo} from "react-apollo";
import {Col, Grid, Row} from 'react-bootstrap';
import "./Product.css"

class Products extends React.Component {

    constructor(props) {
        super(props);
        let grantedConsent = false;
        let displayModal   = false;
        if (window.cxs !== undefined && window.cxs.consents !== undefined) {
            const consents = window.cxs.consents;
            let keys       = Object.keys(consents);
            if (keys.length > 0) {
                if (consents["apparel-uk/outofstock"] !== undefined) {
                    // Check if consent is granted or not
                    grantedConsent = (consents["apparel-uk/outofstock"].status === "GRANTED");
                } else {
                    displayModal = true;
                }
            } else {
                displayModal = true;
            }
        }
        this.state = {
            hasGrantedConsent : grantedConsent,
            consentText       : (grantedConsent ? "You have consented to the usage of your email to receive information about product out of stock." : "You have not consented to the usage of your email to receive information about product out of stock."),
            shouldDisplayModal: displayModal
        };
        var $this  = this;
        if (window.manageWemPrivacy !== undefined) {
            let privacyHandler      = {
                set: function (obj, prop, value) {
                    console.log("calling proxy setter", prop, value);
                    let oldVal = obj[prop];
                    if (prop === "modelAlreadyOpen" && value !== oldVal) {
                        if (window.cxs !== undefined && window.cxs.consents !== undefined) {
                            const consents = window.cxs.consents;
                            let keys       = Object.keys(consents);
                            if (keys.length > 0) {
                                if (consents["apparel-uk/outofstock"] !== undefined) {
                                    // Check if consent is granted or not
                                    let consentText = "You have not consented to the usage of your email to receive information about product out of stock.";
                                    if (consents["apparel-uk/outofstock"].status === "GRANTED") {
                                        consentText = "You have consented to the usage of your email to receive information about product out of stock.";
                                    }
                                    $this.setState({
                                        hasGrantedConsent : consents["apparel-uk/outofstock"].status === "GRANTED",
                                        consentText       : consentText,
                                        shouldDisplayModal: false
                                    })
                                }
                            }
                        }
                    }
                    obj[prop] = value;
                }
            };
            window.manageWemPrivacy = new Proxy(window.manageWemPrivacy, privacyHandler);
        }
    }

    render() {

        if (this.props.fetchProducts.error) {
            return this.props.fetchProducts.error.message;
        }

        const prods = this.props.fetchProducts.products ? this.props.fetchProducts.products : [];

        if (this.state.shouldDisplayModal && window.manageWemPrivacyInstances !== undefined) {
            let privacyInstance          = window.manageWemPrivacyInstances[Object.keys(window.manageWemPrivacyInstances)[0]];
            privacyInstance.captiveModal = true;
            privacyInstance.openModal(true);
        }

        return <Grid className="product-container" fluid={true}>
            <Row className="product-row">
                <Col xs={12} md={12} lg={12}>
                    <div
                        className={this.state.hasGrantedConsent ? "alert alert-success" : "alert alert-warning"}>{this.state.consentText}</div>
                </Col>
            </Row>
            <Row className="product-row">
                {
                    prods.map((prod) => (
                        <Col xs={6} md={4} lg={4} key={prod.sku}>
						<a href={"https://demo.commerceio.jahia.com" + prod.vanityUrl} target="_blank"> 
                            <div className="product-card">
                                <div className="product">
                                    <Row className="product-row product-header">
                                        <Col xs={12} className="product-match-high">High
                                            Match</Col>
                                    </Row>
                                    <Row className="product-row">
                                        <Col xs={12} className="product-img-wrapper">
                                            <img className="product-img"
                                                 src={"https://demo.commerceio.jahia.com" + prod.images[1].url}/>
                                        </Col>
                                    </Row>
                                    <Row className="product-row">
                                        <div className="product-name-wrapper">
                                            <Col xs={12} className="product-name">
                                                <span>{prod.name}</span>
                                            </Col>
                                            <Col xs={12} className="product-price">
                                                <span>{prod.price.formattedValue}</span>
                                            </Col>
                                        </div>
                                    </Row>
                                </div>
                            </div>
						</a>
                        </Col>
                    ))
                }
            </Row>
        </Grid>
    }
}

const ProductsQuery = graphql(gqlQueries.PRODUCT_QUERY, {
    name: 'fetchProducts',
    options(props) {
        return {
            variables: {
                "conversationId": props.dxContext.conversationId,
                "profileId"     : props.dxContext.profileId
            }
        }
    }
});

export default withApollo(ProductsQuery(Products));