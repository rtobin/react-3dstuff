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

### Try out a demo locally
```sh
git clone https://github.com/rtobin/react-3dstuff.git
cd react-3dstuff
npm install
npm start
```

Go to 'http://localhost:3000' and you should see the app running!

#### Props


## Credits
[Ryan Tobin][portfolio] 2016
