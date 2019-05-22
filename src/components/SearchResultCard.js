import React from 'react'
import {connect} from 'react-redux'
import {selectSearchResult} from '../actions/searchActions'

class SearchResultCard extends React.Component {

  handleAddChoice = () => {
    this.props.clearForm()
    const props = (this.props.food.nix_item_id) ? 
      `id=${this.props.food.nix_item_id}&categoryId=${this.props.categoryId}`: 
      `name=${this.props.food.food_name}&categoryId=${this.props.categoryId}`
    this.props.selectSearchResult(props)
    // fetch(`${URL}search?${props}`, {headers: HEADERS()})
    // .then(r => r.json())
    // .then(choice => this.props.addChoice(choice))
  }

  render(){
    // console.log(this.props.categoryId)
    return(
      <li>
        <button onClick={this.handleAddChoice}>+</button>
        {this.props.food.food_name}{this.props.food.brand_name ? `- ${this.props.food.brand_name}` : null}
      </li>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChoice: (choice) => dispatch({ type: 'ADD_CHOICES', payload: [choice]}),
    selectSearchResult: prop => dispatch(selectSearchResult(prop))
  }
}

export default connect(null, mapDispatchToProps)(SearchResultCard)