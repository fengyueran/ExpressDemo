import React, { Component } from 'react';
import { render } from 'react-dom';
import FileUpload from './fileUpload';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { fileList: [] };
   }

  render () {
    const options={
       baseUrl:'http://localhost:8000/upload',
     }
      return (
        <div className='container'>
          <div className='page-header'>
            <h1>CuraCloudMI</h1>
          </div>
          <FileUpload options={options}/>
        </div>
    );
  }
}

export default App;
