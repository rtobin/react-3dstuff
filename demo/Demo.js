import React from 'react';
import styles from './Demo.css';
import Carousel3D from '../src/react-3dstuff';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'foo',
      index: 0
    };
  }

  _onSubmit(e) {
    let value;
    e.preventDefault();
    value = parseInt(e.target.childNodes[1].value);
    this.setState({
      index: value
    });
  }

  _goToSlide(e) {
    let value;
    // e.preventDefault();
    value = parseInt(e.target.textContent) - 1;
    this.setState({
      index: value
    });
  }

  _goToNext(e) {
    e.preventDefault();
    this.setState({
      index: 'next'
    });
  }

  _goToPrev(e) {
    e.preventDefault();
    this.setState({
      index: 'prev'
    });
  }

  render() {
    const self = this;
    return (
      <div className={styles.app}>
        <h1>Carousel3D Demo</h1>
        <p>Use the mouse to manipulate the carousel or the nav buttons.</p>
        <Carousel3D ref="carousel"
          height="400px" width="1000px"
          orientation="horizontal"
          panelIndex={this.state.index}>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=1"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=2"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=3"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=4"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=5"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=6"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=7"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=8"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=9"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=10"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=11"/>
          <img className={styles.slide}
            draggable="false"
            src="http://placehold.it/1000x400&text=12"/>
        </Carousel3D>
        <form className={styles.slideNav} onSubmit={this._onSubmit.bind(this)}>
          <label htmlFor="get-panel">go to: </label>
          <input type="number" min="0" step="1" name="get-panel" />
        </form>
        <button onClick={this._goToPrev.bind(this)}>-</button>
        <button onClick={this._goToNext.bind(this)}>+</button>
        <div className="many-buttons">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(function(idx) {
            return (
              <button key={idx} onClick={self._goToSlide.bind(self)}>{idx}</button>

            );
          })}
        </div>
      </div>
    );
  }
}
