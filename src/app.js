import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm'
import firebase from 'firebase';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount(){
		firebase.initializeApp({
			apiKey: 'AIzaSyCJmL31odSDAupSN-Up4TMCdZhCzT--TG8',
		    authDomain: 'auth-8af10.firebaseapp.com',
		    databaseURL: 'https://auth-8af10.firebaseio.com',
		    projectId: 'auth-8af10',
		    storageBucket: 'auth-8af10.appspot.com',
		    messagingSenderId: '3729205464'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch ( this.state.loggedIn ) {
			case true:
				return (
					<CardSection>
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
					</CardSection>
			    );
			case false:
				return <LoginForm />;
			default:
				return (
					<View style={ styles.mainSpinner }>
						<Spinner size="large" />
					</View>
				);
		};
	};

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}

const styles = {
	mainSpinner: {
		height: 500,
		justifyContent: 'center',
		alignItems: 'center'
	}
}

export default App;