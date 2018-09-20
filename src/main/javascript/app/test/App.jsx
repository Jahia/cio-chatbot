import React from 'react';
import Conversation from './Conversation.js';
import ProductList from './ProductList.jsx';
import _ from 'lodash';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversationId   : null,
            profileId        : null,
            // A Message Object consists of a message[, intent, date, isUser]
            messageObjectList: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
    }

    componentDidMount() {
        // Todo: Call grapqhql entry point for favoriteColor (when window.cxs (CDP profile) is available). This will give context for the style.
        if (window.cxs !== undefined && window.cxs.profileId !== undefined) {
            this.props.dxContext.profileId = window.cxs.profileId;

            this.getFavoriteColor(window.cxs.profileId).then((responseJson) => {
                this.callWatson('hello', responseJson.data.favoriteColor);
            }).catch(function (error) {
                throw error;
            });

        } else {
            this.callWatson('hello');
        }

    }

    getFavoriteColor(profileId) {
        return fetch(this.props.dxContext.servletContext + '/modules/graphql',
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify({
                        query    : `query ($profileId: String!){
							favoriteColor(profileId:$profileId)	
						}`,
                        variables: {
                            profileId: profileId
                        }
                    }
                )
            }).then((response) => {
            if (!response.ok) {
                return reject(response);
            }

            return response.json();
        });
    }

    callWatson(message, favoriteColor) {

        fetch(this.props.dxContext.servletContext + '/modules/graphql',
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify({
                        query    : `query ($message: String!,$conversationId : String,$favoriteColor : String){
		sendMessage(message:$message, conversationId:$conversationId,favoriteColor:$favoriteColor){
			conversationId
			entities{
				name
				value
				confidence
			}
			intents
			outputMessages
			canSearch
		}
	}`,
                        variables: {
                            message       : message,
                            conversationId: this.state.conversationId,
                            favoriteColor : favoriteColor
                        }
                    }
                )
            }).then((response) => {
            if (!response.ok) {
                return reject(response);
            }

            return response.json();
        }).then((responseJson) => {

            responseJson.data.sendMessage.date = new Date();
            this.handleResponse(responseJson.data.sendMessage);
        }).catch(function (error) {
            throw error;
        });
    }

    handleResponse(responseJson) {
        const outputMessage = responseJson.outputMessages.filter(text => text).join('\n');
        /*        const outputIntent         = responseJson.intents[0]; */
        const outputDate           = responseJson.date.toLocaleTimeString();
        const outputConversationId = responseJson.conversationId;
        this.setState({
            conversationId: outputConversationId
        });
        const msgObj = {
            position: 'left',
            /*             label   : outputIntent, */
            message : outputMessage,
            date    : outputDate,
            hasTail : true
        };
        this.addMessage(msgObj);
        if (responseJson.canSearch) {
            this.formatProducts(outputConversationId);
        }
    }

    addMessage(msgObj) {
        this.setState({
            messageObjectList: [...this.state.messageObjectList, msgObj]
        });
    }

    handleSubmit(e) {
        const inputMessage  = e.target.value;
		if(e.target.value ==""){
			return;
		}
        const inputDate     = new Date();
        const formattedDate = inputDate.toLocaleTimeString();
        const msgObj        = {
            position: 'right',
            message : inputMessage,
            date    : formattedDate,
            hasTail : true
        };
        this.addMessage(msgObj);
        e.target.value = '';
        this.callWatson(inputMessage);
    }

    scrollToBottom() {
        const element     = document.getElementsByClassName('conversation__messages')[0];
        element.scrollTop = element.scrollHeight;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    formatProducts(conversationId) {
        console.log("rendering products");

        this.setState({
            conversationId    : conversationId,
            profileId         : (!_.isUndefined(window.cxs) ? window.cxs.profileId : null),
            messageObjectList : this.state.messageObjectList
        });
    }
	
	handleRestart(){
		this.setState({
            conversationId   : "",
            // A Message Object consists of a message[, intent, date, isUser]
            messageObjectList: [],
            result           : []
        });
		this.componentDidMount();
            result           : ""
        }, function () {
			this.componentDidMount();
		});
	}

    render() {
        return (
            <div className="app-wrapper">
                <Conversation
                    onSubmit={this.handleSubmit}
					onRestart={this.handleRestart}
                    messageObjectList={this.state.messageObjectList}
                />
                <div className="watson_result">
                    <ProductList dxContext={this.props.dxContext}
                                 conversationId={this.state.conversationId}
                                 profileId={this.state.profileId}/>
                </div>
            </div>
        );
    }
}

export default App;
