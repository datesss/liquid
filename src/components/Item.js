import React, { PropTypes } from 'react'
import ItemTextInput from '../components/ItemTextInput'
import classnames from 'classnames'

export default class Item extends React.Component {
  static propTypes ={
    item: PropTypes.object.isRequired,
    renameItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  _handleCompleteChange = (e) => {
    const id = this.props.item.id
    var complete = e.target.checked
    this.props.toggleItem({variables: {id, complete}})
      .then(this.props.refetch())
  }

  _handleDestroyClick = () => {
    this._removeItem()
  }

  _handleLabelDoubleClick = () => {
    this._setEditMode(true)
  }

  _handleTextInputCancel = () => {
    this._setEditMode(false)
  }

  _handleTextInputDelete = () => {
    this._setEditMode(false)
    this._removeItem()
  }

  _handleTextInputSave = (text) => {
    this._setEditMode(false)
    const id = this.props.item.id
    this.props.renameItem({variables: {id, text}})
      .then(this.props.refetch())
  }

  _removeItem () {
    const id = this.props.item.id
    this.props.deleteItem({variables: {id}})
      .then(this.props.refetch())
  }

  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit})
  }

  renderTextInput () {
    return (
      <ItemTextInput
        className='edit'
        initialValue={this.props.item.text}
        onCancel={this._handleTextInputCancel}
        onDelete={this._handleTextInputDelete}
        onSave={this._handleTextInputSave}
      />
    )
  }

  render () {
    return (
      <li
        className={classnames({
          completed: this.props.item.complete,
          editing: this.state.isEditing,
        })}>
        <div className='view'>
          <input
            checked={this.props.item.complete}
            className='toggle'
            onChange={this._handleCompleteChange}
            type='checkbox'
          />
          <label onDoubleClick={this._handleLabelDoubleClick}>
            {this.props.item.text} {this.props.item.episode.shortTitle}
          </label>
          <button
            className='destroy'
            onClick={this._handleDestroyClick}
          />
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    )
  }
}
