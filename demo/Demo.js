import React from 'react';
import styles from './Demo.css';
import Carousel3D from '../src/carousel3d';

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
    value = parseInt(e.target.childNodes[1].value) - 1;
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
        <div className={styles.title}>
          <h1>Carousel3D Demo</h1>
          <p>Use the mouse to manipulate the carousel or the nav buttons.</p>
        </div>
        <Carousel3D ref="carousel"
          height="400px" width="400px"
          orientation="horizontal"
          panelIndex={this.state.index}>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png"/>
          <img className={styles.slide}
            draggable="false"
            src="http://vignette3.wikia.nocookie.net/simpsons/images/6/6a/Mr_Burns_evil.gif/revision/latest/scale-to-width-down/180?cb=20100702150413"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/8/8d/Milhouse.PNG"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/8/80/Moe_Szyslak.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/8/84/Ned_Flanders.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/2/23/Apu_Nahasapeemapetilon_(The_Simpsons).png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/5/5a/Krustytheclown.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/1/14/Ralph_Wiggum.png"/>
          <img className={styles.slide}
            draggable="false"
            src="https://upload.wikimedia.org/wikipedia/en/d/de/Barney_Gumble.png"/>

        </Carousel3D>
        <div className={styles.controls}>
          <form className={styles.slideNav} onSubmit={this._onSubmit.bind(this)}>
            <label htmlFor="get-panel">go to: </label>
            <input type="number" min="1" max="12" step="1" name="get-panel" />
          </form>
          <button onClick={this._goToPrev.bind(this)}>-</button>
          <button onClick={this._goToNext.bind(this)}>+</button>
          <div className="many-buttons">
            {
              [1,2,3,4,5,6,7,8,9,10,11,12].map(function(idx) {
                return (
                  <button key={idx} onClick={self._goToSlide.bind(self)}>{idx}</button>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
