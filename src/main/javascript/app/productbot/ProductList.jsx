import React from "react";
import {ApolloProvider} from 'react-apollo';
import {DxContext} from "../DxContext.jsx";
import Products from './products.jsx';
import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ConversationContext} from "./App";
import _ from "lodash";

const client = (props => {
    const link = new HttpLink({
        uri: props.dxContext.servletContext + '/modules/graphql'
    });

    return new ApolloClient({
        link : link,
        cache: new InMemoryCache()
    });
});

class ProductList extends React.Component {

    render() {

        let {dxContext, conversationId, profileId} = this.props;
        return (<ApolloProvider client={client(this.props)}>
            <DxContext.Provider value={dxContext}>
                { _.isNil(conversationId) || _.isNil(profileId) ?
                    (<span style={{paddingTop: 35, fontSize: 69}}><i className="fas fa-box"></i></span>)
                    :
                    (<Products dxContext={dxContext}
                                                    conversationId={conversationId}
                                                    profileId={profileId}/>
                    )
                }

            </DxContext.Provider>
        </ApolloProvider>)
    }

}

export default ProductList;