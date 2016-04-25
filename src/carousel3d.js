/*
* to do:
*		- handle touch (DONE)
* 	- update with new props for controls (DONE)
*		-	enter/leave callbacks
*		- more styling control (props?)
*		- allow for vertical orientation
*
* Note: couldn't update the thetaX and thetaY in the render using setState. Refactor...
*/

import React from 'react';
import {Motion, spring} from 'react-motion';

export default class Carousel3D extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			angle: 0,
			atRest: true,
			circumference: 0,
			clickSafe: true,
			containerWidth: 0,
			delta: [0, 0],
			dragging: false,
			jumpingToIndex: this.props.panelIndex,
      left: 0,
			mouse: [0, 0],
      panelCount: 0,
      panelSize: 0,
			radius: 0,
			rotateFn: 'rotateY',
			thetaX: 0,
			thetaY: 0,
      top: 0,
		};
		/*
		* omega: angular velocity
		* frictionFactor: coefficient (f) of acceleration due to friction
		*			ie: change in omega = f * omega
		*/


		// bind instance methods
		[
			'setup',
			'getContainerStyles',
			'getCarouselStyles',
			'getPanelStyles',
			'handleClick',
			'nearestPanelAngle',
			'nextPanelAngle',
			'getTouchEvents',
			'getMouseEvents',
			'makePanelItem'
		].forEach( (method) => this[method] = this[method].bind(this) );
	}

	componentWillMount() {
		this.intitialize();
	}

	componentWillUnmount() {
		// remove event handlers
	}

	componentDidUpdate() {
		let thetaX, thetaY;
		if (this.props.orientation === 'horizontal') {
			thetaX = 0;
			thetaY = this.nearestPanelAngle();
		} else {
			thetaX = (-1) * this.nearestPanelAngle();
			thetaY = 0;
		}

		if (!this.state.dragging && !this.state.atRest) {
			this.setState({
				thetaX: thetaX,
				thetaY: thetaY,
				atRest: true
			});
		} else if (this.state.jumpingToIndex){
			this.setState({
				thetaX: thetaX,
				thetaY: thetaY,
				atRest: true,
				jumpingToIndex: null
			});
		}
	}

	componentDidMount() {
		this.setup();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			panelCount: nextProps.children.length,
			jumpingToIndex: nextProps.panelIndex
		});
		this.setup();

	}

	render() {
		const self = this;
		const children = React.Children.count(this.props.children) > 1 ? this.props.children : [this.props.children];
		let style, angle, rotateX, rotateY;
		let [x, y] = this.state.mouse;

		if (this.state.dragging) {
			rotateX = (-1) * this.state.thetaX;
			rotateY = this.state.thetaY;

		} else {
			debugger
			angle = this.state.jumpingToIndex !== null ? this.nextPanelAngle() : this.nearestPanelAngle();

			if (this.props.orientation === 'horizontal') {
				rotateX = spring(0, { stiffness: this.props.stiffness, damping:  this.props.damping } );
				rotateY = spring(angle, { stiffness: this.props.stiffness, damping: this.props.damping } );
			} else {
				rotateX = spring(angle, { stiffness: this.props.stiffness, damping: this.props.damping } );
				rotateY = spring(0, { stiffness: this.props.stiffness, damping:  this.props.damping } );
			}
		}

		style = {
			rotateX: rotateX,
			rotateY: rotateY
		};

		return (
			<div className={['carousel3d', this.props.className || ''].join(' ')}
				ref="carousel3d">
				<Motion style={style}>
					{({rotateX, rotateY}) =>
						<div className="carousel3d_container"
			          ref="container"
			          style={this.getContainerStyles()}
								{...this.getTouchEvents()}
			          {...this.getMouseEvents()}
			          onClick={this.handleClick}>
							<div className="carousel3d_list" ref="list" style={this.getCarouselStyles(rotateX, rotateY)}>
								{
									React.Children.map(children, function(child, idx) {
										return (
											<div className="carousel3d_panel"
												style={self.getPanelStyles(idx)}
												key={idx}>
												{child}
											</div>
										)
									})
								}
				  		</div>
						</div>
					}
				</Motion>
			</div>
		);
	}

	intitialize() {
		//
	}

  setup() {
  	let self = this,
			panelCount,
      panelSize,
			radius,
			rotateFn,
      firstPanel,
			circumference,
      container,
      containerWidth,
      containerHeight,
			offset,
			friction;


    container = this.refs.carousel3d;
		panelCount = React.Children.count(this.props.children);
    firstPanel = container.childNodes[0].childNodes[0];

		if (this.props.orientation === 'horizontal') {
			offset = 'offsetWidth';
			rotateFn = 'rotateY';
		} else {
			offset = 'offsetHeight';
			rotateFn = 'rotateX';
		}


    // panelSize right now is just set to the container
		panelSize = firstPanel[offset];

		// compute radius
		radius = Math.round((panelSize / 2) / Math.tan( Math.PI / panelCount));

    this.setState({
      // containerWidth: containerWidth,
			angle: 360 / panelCount,
			circumference: 2 * Math.PI * radius,
			panelCount: panelCount,
      panelSize: panelSize,
			radius: radius,
      rotateFn: rotateFn
    });
  }

	makePanelItem(child, idx) {
		return (
			<div className="carousel3d_panel"
				style={this.getPanelStyles(idx)}
				key={idx}>
				{child}
			</div>
		);
	}

	nearestPanelAngle() {
		if (this.props.orientation === 'horizontal') {
			return Math.round(this.state.thetaY / this.state.angle) * this.state.angle;
		} else {
			return (-1) * Math.round(this.state.thetaX / this.state.angle) * this.state.angle;
		}
	}

	nextPanelAngle() {
		let angle;

		if (typeof this.state.jumpingToIndex === 'number') {
			return (-1) * this.state.angle * this.state.jumpingToIndex;
		}

		angle = this.props.orientation === 'horizontal' ? this.state.thetaY : this.state.thetaX;

		if (this.state.jumpingToIndex === 'next') {
			return angle - this.state.angle;
		}
		if (this.state.jumpingToIndex === 'prev') {
			return angle + this.state.angle;
		}
	}

  getContainerStyles() {
    return {
      position: 'relative',
      display: 'block',
      width: this.props.width,
      height: this.props.height,
      boxSizing: 'border-box',
			margin: 'auto',
      MozBoxSizing: 'border-box',
			perspective: this.state.radius * this.props.perspectiveFactor + 'px',
    }
  }

	getCarouselStyles(rotateX, rotateY) {
		let transform = '';
		transform += 'translateZ(-' + this.state.radius +'px) ';
		transform += 'rotateX(' + rotateX + 'deg)';
		transform += 'rotateY(' + rotateY + 'deg)';
		return {
			width: '100%',
      height: '100%',
      position: 'absolute',
      transformStyle: 'preserve-3d',
			WebkitTransform: transform,
      MozTransform: transform,
      msTransform: transform,
      OTransform: transform,
      transform: transform
		}
	}

	getPanelStyles(idx) {
		let transform = '';
    const angle = this.state.angle * idx;
		transform += this.state.rotateFn + '(' + angle + 'deg) ';
		transform += 'translateZ(' + this.state.radius + 'px)';

		return {
			border: '1px solid black',
			display: 'block',
      position: 'absolute',
			backfaceVisibility: this.props.backface,
			WebkitTransform: transform,
      MozTransform: transform,
      msTransform: transform,
      OTransform: transform,
      transform: transform
		}
	}

	getTouchEvents(e) {
		const self = this;
		return {
			onTouchStart(e) {
				// console.log('touch start');
				self.setState({
		      dragging: true,
					jumpingToIndex: null,
		      mouse: [e.touches[0].pageX, e.touches[0].pageY]
		    });
			},
			onTouchMove(e) {
				// console.log('touch move');
				if (!self.state.dragging) {
          return;
        }

		    if (self.state.dragging) {
		      const mouse = [e.touches[0].pageX, e.touches[0].pageY];
					const mouseDelta = [mouse[0] - self.state.mouse[0], mouse[1] - self.state.mouse[1]];
		      const deltaThetaY = mouseDelta[0] * 360 / self.state.circumference;
					const deltaThetaX = mouseDelta[1] * 360 / self.state.circumference;

					// console.log(mouseDelta);
					self.setState({
						mouse: mouse,
						thetaX: (self.state.thetaX + deltaThetaX) % 360,
						thetaY: (self.state.thetaY - deltaThetaY) % 360,
						atRest: false
					});
		    }
			},
			onTouchEnd(e) {
				// console.log('touch end');
				self.setState({ dragging: false });
			},
			onTouchCancel(e) {
				// console.log('touch cancel');
				self.setState({ dragging: false });
			},
			onDragStart(e) {
				// console.log('dragging');
				return false;
			}
		}
	}

	getMouseEvents() {
    const self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown(e) {
				console.log('mouse down');
				self.setState({
		      dragging: true,
					jumpingToIndex: null,
		      mouse: [e.clientX, e.clientY]
		    });
      },
      onMouseMove(e) {
				console.log('mouse move');
				if (!self.state.dragging) {
          return;
        }

		    if (self.state.dragging) {
		      const mouse = [e.pageX, e.pageY];
					const mouseDelta = [mouse[0] - self.state.mouse[0], mouse[1] - self.state.mouse[1]];
		      const deltaThetaY = mouseDelta[0] * 360 / self.state.circumference;
					const deltaThetaX = mouseDelta[1] * 360 / self.state.circumference;

					// console.log(mouseDelta);
					self.setState({
						mouse: mouse,
						thetaX: (self.state.thetaX + deltaThetaX) % 360,
						thetaY: (self.state.thetaY + deltaThetaY) % 360,
						atRest: false
					});
		    }
      },
			onDragStart(e) {
				console.log('dragging');
				return false;
			},
      onMouseUp(e) {
				console.log('mouse up');
				self.setState({ dragging: false });
      },
      onMouseLeave(e) {
				console.log('mouse leave');
				self.setState({ dragging: false });
      }
    }
  }

	handleClick(e) {
		// console.log('click');
    if (this.state.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  }
}

Carousel3D.propTypes = {
	afterTransition: React.PropTypes.func,
  beforeTransition: React.PropTypes.func,
	backface: React.PropTypes.bool,
  draggable: React.PropTypes.bool,
  easing: React.PropTypes.string,
  containerPadding: React.PropTypes.string,
	stiffness: React.PropTypes.number,
	damping: React.PropTypes.number,
	height: React.PropTypes.string,
	momentum: React.PropTypes.bool,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  panelIndex: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  panelPadding: React.PropTypes.number,
  panelSize: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  perspectiveFactor: React.PropTypes.number,
  speed: React.PropTypes.number,
  width: React.PropTypes.string
};

Carousel3D.defaultProps = {
	afterTransition: function() { },
	beforeTransition: function() { },
	backface: true,
	draggable: true,
	easing: 'easeOutCirc',
	containerPadding: '0px',
	stiffness: 120,
	damping: 7,
	height: '100%',
	momentum: true,
	orientation: 'horizontal',
	panelAlign: 'left',
	panelIndex: 0,
	panelPadding: 0,
	panelSize: 1,
	perspectiveFactor: 1,
	speed: 500,
	width: '100%'
};
