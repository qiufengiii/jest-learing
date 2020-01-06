import React from 'react';
import TodoList from '../../index'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('TodoList', () => {
  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([])
  });

  it('应该给 Header 传递一个 undoList内容的方法', () => {
    const wrapper = shallow(<TodoList />)
    const header = wrapper.find('Header')

    expect(header.prop('addUndoItem')).toBeTruthy()
  });

  it('当addUndoItem被执行时，undoList应该新增内容', () => {
    const wrapper = shallow(<TodoList />)
    const item = '学习react'
    wrapper.instance().addUndoItem(item)
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value: item
    })
  });

  it('应该给UndoList传递数据和删除和changeStatus数据的方法', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
    expect(UndoList.prop('handleBlur')).toBeTruthy()
  });

  it('当deleteItem方法被执行时, undoList应该删除内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: [{
        status: 'div',
        value: '学习jest'
      }, {
        status: 'div',
        value: '学习TDD'
      }, {
        status: 'div',
        value: '圣秋'
      }]
    })
    wrapper.instance().deleteItem({ stopPropagation() { } }, 1)
    expect(wrapper.state('undoList')).toEqual([{
      status: 'div',
      value: '学习jest'
    }, {
      status: 'div',
      value: '圣秋'
    }])
  });

  it('当changeStatus方法被执行时, undoList数据项status被修改', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: [{
        status: 'div',
        value: '学习jest'
      }, {
        status: 'div',
        value: '学习TDD'
      }, {
        status: 'div',
        value: '圣秋'
      }]
    })
    wrapper.instance().changeStatus(1)
    expect(wrapper.state('undoList')[1]).toEqual({
      status: 'input',
      value: '学习TDD'
    })
  });

  it('当handleBlur方法被执行时, undoLis据被修改', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: [{
        status: 'div',
        value: '学习jest'
      }, {
        status: 'div',
        value: '学习TDD'
      }, {
        status: 'div',
        value: '圣秋'
      }]
    })
    wrapper.instance().changeStatus(1)
    wrapper.instance().handleBlur({
      target: {
        value: 'abc'
      }
    }, 1)
    expect(wrapper.state('undoList')[1]).toEqual({
      status: 'div',
      value: 'abc'
    })
  });
})
