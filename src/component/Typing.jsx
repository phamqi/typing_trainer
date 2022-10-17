import React, { Component } from "react";

import "./styles.scss";
import {
  words,
  wordsAmount,
  countdown,
  Icon,
  defaultFontSize,
} from "../constant";

class Typing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayWords: [],
      counter: countdown,
      start: true,
      ready: false,
      initValue: {
        count: 0,
        keystrokes: 0,
        traslateValue: 0,
        stringInput: "",
        correct: 1,
        wrong: 1,
      },
      fontSize: defaultFontSize,
      translateWhenElement: 0,
      VN: true,
    };
    this.setUp = this.setUp.bind(this);
  }
  startTimer = () => {
    this.setState({
      start: false,
    });
    const timer = setInterval(() => {
      if (this.state.counter == 0) {
        clearInterval(timer);
        this.props.result(this.state.initValue);
      } else {
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
      }
    }, 1000);
    this.setState({
      timer: timer,
    });
  };
  endWhenMax = (stringInArrears) => {
    clearInterval(this.state.timer);
    let string = this.state.initValue.stringInput + stringInArrears;
    let result = { ...this.state.initValue, stringInput: string };
    this.props.result(result);
  };
  createWordsArray = () => {
    clearInterval(this.state.timer);
    this.setState({
      ready: false,
    });
    const arrayWords = [];
    const wordsByLanguage = this.state.VN ? words.VN : words.EN;
    const wordsLength = wordsByLanguage.length;
    for (var i = 0; i < wordsAmount; i++) {
      const random = Math.floor(Math.random() * wordsLength);
      const word = wordsByLanguage[random];
      arrayWords.push(word);
    }
    this.setState((prevState) => ({
      ...prevState,
      arrayWords: arrayWords,
      counter: countdown,
      start: true,
      ready: true,
      initValue: {
        count: 0,
        keystrokes: 0,
        traslateValue: 0,
        stringInput: "",
        correct: 1,
        wrong: 1,
      },
    }));
    this.declareAndResetClass();
  };
  declareAndResetClass = () => {
    const typing__render__char = document.getElementById(
      "typing__render__char"
    );
    const arrayChar = document.querySelectorAll("span.typing__char");
    const typing_input = document.getElementById("typing__input");
    typing__render__char.style.transform = "translate(0px)";
    arrayChar.forEach((item, index) => {
      if (index === 0) {
        item.classList.add("text__active");
        item.classList.remove("incorrect", "correct");
      } else {
        item.classList.remove("incorrect", "correct", "text__active");
      }
    });
    typing_input.focus();
    typing_input.value = "";
    typing_input.readOnly = false;
    return { typing_input, arrayChar, typing__render__char };
  };
  typing = () => {
    const { typing_input, arrayChar, typing__render__char } =
      this.declareAndResetClass();
    const arrayCharLength = wordsAmount;
    this.getElementTranslate();
    const inputKeypress = (e) => {
      if (this.state.start) {
        this.startTimer();
      }
      this.setState((prevState) => ({
        initValue: {
          ...prevState.initValue,
          keystrokes: prevState.initValue.keystrokes + 1,
        },
      }));
      if (typing_input.value) {
        if (e.key === " ") {
          let arrayValue = typing_input.value.toString().trim();
          if (arrayValue === arrayChar[this.state.initValue.count].innerText) {
            arrayChar[this.state.initValue.count].classList.add("correct");
            this.setState((prevState) => ({
              initValue: {
                ...prevState.initValue,
                correct: prevState.initValue.correct + 1,
              },
            }));
          } else {
            arrayChar[this.state.initValue.count].classList.add("incorrect");
            this.setState((prevState) => ({
              initValue: {
                ...prevState.initValue,
                wrong: prevState.initValue.wrong + 1,
              },
            }));
          }
          arrayChar[this.state.initValue.count].classList.remove(
            "text__active"
          );
          arrayChar[this.state.initValue.count + 1].classList.add(
            "text__active"
          );
          let stringInput = typing_input.value;
          this.setState((prevState) => ({
            initValue: {
              ...prevState.initValue,
              stringInput: prevState.initValue.stringInput + stringInput,
            },
          }));

          if (this.state.initValue.count >= this.state.translateWhenElement) {
            let plus = arrayChar[this.state.initValue.count].clientWidth;
            this.setState((prevState) => ({
              initValue: {
                ...prevState.initValue,
                traslateValue: prevState.initValue.traslateValue + plus,
              },
            }));
            typing__render__char.style.transform = `translateX(-${this.state.initValue.traslateValue}px)`;
          }
          if (this.state.initValue.count === arrayCharLength - 1) {
            this.endWhenMax(typing_input.value);
            typing_input.readOnly = true;
            const rsValue = {
              count: 0,
              keystrokes: 0,
              traslateValue: 0,
              stringInput: "",
            };
            this.setState({
              initValue: rsValue,
            });
          } else {
            this.setState((prevState) => ({
              initValue: {
                ...prevState.initValue,
                count: prevState.initValue.count + 1,
              },
            }));
          }
          typing_input.value = "";
        }
      }
    };
    typing_input.removeEventListener("keypress", inputKeypress);
    typing_input.addEventListener("keypress", inputKeypress);
  };
  getElementTranslate = () => {
    const render__typing = document.getElementById("typing__render");
    const span__typing = document.getElementById("typing__char");
    const translateWhenElement =
      Math.floor(render__typing.clientWidth / 2 / span__typing.clientWidth) - 1;
    this.setState({
      translateWhenElement: translateWhenElement,
    });
  };
  fontSize = (e) => {
    this.getElementTranslate();
    if (e.key === "ArrowUp") {
      if (!isNaN(e.target.value)) {
        if (e.target.value < 60) {
          this.setState((prevState) => ({
            fontSize: prevState.fontSize + 1,
          }));
        }
      }
    }
    if (e.key === "ArrowDown") {
      if (!isNaN(e.target.value)) {
        if (e.target.value > 14) {
          this.setState((prevState) => ({
            fontSize: prevState.fontSize - 1,
          }));
        }
      }
    }
  };
  async setUp() {
    await this.createWordsArray();
    if (this.state.ready) {
      this.typing();
    }
  }
  setLanguage = () => {
    this.setState((prevState) => ({
      VN: !prevState.VN,
    }));
    setTimeout(() => {
      this.createWordsArray();
    }, 1);
  };
  componentDidMount() {
    this.setUp();
  }
  render() {
    const arrayWordsRender = this.state.arrayWords;
    return (
      <div
        className="typing"
        style={{
          "--fontSize": `${this.state.fontSize}px`,
          "--color-white": `${this.props.color.colorTxt}`,
          "--color-black": `${this.props.color.colorBg}`,
          "--color-bg-action": `${this.props.color.bgColor}`,
        }}
      >
        <button onClick={this.setLanguage} className="typing__language">
          {this.state.VN ? "VN" : "EN"}
        </button>
        <input
          id="input__size"
          type="number"
          className="typing__size"
          value={this.state.fontSize}
          onChange={function () {}}
          onKeyDown={this.fontSize}
        />
        <div id="typing__render" className="typing__render">
          <div id="typing__render__char" className="typing__render__char">
            {this.state.ready
              ? Array.isArray(arrayWordsRender) &&
                arrayWordsRender.length > 0 &&
                arrayWordsRender.map((item, index) =>
                  index === 0 ? (
                    <span
                      key={index}
                      id="typing__char"
                      className="typing__char"
                    >
                      {item}
                    </span>
                  ) : (
                    <span className="typing__char" key={index}>
                      {item}
                    </span>
                  )
                )
              : "Loading"}
          </div>
        </div>
        <div className="typing__action">
          <input
            id="typing__input"
            className="typing__action__input"
            type="text"
            autoComplete="off"
          />
          <div className="typing__action__counter">{this.state.counter}</div>
          <button
            className="typing__action__btn__restart"
            onClick={this.createWordsArray}
          >
            {Icon.rs}
          </button>
        </div>
      </div>
    );
  }
}

export default Typing;
