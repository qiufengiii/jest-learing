import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TodoList from '../../index'

Enzyme.configure({ adapter: new Adapter() })

it('TodoList 初始化列表为空', () => {
  const wrapper = shallow(<TodoList />)
  expect(wrapper.state('undoList')).toEqual([])
});

it('TodoList 应该给 Header 传递一个 undoList内容的方法', () => {
  const wrapper = shallow(<TodoList />)
  const header = wrapper.find('Header')
  
  expect(header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem)
});

it('当Header回车时，undoList应该新增内容', () => {
  const wrapper = shallow(<TodoList />)
  const header = wrapper.find('Header')
  const addFunc = header.prop('addUndoItem')
  addFunc('学习react')
  expect(wrapper.state('undoList').length).toBe(1)
  expect(wrapper.state('undoList')[0]).toBe('学习react')
});