import React, {PropTypes} from 'react'
import ItemListFooter from './ItemListFooter'
import AddItem from './AddItem'
import ItemList from './ItemList'
import gql from 'graphql-tag'

import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

class ItemApp extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    renameItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div>
        <section className='itemapp'>
          <header className='header'>
            <AddItem
              addItem={this.props.addItem}
              refetch={this.props.data.refetch}
            />
          </header>
          <ItemList
            items={this.props.data.allItems || []}
            filter={this.props.filter}
            renameItem={this.props.renameItem}
            deleteItem={this.props.deleteItem}
            toggleItem={this.props.toggleItem}
            refetch={this.props.data.refetch}
            loading={this.props.data.loading}
          />
          <ItemListFooter setFilter={this.props.setFilter} />
        </section>
        <footer className='info'>
          <p>
            Double-click to edit a item
          </p>
        </footer>
      </div>
    )
  }
}

const addItemMutation = gql`
  mutation addItem($text: String!) {
    createItem(complete: false, text: $text) { id }
  }
`

const renameItemMutation = gql`
  mutation renameItem($id: ID!, $text: String!) {
    updateItem(id: $id, text: $text) { id }
  }
`

const deleteItemMutation = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) { id }
  }
`

const toggleItemMutation = gql`
  mutation toggleItem($id: ID!, $complete: Boolean!) {
    updateItem(id: $id, complete: $complete) { id }
  }
`

const allItemsQuery = gql`
  query allItems {
    allItems {
      id
      complete
      text
      episode {
        shortTitle
      }
    }
  }
`

const withQueryAndMutations = graphql(addItemMutation, {name: 'addItem'})(
  graphql(renameItemMutation, {name: 'renameItem'})(
    graphql(deleteItemMutation, {name: 'deleteItem'})(
      graphql(toggleItemMutation, {name: 'toggleItem'})(
        graphql(allItemsQuery)(ItemApp)
      )
    )
  )
)

const ItemAppLinked = connect(
  (state) => ({ filter: state.filter }),
  (dispatch) => ({
    setFilter (filter) {
      dispatch({
        type: 'SET_FILTER',
        filter,
      })
    },
  }),
)(withQueryAndMutations)

export default ItemAppLinked
