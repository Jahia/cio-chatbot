import React from 'react';
import Conversation from './Conversation.jsx';
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

        this.handleSubmit  = this.handleSubmit.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        window.callWatson = this.callWatson.bind(this);
        window.getFavoriteColor = this.getFavoriteColor.bind(this);
    }

    componentDidMount() {
        // Todo: Call grapqhql entry point for favoriteColor (when window.cxs (CDP profile) is available). This will give context for the style.
        var $this          = this;
        var intervalWatson = setInterval(function () {
            if (window.cxs !== undefined) {
                clearInterval(intervalWatson);
                $this.startWatson();
            }
        }, 100);

    }

    startWatson() {
        if (window.cxs !== undefined && window.cxs.profileId !== undefined) {
            this.props.dxContext.profileId = window.cxs.profileId;

            this.getFavoriteColor(window.cxs.profileId).then((responseJson) => {
                this.callWatson('hello', responseJson.data.favoriteColor, false);
            }).catch(function (error) {
                throw error;
            });

        }
    }

    getFavoriteColor(profileId) {
        console.log(profileId);
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
            console.log(response);
            if (!response.ok) {
                return reject(response);
            }

            return response.json();
        });
    }

    callWatson(message, favoriteColor, askEmail) {
        console.log("Calling watson", askEmail, message, favoriteColor);
        fetch(this.props.dxContext.servletContext + '/modules/graphql',
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify({
                        query    : `query ($message: String!,$conversationId : String,$favoriteColor : String, $askEmail : String){
                            sendMessage(message:$message, conversationId:$conversationId,favoriteColor:$favoriteColor, askEmail:$askEmail){
                                conversationId
                                entities{
                                    name
                                    value
                                    confidence
                                }
                                intents
                                outputMessages
                                canSearch
                                emailAddress
                            }
                        }`,
                        variables: {
                            message       : message,
                            conversationId: this.state.conversationId,
                            favoriteColor : favoriteColor,
                            askEmail      : (askEmail !== undefined && askEmail) ? "true":"false"
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
        if (responseJson.emailAddress !== null) {
            console.log("User gave is consent updating CDP");
            window.manageWemPrivacyInstances[Object.keys(window.manageWemPrivacyInstances)[0]].updateConsent(digitalData.scope,"outofstock",true);
        }
    }

    addMessage(msgObj) {
        this.setState({
            messageObjectList: [...this.state.messageObjectList, msgObj]
        });
    }

    handleSubmit(e) {
        const inputMessage = e.target.value;
        if (e.target.value == "") {
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
        console.log("rendering products", this.state.messageObjectList);

        this.setState({
            conversationId   : conversationId,
            profileId        : (!_.isUndefined(window.cxs) ? window.cxs.profileId : null),
            messageObjectList: this.state.messageObjectList
        });
    }

    handleRestart() {
        this.setState({
            conversationId   : null,
            profileId        : null,
            // A Message Object consists of a message[, intent, date, isUser]
            messageObjectList: []
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
