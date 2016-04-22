[screenshot]: https://github.com/rtobin/react-3dstuff/blob/master/images/carousel3D_sample.png
[portfolio]: http://www.ryantobin.space

# React-3dstuff
A 3D React carousel component.

![sample][screenshot]

Just wrap your collection of html tags with a <Carousel3D> tag and all the immediate children will make up the carousel.
example:
```jsx
import Carousel3D from 'react-3dstuff';
// In your render...
<Carousel3D ref="carousel" height="400px" width="1000px">
  <div ... ></div>
  <div ... ></div>
  <div ... ></div>
  <div ... ></div>
</Carousel3D>
```

Note: For mouse dragging, please include 'draggable="false"' to prevent default browser dragging  behavior.

The carousel updates as certain props are handed to it. For example, the prop 'panelIndex' determines which panel to have in view. So when your component rerenders with new panelIndex, the carousel will transition accordingly. This is very useful for button navigation. You may include the following instance methods in your component:

```js
_goToSlide(e) {
  let value;
  e.preventDefault();
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
```

When an integer is passed to 'panelIndex', the component updates accordingly. However, you may also pass the strings "next" and "prev" to go to nearest panels.

See the code for more props to play with. It's pretty versatile.

### Try out a demo locally
```sh
git clone https://github.com/rtobin/react-3dstuff.git
cd react-3dstuff
npm install
npm start
```

Go to 'http://localhost:3000' and you should see the app running!


## Credits
[Ryan Tobin][portfolio] 2016
