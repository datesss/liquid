import React, { PropTypes } from 'react'
import Item from './Item'

export default class ItemList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renameItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  _filterItems = (item) => (
    this.props.filter === 'SHOW_ACTIVE'
    ? item.complete !== true
    : this.props.filter === 'SHOW_COMPLETED'
      ? item.complete === true
      : true
    )

  renderItems () {
    if (this.props.loading) {
      return (<div>Loading</div>)
    }
    return this.props.items
      .filter(this._filterItems)
      .reverse()
      .map((item) =>
        <Item
          key={item.id}
          item={item}
          renameItem={this.props.renameItem}
          deleteItem={this.props.deleteItem}
          toggleItem={this.props.toggleItem}
          refetch={this.props.refetch}
        />
      )
  }

  render () {
    return (
      <section className='main'>
        <ul className='item-list'>
          {this.renderItems()}
        </ul>
      </section>
    )
  }
}
