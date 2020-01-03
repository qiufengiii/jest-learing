import React, { Component } from 'react'

export default class Header extends Component {
  state = {
    value: ''
  }

  handleInput = e => {
    this.setState({ value: e.target.value })
  }

  handleInputKeyUp = e => {
    const { value } = this.state
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem(value)
      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state
    return <div className='header'>
      <div className='header-content'>
        TodoList
        <input
          className='header-input'
          data-test='input'
          value={value}
          onChange={this.handleInput}
          onKeyUp={this.handleInputKeyUp}
          placeholder='Add Todo'
        />
      </div>
    </div>
  }
}