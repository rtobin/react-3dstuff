import React from 'react';
import styles from './Demo.css';
import Carousel3D from '../src/react-3dstuff';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  /*
  * right now you need to set draggable="false"
  *
  * user-drag: none;
  * user-select: none;
  * -moz-user-select: none;
  * -webkit-user-drag: none;
  * -webkit-user-select: none;
  * -ms-user-select: none;
  */
  render() {
    return (
      <div className={styles.app}>
        bar {this.state.test}
        <Carousel3D ref="carousel" height="400px" width="1000px">
        <img draggable="false" src="http://placehold.it/1000x400&text=slide1"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide2"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide3"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide4"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide5"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide6"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide7"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide8"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide9"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide10"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide11"/>
        <img draggable="false" src="http://placehold.it/1000x400&text=slide12"/>

        </Carousel3D>
      </div>
    );
  }
}
