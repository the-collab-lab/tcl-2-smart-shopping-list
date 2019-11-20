import React from 'react';
// import the script to make the tokens, which i stuck in the components folder
import GetToken from './token'
// attempting to make the button link as well...
import FetchItems from './FetchItems';
import { BrowserRouter as Router, Route, } from 'react-router-dom'

// a function to run when the button is clicked to make a token and stick it in storage
function generateToken() {
	const newToken = GetToken();
	localStorage.setItem('newToken', newToken)
	console.log(newToken)
	checkToken(newToken)

}

//a function to check if the token in storage matches a list, and trying to link to a new
// page if it does match...very sketchy

function checkToken(newToken) {
	// render () {
	// 	if (newToken === localStorage.getItem('newToken')) {

	// 	}
	// }
	if (newToken === localStorage.getItem('newToken')) {
		return (
			<div>
				<Router>
					<Route>
						<FetchItems />
					</Route>
				</Router>
			</div>
		)
	} else {
		console.log('uh oh')
	}
}

function Home() {
	return (
		<div>
			<h1>congrats this is the home page</h1>
			{/* button for the user to make their token, which we will probably
			just call "start a shopping list" or something in the final app */}
			{/* <button onClick={generateToken}>Token</button> */}

		</div>
	)
}

export default Home
