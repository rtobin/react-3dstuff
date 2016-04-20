import React from 'react';
import styles from './Demo.css';
import Carousel3D from '../src/react-3dstuff';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'foo',
      index: 0
    };
  }

  onSubmit(e) {
    let value;
    e.preventDefault();
    value = parseInt(e.target.childNodes[1].value);

    console.log(value);
    this.setState({
      index: value
    });
  }

  render() {
    return (
      <div className={styles.app}>
        bar {this.state.test}
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
        <form className={styles.slideNav} onSubmit={this.onSubmit.bind(this)}>
          <label for="get-panel">go to: </label>
          <input type="number" name="get-panel" />
        </form>
      </div>
    );
  }
}
