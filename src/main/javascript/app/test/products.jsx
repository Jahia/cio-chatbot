import React from "react";
import gqlQueries from "../gqlQueries";
import {graphql} from "react-apollo/index";
import {withApollo} from "react-apollo";
import { compose } from 'react-apollo';
import { Grid, Row, Col } from 'react-bootstrap';
import "./Product.css"

class Products extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
		
        if (this.props.fetchProducts.error) {
            return this.props.fetchProducts.error.message;
        }

        const prods = this.props.fetchProducts.products ? this.props.fetchProducts.products : [];

  return <Grid className="product-container" fluid="true">
				<Row className="product-row">
				{
					prods.map((prod) => (
					<Col xs={6} md={4} lg={4}>
						<div className="product-card">
							<div className="product">
								<Row className="product-row product-header">
									<Col xs={12} className="product-match-high">High
										Match</Col>
								</Row>
								<Row className="product-row">
									<Col xs={12} className="product-img-wrapper">
										<img className="product-img"
											src={"https://demo.commerceio.jahia.com"+prod.images[1].url}/>
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
            variables  : {
                "conversationId": props.dxContext.conversationId
            }
        }
    }
});

export default withApollo(ProductsQuery(Products));