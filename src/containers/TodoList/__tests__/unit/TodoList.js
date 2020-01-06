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
    wrapper.instance().addUndoItem('学习react')
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe('学习react')
  });

  it('应该给UndoList传递数据和删除数据的方法', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
  });

  it('当deleteItem方法被执行时, undoList应该删除内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({ undoList: ['学习jest', '李', '圣秋'] })
    wrapper.instance().deleteItem(1)
    expect(wrapper.state('undoList')).toEqual(['学习jest', '圣秋'])
  });
})
