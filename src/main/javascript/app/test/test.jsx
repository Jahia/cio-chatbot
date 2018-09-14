import React from "react";
import gqlQueries from "../gqlQueries";
import {graphql} from "react-apollo/index";
import {withApollo} from "react-apollo";
import { compose } from 'react-apollo';

class Test extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
		
        if (this.props.fetchSites.error) {
            return this.props.fetchSites.error.message;
        }

        const sites = this.props.fetchSites.jcr ? this.props.fetchSites.jcr.nodeByPath.children.nodes : [];

        return <React.Fragment>
            <h4>Available sites</h4>
                <ul>
                    {
                        sites.map((site) => (
                            <li key={ site.name } >{ site.displayName }</li>
                        ))
                    }
                </ul>
            </React.Fragment>
    }
}



const SiteQuery = graphql(gqlQueries.SITE_QUERY, {
    name: 'fetchSites',
    options(props) {
        return {
            variables  : {
                path: "/sites"
            }
        }
    }
});

const WatsonQuery = graphql(gqlQueries.Watson_QUERY, {
    name: 'fetchWatson',
    options(props) {
        return {
            variables  : {
                message: "hello",
				conversationId	: "qdsdqsd"			
            }
        }
    }
});
/*  export default compose(
  withApollo(SiteQuery),
  withApollo(WatsonQuery)
)(Test);  */

export default withApollo(SiteQuery(Test));