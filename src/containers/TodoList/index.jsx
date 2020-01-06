import React, { Component } from 'react'
import Header from './components/Header'
import UndoList from './components/UndoList'
import './styles.css'

export default class TodoList extends Component {
  state = {
    undoList: []
  }

  addUndoItem = item => {
    this.setState({
      undoList: [...this.state.undoList, {
        status: 'div',
        value: item
      }]
    })
  }

  deleteItem = (e, index) => {
    e.stopPropagation()
    const { undoList } = this.state
    undoList.splice(index, 1)
    this.setState({ undoList })
  }

  changeStatus = index => {
    const { undoList } = this.state
    undoList[index].status = 'input'
    this.setState({ undoList })
  }

  handleBlur = (e, index) => {
    const undoList = this.state.undoList.map((item, ind) => {
      return ind === index ? {
        status: 'div',
        value: e.target.value
      } : {
          ...item,
          status: 'div'
        }
    })
    this.setState({ undoList })
  }

  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={this.state.undoList} deleteItem={this.deleteItem} changeStatus={this.changeStatus} handleBlur={this.handleBlur} />
      </div>
    )
  }
}