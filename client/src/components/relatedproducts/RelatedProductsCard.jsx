import React from 'react';
import ComparisonModalList from './ComparisonModalList.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comparisonModalVisible: false
    }
    this.hideComparisonModal = this.hideComparisonModal.bind(this);
    this.showComparisonModal = this.showComparisonModal.bind(this);
  }

  showComparisonModal(event) {
    event.preventDefault();
    this.setState({ comparisonModalVisible: true });
    document.addEventListener('click', this.hideComparisonModal, true);
  }

  hideComparisonModal() {
    this.setState({ comparisonModalVisible: false }, () => {
      document.removeEventListener('click', this.hideComparisonModal);
    });
  }

  //set star to absolute position within the card element
  render() {
    return (
      <div>
        <li className="relatedProductsItems">
          <div className="card">
            <div className="imageContainer">
              <img onClick={this.showComparisonModal} className="relatedProductImg" src={this.props.image}></img>
            </div>
            <p className="category">{this.props.category}</p>
            <p className="productName">{this.props.name}</p>
            <p className="price">${this.props.price}</p>
          </div>
        </li >
        {this.state.comparisonModalVisible ?
          <ComparisonModalList productFeatures={this.props.productFeatures} name={this.props.name} overviewProduct={this.props.overviewProduct} /> :
          <div></div>}
      </div>
    )
  }

}

export default ClickTracker(RelatedProductsCard);
