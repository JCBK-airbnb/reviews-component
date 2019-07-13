import React from 'react';
import SmartDiv from './SmartDiv.jsx';
import LeftArrow from './LeftArrow.jsx';
import RightArrow from './RightArrow.jsx';
import { LeftSvg } from './SVG.jsx';
import starRatings from 'react-star-ratings/build/star-ratings';
import {
  ButtonNavBar,
  ButtonPadding,
  UnClickedButton,
  ClickedButton,
  VoidButton,
} from './styleComponents.jsx';

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
  }

  //render will call getNumberOfDivs and map across that area, passing in prop types and values as needed
  render() {
    let { page, numberOfPages, changePage } = this.props;
    let n = numberOfPages;
    return (
      <ButtonNavBar>
        { page > 0 ?
          <ButtonPadding>
            <LeftArrow value={page}changePage={changePage}/>
          </ButtonPadding> 
        : null}
          { page !== 0 ? 
          <ButtonPadding>
            <UnClickedButton>
              <SmartDiv value={0} changePage={changePage}/>
            </UnClickedButton>
          </ButtonPadding>
          : null}
          { page >= 4 && n >= 9 ? 
          <ButtonPadding>
            <VoidButton>
              <SmartDiv value={'...'}/> 
            </VoidButton>
          </ButtonPadding>
          : null}
          { page == n - 1 ? 
          <ButtonPadding>
            <SmartDiv value={Number(page) - 2} changePage={changePage}/>
          </ButtonPadding>
          : null}
          { page == 3 ? 
          <ButtonPadding>
            <SmartDiv value ={Number(page) - 2 } changePage={changePage}/> 
          </ButtonPadding>
          : null}
        <ButtonPadding>
          <UnClickedButton>
          { page >= 2 ? <SmartDiv value={Number(page) - 1} changePage={changePage}/>: null}
          </UnClickedButton>
        </ButtonPadding>
        <ButtonPadding>
          <UnClickedButton>
            <ClickedButton>
              { page >= 1 ? <SmartDiv value={page} changePage={changePage}/>: null}
            </ClickedButton>
          </UnClickedButton>
        </ButtonPadding>
          { page < n - 2 ? 
        <ButtonPadding>
          <UnClickedButton>
          <SmartDiv value={Number(page) + 1} changePage={changePage}/> 
          </UnClickedButton>
        </ButtonPadding>
          : null}
          { page == 0 ? 
        <ButtonPadding>
          <SmartDiv value={Number(page) + 2} changePage={changePage}/> 
        </ButtonPadding>
          : null}
            { page <= n - 5 && n >= 9 ? 
        <ButtonPadding>
          <VoidButton>
            <SmartDiv value={'...'}/> 
          </VoidButton>
        </ButtonPadding>
            : null}
          { page == n -4 ?
        <ButtonPadding>
             <SmartDiv value={Number(page) + 2} changePage={changePage}/> 
        </ButtonPadding>
             : null}
          { page < n - 1 ?
        <ButtonPadding>
          <UnClickedButton>
             <SmartDiv value ={Number(n) - 1} changePage={changePage}/>
          </UnClickedButton> 
        </ButtonPadding>
             : null}
        { page < numberOfPages - 1 ?
        <ButtonPadding>
           <RightArrow value={page} changePage={changePage}/>
        </ButtonPadding>
        : null}
      </ButtonNavBar>
    )
  }
};

export default PageCarousel;