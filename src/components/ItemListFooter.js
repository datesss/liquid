import React, { PropTypes } from 'react'

const ItemListFooter = (props) => (
  <p className='filter'>
    Show:
    {' '}
    <a onClick={() => props.setFilter('SHOW_ALL')}>
      All
    </a>
    {', '}
    <a onClick={() => props.setFilter('SHOW_ACTIVE')}>
      Active
    </a>
    {', '}
    <a onClick={() => props.setFilter('SHOW_COMPLETED')}>
      Completed
    </a>
  </p>
)

ItemListFooter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default ItemListFooter
