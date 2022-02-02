import React from "react";
import MemeDisplay from "./MemeDisplay";
import htmlToImage from "html-to-image";
import download from "downloadjs";
import ErrorBoundary from "./ErrorBoundary";

class MemeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      authorText: "",
      randomImg: "https://i.imgflip.com/63n643.jpg",
      allMemeImgs: []
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //Add local image
  handleUpload = event => {
    event.preventDefault();
    const { files } = event.target;
    const uploadFile = URL.createObjectURL(files[0]);
    this.setState({
      randomImg: uploadFile
    });
  };

  //Add random image
  handleRandom = event => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  };

  //Download PNG image
  handlePng = () => {
    htmlToImage
      .toPng(document.getElementById("meme"))
      .then(function (dataUrl) {
        download(dataUrl, "meme.png");
      });
  };

 

  render() {
    return (
      <ErrorBoundary>
        <MemeDisplay
          handleChange={this.handleChange}
          handleRandom={this.handleRandom}
          handlePng={this.handlePng}
          handleUpload={this.handleUpload}
          data={this.state}
        />
      </ErrorBoundary>
    );
  }
}

export default MemeGenerator;
