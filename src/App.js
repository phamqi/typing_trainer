import React, { Component } from "react";
import "./App.css";

import Typing from "./component/Typing";
import DialogResult from "./component/DialogResult";
import KeyBoard from "./component/KeyBoard";
import { bgImage, colorKey, Icon } from "./constant";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      showDialog: false,
      color: {
        key: colorKey.sun,
        bgColor: "#1c4893",
        bgImage: bgImage.sun,
        colorTxt: "#f4f4f4",
        colorBg: "#000000",
      },
      snow: false,
    };
    this.color = {
      sun: {
        key: colorKey.sun,
        bgColor: "#1c4893",
        bgImage: bgImage.sun,
        colorTxt: "#f4f4f4",
        colorBg: "#000000",
      },
      moon: {
        key: colorKey.moon,
        bgColor: "#F0FFFF",
        bgImage: bgImage.moon,
        colorTxt: "#000000",
        colorBg: "#f4f4f4",
      },
    };
  }
  hiddenDialog = () => {
    let btnRestart = document.querySelector(".typing__action__btn__restart");
    this.setState({
      result: {},
      showDialog: false,
    });
    btnRestart.click();
  };
  getResult = (childData) => {
    this.setState({
      result: childData,
      showDialog: true,
    });
  };
  setColor = () => {
    const snow = Boolean(Math.random() < 0.3);
    this.setState((prevState) => {
      if (prevState.color.key === colorKey.sun) {
        return {
          color: this.color.moon,
          snow: snow,
        };
      }
      if (prevState.color.key === colorKey.moon) {
        return {
          color: this.color.sun,
          snow: snow,
        };
      }
    });
  };
  componentDidMount() {}

  componentDidUpdate() {}
  render() {
    console.log("rerednder");
    const snows = [];
    for (let i = 0; i < 5; i++) {
      let random = Math.floor((Math.random() + 1) * 10);
      let snow = (
        <span key={i} className="snow" style={{ "--a": `${random}` }}></span>
      );
      snows.push(snow);
    }
    console.log("app rerender");
    return (
      <div
        className="App"
        style={{
          backgroundImage: `${this.state.color.bgImage}`,
          "--color-bg-img": `${this.state.color.bgColor}`,
        }}
      >
        <div className="container">
          <div className="content">
            <div
              className="content__top"
              style={{ "--color-white": `${this.state.color.colorTxt}` }}
            >
              <h1 className="content__top__name">Typing trainer</h1>
              <div className="content__top__option">
                <div className="content__top__snows">
                  <div className={this.state.snow ? "snow" : ""}>{snows}</div>
                </div>
                <button onClick={this.setColor}>
                  {this.state.snow
                    ? Icon.cloud_snow
                    : this.state.color.key === colorKey.sun
                    ? Icon.cloud_moon
                    : Icon.cloud_sun}
                </button>
              </div>
            </div>
            <Typing result={this.getResult} color={this.state.color} />
          </div>
          <DialogResult
            result={this.state.result}
            showDialog={this.state.showDialog}
            hiddenDialog={this.hiddenDialog}
          />
          <KeyBoard />
        </div>
      </div>
    );
  }
}
