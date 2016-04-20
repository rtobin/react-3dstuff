/*
* to do:
*		- handle touch
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
			circumference: 0,
			clickSafe: true,
			currentPanelIndex: this.props.panelIndex,
			dragging: false,
			containerWidth: 0,
      left: 0,
			mouse: [0, 0],
			delta: [0, 0],
			omega: 0,
      panelCount: 0,
      panelSize: 0,
			radius: 0,
			rotateFn: 'rotateY',
			thetaX: 0,
			thetaY: 0,
      top: 0,
			atRest: true,
		};



		// bind instance methods
		[
			'setup',
			'getContainerStyles',
			'getCarouselStyles',
			'getPanelStyles',
			'handleClick',
			'handleMouseDown',
			'handleMouseMove',
			'handleMouseUp',
			'handleTouchMove',
			'handleTouchStart',
			'nearestPanelAngle',
			'getTouchEvents',
			'getMouseEvents'
		].forEach( (method) => this[method] = this[method].bind(this) );
	}

	componentWillMount() {
		this.intitialize();
	}

	componentWillUnmount() {
		// remove event handlers
	}

	componentDidUpdate() {
		if (!this.state.dragging && !this.state.atRest) {
			this.setState({
				thetaX: 0,
				thetaY: this.nearestPanelAngle(),
				atRest: true
			});
		}
	}

	componentDidMount() {

		// window.addEventListener('touchmove', this.handleTouchMove);
		// window.addEventListener('touchend', this.handleMouseUp);
		// window.addEventListener('touchcancel', this.handleMouseUp);
		// window.addEventListener('mousemove', this.handleMouseMove);
		// window.addEventListener('mouseup', this.handleMouseUp);
		// window.addEventListener('mouseleave', this.handleMouseUp);

		this.setup();
		// add event handlers such as:
		// such as window resize and adding more children, etc.
		//
		// this.bindEvents();
		// this.setExternalData();

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			panelCount: nextProps.children.length
		});
		this.setup();
		if (nextProps.panelIndex !== this.state.currentPanelIndex) {
			this.goToPanel(nextProps.panelIndex);
		}
	}

	render() {
		const self = this;
		const children = React.Children.count(this.props.children) > 1 ? this.props.children : [this.props.children];
		let style, angle;
		let [x, y] = this.state.mouse;

		if (this.state.dragging) {
			style = {
				rotateX: (-1) * this.state.thetaX,
				rotateY: this.state.thetaY
			}
		} else {
			angle = this.nearestPanelAngle();
			style = {
				rotateX: spring(0, {stiffness: 180, damping: 10} ),
				rotateY: spring(angle, {stiffness: 120, damping: 17} ),
			}
		}

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
										);
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
			rotation;

    container = this.refs.carousel3d;
		panelCount = React.Children.count(this.props.children);
    firstPanel = container.childNodes[0].childNodes[0];
    // if (firstPanel) {
    //   firstPanel.style.height = 'auto';
    //   panelHeight = firstPanel.offsetHeight;
    // } else {
    //   panelHeight = 100;
    // }
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
    // containerHeight = panelHeight;
    // containerWidth = this.props.vertical ? containerHeight : container.offsetWidth;


    this.setState({
      // containerWidth: containerWidth,
			angle: 360 / panelCount,
			circumference: 2 * Math.PI * radius,
			panelCount: panelCount,
      panelSize: panelSize,
			radius: radius,
      // left: this.props.vertical ? 0 : this.getTargetLeft(),
      // top: this.props.vertical ? this.getTargetLeft() : 0,
			rotateFn: rotateFn
    });
  }

	nearestPanelAngle() {
		if (this.props.orientation === 'horizontal') {
			return Math.round(this.state.thetaY / this.state.angle) * this.state.angle;
		} else {
			return Math.round(this.state.thetaX / this.state.angle) * this.state.angle;

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

	getTouchEvents() {
		const self = this;
		return {
			onTouchStart(e) {
				console.log('touch start');
			},
			onTouchMove(e) {
				console.log('touch move');
			},
			onTouchEnd(e) {
				console.log('touch end');
			},
			onTouchCancel(e) {
				console.log('touch cancel');
			}
		}
	}

	getMouseEvents() {
    var self = this;

    if (this.props.dragging === false) {
      return null;
    }

    return {
      onMouseDown(e) {
				console.log('mouse down');
				self.setState({
		      dragging: true,
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

					console.log(mouseDelta);
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
		console.log('click');
    if (this.state.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();

      if (e.nativeEvent) {
        e.nativeEvent.stopPropagation();
      }
    }
  }

	handleTouchStart(key, pressLocation, e) {

    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseMove({pageX, pageY}) {
		const delta = this.state.delta;
    if (this.state.dragging) {
      const mouse = [pageX - delta[0], pageY - delta[1]];
			const mouseDelta = [mouse[0] - this.state.mouse[0], mouse[1] - this.state.mouse[1]];
      const deltaThetaY = mouseDelta[0] * 360 / this.state.circumference;
			const deltaThetaX = mouseDelta[1] * 360 / this.state.circumference;

			console.log(mouseDelta);
			this.setState({
				mouse: mouse,
				thetaX: (this.state.thetaX + deltaThetaX) % 360,
				thetaY: (this.state.thetaY + deltaThetaY) % 360
			});
    }
  }

  handleMouseDown([pressX, pressY], {pageX, pageY}) {
    this.setState({
      dragging: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });
  }

  handleMouseUp() {
		console.log('up');
    this.setState({dragging: false, delta: [0, 0]});
  }

}

Carousel3D.propTypes = {
	afterTransition: React.PropTypes.func,
  beforeTransition: React.PropTypes.func,
	backface: React.PropTypes.bool,
  data: React.PropTypes.func,
  decorators: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      component: React.PropTypes.func,
      position: React.PropTypes.oneOf([
        'TopLeft',
        'TopCenter',
        'TopRight',
        'CenterLeft',
        'CenterCenter',
        'CenterRight',
        'BottomLeft',
        'BottomCenter',
        'BottomRight'
      ]),
      style: React.PropTypes.object
    })
  ),
  draggable: React.PropTypes.bool,
  easing: React.PropTypes.string,
  containerPadding: React.PropTypes.string,
	frictionFactor: React.PropTypes.number,
	height: React.PropTypes.string,
	momentum: React.PropTypes.bool,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  panelIndex: React.PropTypes.number,
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
	data: function() {},
	draggable: true,
	easing: 'easeOutCirc',
	containerPadding: '0px',
	frictionFactor: 1,
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
