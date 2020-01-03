import React, { Component } from 'react'
import Header from './components/Header'
import UndoList from './components/UndoList'
import './styles.css'

export default class TodoList extends Component {
  state = {
    undoList: []
  }

  addUndoItem = item => {
    this.setState({ undoList: [...this.state.undoList, item] })
  }

  deleteItem = index => {
    const { undoList } = this.state
    undoList.splice(index, 1)
    this.setState({ undoList })
  }

  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={this.state.undoList} deleteItem={this.deleteItem} />
      </div>
    )
  }
}