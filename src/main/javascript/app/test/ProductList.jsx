import React from "react";
import {I18nextProvider} from 'react-i18next';
import {ApolloProvider} from 'react-apollo';
import {DxContext} from "../DxContext.jsx";
import Products from './products.jsx';
import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import _ from "lodash";


const client = (props => {
    const link = new HttpLink({
        uri: props.dxContext.servletContext + '/modules/graphql'
    });

    return new ApolloClient({
        link: link,
        cache: new InMemoryCache()
    });
});

class ProductList extends React.Component {

    render() {
		
        let {dxContext, conversationId, profileId} = this.props;
        return <ApolloProvider client={client(this.props)}>
                        <DxContext.Provider value={dxContext}>
                            { _.isNil(conversationId) || _.isNil(profileId) ?
                                (<span>Please type in your words to search products</span>)
                                :
                                (<Products dxContext={dxContext}
                                           conversationId={conversationId}
                                           profileId={profileId}/>)
                            }
                        </DxContext.Provider>
                </ApolloProvider>
    }

}

export default ProductList;