import React, { Component } from 'react'
import Header from './components/Header'

export default class TodoList extends Component {
  state = {
    undoList: []
  }

  addUndoItem = item => {
    this.setState({ undoList: [...this.state.undoList, item] })
  }

  render() {
    return <div>
      <Header addUndoItem={this.addUndoItem} />
      {
        this.state.undoList.map(item => <div key={item}>{item}</div>)
      }
    </div>
  }
}