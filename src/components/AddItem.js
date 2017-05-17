import React, {PropTypes} from 'react'
import ItemTextInput from '../components/ItemTextInput'

export default class AddItem extends React.Component {

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
  }

  _handleSave = (text) => {
    this.props.addItem({variables: {text}})
      .then(this.props.refetch())
  }

  render () {
    return (
      <ItemTextInput
        className='new-item'
        onSave={this._handleSave}
        placeholder='Add...'
      />
    )
  }
}
