import React,{ Component } from 'react';
import Conversation from './Conversation.js';
import './App.css';
import ProductList from './ProductList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      conversationId: "",
      // A Message Object consists of a message[, intent, date, isUser]
      messageObjectList: [],
      discoveryNumber: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.callWatson('hello');
  }
  
  callWatson(message) {

    fetch(this.props.dxContext.servletContext + '/modules/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `query ($message: String!,$conversationId : String){
		sendMessage(message:$message, conversationId:$conversationId){
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
         variables  : {
			message: message,
			conversationId	: this.state.conversationId		
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
	  }).catch(function(error) {
        throw error;
      });
  }

  handleResponse(responseJson) {
      const outputMessage = responseJson.outputMessages.filter(text => text).join('\n');
      const outputIntent = responseJson.intents[0] ;
      const outputDate = responseJson.date.toLocaleTimeString();
      const outputConversationId = responseJson.conversationId;
      this.setState({
        conversationId: outputConversationId
      });
      const msgObj = {
        position: 'left',
        label: outputIntent,
        message: outputMessage,
        date: outputDate,
        hasTail: true
      };
      this.addMessage(msgObj);
	  if(responseJson.canSearch){
			  this.formatProducts(outputConversationId);
	  }
  }

  addMessage(msgObj) {
    this.setState({
      messageObjectList: [ ...this.state.messageObjectList , msgObj]
    });
  }

  handleSubmit(e) {
    const inputMessage = e.target.value;
    const inputDate = new Date();
    const formattedDate = inputDate.toLocaleTimeString();
    const msgObj = {
      position: 'right',
      message: inputMessage,
      date: formattedDate,
      hasTail: true
    };
    this.addMessage(msgObj);
    e.target.value = '';
    this.callWatson(inputMessage);
  }

  scrollToBottom() {
    const element = document.getElementsByClassName('conversation__messages')[0];
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  formatProducts(conversationId) {
	  this.props.dxContext.conversationId=conversationId;
      const formattedResult = <ProductList dxContext={this.props.dxContext} />
	  this.addMessage({ message: formattedResult });
  }


  render() {
    return (
      <div className="app-wrapper">
        <p className="conversation__intro">
                    Watson Assistant :
        </p>
        <Conversation
          onSubmit={this.handleSubmit}
          messageObjectList={this.state.messageObjectList}
        />
      </div>
    );
  }
}

export default App;
