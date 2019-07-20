import React from 'react';
import Search from './Search.jsx';
import ReviewList from './ReviewList.jsx';
import Aggregates from './Aggregates.jsx';
import SearchInfo from './SearchInfo.jsx';
import PageCarousel from './PageCarousel.jsx';
import styled from 'styled-components';
import axios from 'axios';
import { 
  Shared,
  FlexContainer,
  LineDiv,
  TotalReviewsHeader,
  TotalReviewsStars,
} from './styleComponents.jsx';
import { StarSVG, LeftSvg } from './SVG.jsx';
import StarRatings from 'react-star-ratings';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searching: false,
      searchString: '',
      lastSearchString: '',
      data: [],
      searchData: [],
      pageNumber: 0,
      numberOfPages: 0,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.searchDataForString = this.searchDataForString.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  
  componentDidMount() {
    axios.get('/reviews').then((response) => {
      this.setState({
        data: response.data[1],
        numberOfPages: response.data[0],
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  componentDidUpdate() {
    let { searchString, searching } = this.state;
    if (searchString !== '' && searching === true) {
      this.searchDataForString();
    }
  };
  
  changePage(e) {
    console.log(e.target.getAttribute("value"));
    let pageNum = e.target.getAttribute("value");
    axios({
      method: 'POST',
      url: '/reviews',
      data: {
        pageNumber: pageNum
      }
    })
    .then((response) => {
      this.setState({
        data: response.data[1],
        numberOfPages: response.data[0],
        pageNumber: pageNum
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };
  
  toggleSearch(e) {
    e.preventDefault();
    let newSearchString = e.target.getAttribute("value");
    let { searching, searchString, lastSearchString } = this.state;
    if (newSearchString !== '') {
      this.setState({
        searching: !searching,
        searchString: newSearchString,
        lastSearchString: newSearchString,
      });
    } else if (searching === true) {
      axios.get('/reviews').then((response) => {
        this.setState({
          data: response.data[1],
          numberOfPages: response.data[0],
          searching: false,
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }``
  };

  searchDataForString() {
    let { searchString } = this.state;
    axios({
      method: 'POST',
      url: '/search',
      data: {
        searchString: searchString
      }
    })
    .then((response) => {
      this.setState({
        data: response.data[1],
        numberOfPages: response.data[0],
        searchString: '',
      })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    const { data, pageNumber, searching, numberOfPages, lastSearchString } = this.state;
    const { changePage, toggleSearch } = this;
    return (
      <Shared> 
        <div>
          <FlexContainer>
            <LeftSvg/>
            <TotalReviewsHeader>
              {7 * numberOfPages}
            </TotalReviewsHeader>
            <TotalReviewsStars>
              <StarRatings
                numberOfStars={5}
                rating={5}
                starRatedColor={'rgb(0,132,137)'}
                starDimension={'24px'}
                starSpacing={'0px'}
              />
            </TotalReviewsStars>
            <div>
              < Search 
                search={toggleSearch}
              />
            </div>
          </FlexContainer> 
          <div>< LineDiv/></div>
          <FlexContainer>
            {searching ? < SearchInfo string={lastSearchString}/> : < Aggregates />}
          </FlexContainer>
          <div>< ReviewList reviews={data}/></div>
          <div>
            { data.length > 0 ?
              < PageCarousel 
              page={pageNumber}
              numberOfPages={numberOfPages}
              changePage={changePage}
            />
            : null
            }
          </div> 
        </div>
      </Shared> 
    )
  }
}

export default App;