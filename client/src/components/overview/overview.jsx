import React from 'react';
import ProductImage from './productImage.jsx';
import ProductDetails from './productDetails.jsx';
import ProductSyles from './productStyles.jsx';
import ProductButtons from './productButtons.jsx';
import ProductDescription from './productDescription.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.id,
      productDetails: {},
      productStyles: [],
      styleId: 0,
      stylePhotos: null,
      loaded: false
    };
    this.getProductStyles = this.getProductStyles.bind(this);
  }

  componentDidMount() {
    let id = this.state.productId;
    axios({
      method: 'get',
      url: '/product',
      params: { id: id }
    }).then((response) => {
      let data = response.data;
      this.setState({ productDetails: data, detailsLoaded: true });
    }).catch((error) => {
      console.log('Error calling product API: ', error);
    }).then(() => {
      this.props.productUpdate({ id: this.state.productId, name: this.state.productDetails.name, features: this.state.productDetails.features });
      this.getProductStyles(id);
    })
  }

  getProductStyles(id) {
    axios({
      method: 'get',
      url: '/styles',
      params: { id: id }
    }).then((response) => {
      let data = response.data;
      this.setState({ productStyles: data.results, stylePhotos: data.results[0].photos, stylesLoaded: true });
    }).catch((error) => {
      console.log('Error getting styles: ', error);
    })
  }

  saveToOutfit(id) {
    // TODO: implement using localStorage
  }

  render() {
    return (
      <div id="overview" data-testid="overview-element">
        <ProductImage photos={this.state.stylePhotos} loaded={this.state.stylesLoaded} />
        <div className="sidebar column-flex">
          <ProductDetails name={this.state.productDetails.name} category={this.state.productDetails.category} price={this.state.productDetails.default_price} loaded={this.state.detailsLoaded} />
          <ProductSyles />
          <ProductButtons />
        </div>
        <ProductDescription slogan={this.state.productDetails.slogan} description={this.state.productDetails.description} features={this.state.productDetails.features} loaded={this.state.detailsLoaded} />
      </div>
    );
  }
}

export default Overview;
