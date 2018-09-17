import gql from 'graphql-tag';

const gqlQueries = {
    SITE_QUERY: gql`query Sites($path: String!){
        jcr {
            nodeByPath(path: $path) {
              displayName  
              name
              path
              children {
                nodes {
                  displayName
                  name
                }
              }
            }
          }
    }`
	
/* 	,Watson_QUERY: gql`query watson($message: String!,$conversationId : String){
		sendMessage(message:$message, conversationId:$conversationId){
			conversationId
			entities
			intents
			outputMessages
		}
	}` */

	,PRODUCT_QUERY: gql`query productList($conversationId : String!, $profileId : String) {
		  products(conversationId : $conversationId,limit :50, offset:0, profileId : $profileId ) {
			sku
			name
			mountedPath
			vanityUrl
			code
			images {
			  altText
			  format
			  imageType
			  url
			}
			price{
				formattedValue
			}
		}
	}`	
};

export default gqlQueries;