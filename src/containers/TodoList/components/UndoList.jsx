import React, { Component } from 'react'

export default class UndoList extends Component {
  render() {
    const { list, deleteItem, handleBlur } = this.props
    return <div className='undo-list'>
      <div className='undo-list-title'>
        正在进行
        <div className='undo-list-count' data-test='count'>{list.length}</div>
      </div>
      <ul className='undo-list-content'>
        {
          list.map((item, index) => (
            <li
              className='undo-list-item'
              data-test='list-item'
              key={item + '-' + index}
              onDoubleClick={_ => this.props.changeStatus(index)}
            >
              {
                item.status === 'div' ?
                  item.value :
                  <input
                    className='undo-list-input'
                    autoFocus
                    defaultValue={item.value}
                    data-test='input-item'
                    onBlur={e => handleBlur(e, index)}
                    onKeyDown={e => {
                      if (e.keyCode === 13) {
                        handleBlur(e, index)
                      }
                    }}
                  />
              }
              <div
                className='undo-list-delete'
                data-test='delete-item'
                onClick={e => deleteItem(e, index)}
              >-</div>
            </li>
          ))
        }
      </ul>
    </div>
  }
}