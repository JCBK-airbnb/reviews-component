import React from 'react';
import SmartDiv from './SmartDiv.jsx';

//this component needs to render between 6 and 9 divs in a carousel below reviews list, depending on review data
//at any given time, between 1 and 2 of those divs will be uninteractable "..." divs
//at any given time, between 1 and 2 of the divs will be next / last arrow buttons on the edges
//at 6 (i.e. the first or last page) only one arrow button will be rendered (move up if at first page, down at last)
//at 7, 8, or 9 divs rendered, both arrow buttons are rendered
//

class PageCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.getNumberOfDivs = this.getNumberOfDivs.bind(this);
  }

  getNumberOfDivs() {
    let { page, numberOfPages } = this.props;
    if (numberOfPages >= 9) {
      //each of the below will build an array and return it
      //example: [left, num, void, num, num, num, void, right]
      //render below will iterate across the passed array creating that many smart divs
      //passing them either nothing or a numvalue, and an onclick to change page state of main app
      if (page >= 4 && page <= numberOfPages - 5) {
        //render 9 divs: 2 button, 2 void, 5 numbers
        return ["previous", 0, , "void", page - 1, page, page + 1, "void", numberOfPages - 1, "next"];
      }
      if (page === 3 || page === numberOfPages - 4) {
        //render 9 divs: 2 button, 1 void, 6 numbers (the ones closer to edge are numbers)
        
      }
      if (page === 2 || page === numberOfPages - 3) {
        //render 8
      }
      if (page === 1 || page === numberOfPages - 2) {
        //render 7
      }
      if (page === 0 || page === numberOfPages -1) {
        //render 6 1 end button, 1 void, the last (or first) page, and the nearest 3
        return [0, 1, 2, "void", numberOfPages - 1,"next"];
      }
    }
    else {
      //render (pages.length - 1) + 2 many divs (2 being buttons) and dont worry about void divs
      return [];
    }
  }

  //render will call getNumberOfDivs and map across that area, passing in prop types and values as needed
  render() {
    let { page, numberOfPages } = this.props;
    let renderDirections = this.getNumberOfDivs();
    return (
      <div>
        {renderDirections.map((directive, index) =>
          < SmartDiv directive={directive} key={index}/>
        )}
      </div>
    )
  }
};

export default PageCarousel;