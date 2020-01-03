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
    return <div>
      <input
        data-test='input'
        value={value}
        onChange={this.handleInput}
        onKeyUp={this.handleInputKeyUp}
      />
    </div>
  }
}