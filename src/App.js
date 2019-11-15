import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Collections from './component/Collections';
import { FirestoreCollection } from 'react-firestore';
// import { fb as firebase } from './lib/firebase.js';

class App extends Component {
  

  render () {
    return (
      <FirestoreCollection
            path="cities"
            render={({ isLoading, data }) => {
              return isLoading ? (
                <div>hello two</div>
              ) : (
                <div>
                  <h1>Stories</h1>
                  <ul>
                    {data.map(story => (
                     console.log(story, 'here')
                    ))}
                  </ul>
                </div>
              );
            }}
/>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
