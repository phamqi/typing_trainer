import { click } from "@testing-library/user-event/dist/click";
import React, { Component } from "react";

import { keyboard } from "../constant";

class KeyBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onShift: false,
      onKey: "",
      mbShow: false,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.addFncEvent = this.addFncEvent.bind(this);
  }
  onKeyDown(e) {
    switch (e.key) {
      case "Escape":
        this.setState({
          onKey: "~",
        });
        break;
      case "CapsLock":
        this.setState({
          onKey: "Caps",
        });
        break;
      case "Meta":
        this.setState({
          onKey: "⋈",
        });
        break;
      case "ArrowUp":
        this.setState({
          onKey: "⇧",
        });
        break;
      case "ArrowLeft":
        this.setState({
          onKey: "⇦",
        });
        break;
      case "ArrowRight":
        this.setState({
          onKey: "⇨",
        });
        break;
      case "ArrowDown":
        this.setState({
          onKey: "⇩",
        });
        break;
      case "Delete":
        this.setState({
          onKey: "Del",
        });
        break;
      default:
        this.setState({
          onKey: e.key,
        });
    }
  }
  addKeysEvent() {
    const keys = document.querySelectorAll(".key");
    const typing__input = document.querySelector("#typing__input");
    keys.forEach((item, index) => {
      item.onclick = function () {
        typing__input.value += keys[index].innerText;
        typing__input.focus();
      };
    });
  }
  addKeysMobileEvent() {
    const keys = document.querySelectorAll(".fn");
    const typing__input = document.querySelector("#typing__input");
    keys.forEach((item, index) => {
      item.onclick = () => {
        console.log("alo alo", keys[index].innerText);
        switch (keys[index].innerText) {
          case "123":
            this.setState({
              mbShow: true,
            });
            break;
          case "ABC":
            this.setState({
              mbShow: false,
            });
            break;
          case "⇦":
            const typingValue = typing__input.value.slice(0, -1);
            typing__input.value = typingValue;
            break;
          case "⇧":
            this.setState((prevState) => ({
              onShift: !prevState.onShift,
            }));
        }
      };
    });
  }
  addFncEvent() {
    const fncs = document.querySelectorAll(".keyboard__key.fnc");
    const typing__input = document.querySelector("#typing__input");
    console.log(fncs);
    fncs.forEach((item, index) => {
      item.onclick = () => {
        console.log(fncs[index].innerText);
        switch (fncs[index].innerText) {
          case "Backspace":
            const typingValue = typing__input.value.slice(0, -1);
            typing__input.value = typingValue;
            break;
          case "Shift":
            this.setState((prevState) => ({
              onShift: !prevState.onShift,
            }));
        }
      };
    });
  }
  onKeyUp() {
    this.setState({
      onKey: "",
    });
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
    this.addKeysEvent();
    this.addFncEvent();
    this.addKeysMobileEvent();
  }
  componentDidUpdate() {}
  render() {
    console.log("rerender in render keyborad");
    return (
      <div className="keyboard__wrapper">
        <div
          id="keyboard"
          className={this.state.mbShow ? "keyboard mb-show" : "keyboard"}
          data-skinstance="simpleKeyboard"
        >
          <div className="keyboard__rows">
            {keyboard &&
              keyboard.map((item, index) => (
                <div
                  key={index}
                  className={
                    index == 0 ? "keyboard__row hidden-576" : "keyboard__row"
                  }
                >
                  {item.map((keys, index) => (
                    <button
                      key={index}
                      className={
                        this.state.onKey === keys.txt ||
                        this.state.onKey === keys.shiftTxt
                          ? `keyboard__key active ` +
                            ` keyboard__key${keys.u}` +
                            ` ${keys.type}`
                          : "keyboard__key" +
                            ` keyboard__key${keys.u}` +
                            ` ${keys.type}`
                      }
                      value={
                        this.state.onShift || this.state.onKey === "Shift"
                          ? keys.shiftTxt
                          : keys.txt
                      }
                    >
                      {this.state.onShift || this.state.onKey === "Shift"
                        ? keys.shiftTxt
                        : keys.txt}
                    </button>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default KeyBoard;
