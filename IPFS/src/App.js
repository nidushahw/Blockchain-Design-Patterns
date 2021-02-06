import React from 'react';
import './App.css';
import ipfs from './ipfs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { buffer: null, hash: '', file: '' };
  }

  captureFile = (e) => {
    e.preventDefault();
    console.log("file captured");

    // Process file for IPFS
    const file = e.target.files[0];
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    }
  }
  // hash "QmeD9r7quM6XpKyxpYPDTvXMaA6g56hDUnQEKcAvq7hv56"
  onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting the form");
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("ipfs result", result);
      if (error) {
        console.log(error);
        return;
      }
      this.setState({
        hash: result[0].hash
      });
    });
  }

  handleDownload = async () => {
    console.log("Downloading file with hash", this.state.hash);
    const result = await ipfs.get(this.state.hash);
    const content = [];
    for await (const chunk of result[0].content) {
      content.push(chunk);
    }
    this.setState({
      file: Buffer.from(content).toString('base64')
    });
    console.log(result);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} accept="image/*"/>
          <input type="submit" />

        </form>
        <br />
        <div>
          <p>File Hash: {this.state.hash}</p>
          <button onClick={this.handleDownload}>Download File</button>
          <div>
            <img src={`data:image/png;base64, ${this.state.file}`} alt='file'/>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
