import React, { Component } from "react";

export default class DialogResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: null,
    };
  }
  hiddenDialog = () => {
    this.props.hiddenDialog();
  };
  render() {
    let { result } = this.props;
    let wordsPerMunite = Math.round((7 * result.correct + result.wrong) / 12);
    let keysCount = result.keystrokes - result.count;
    return (
      <div
        className={
          this.props.showDialog ? "dialog__result show" : "dialog__result"
        }
      >
        <div className="dialog__result__title">
          Result
          <div className="dialog__result__title__tabkey">Tab</div>
        </div>
        {result ? (
          <div className="dialog__result__content">
            <span className="dialog__result__wpm">
              {isNaN(wordsPerMunite) ? 0 : wordsPerMunite}
              <span>WPM</span>
            </span>
            <div>
              <p>Keystrokes</p>
              <span className="dialog__result__count">
                {isNaN(keysCount) ? 0 : keysCount}
              </span>
            </div>
            <div>
              <p>Correct words</p>
              <span className="dialog__result__correct">{result.correct}</span>
            </div>
            <div>
              <p>Wrong words</p>
              <span className="dialog__result__incorrect">{result.wrong}</span>
            </div>
            <div className="dialog__result__action add">
              <button
                onClick={() => this.hiddenDialog()}
                className="dialog__result__action__btn"
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
