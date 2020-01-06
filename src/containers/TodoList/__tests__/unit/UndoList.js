import React from 'react';
import UndoList from '../../components/UndoList'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { findTestWrapper } from '../../../../utils/testUtils'

Enzyme.configure({ adapter: new Adapter() })
const listData = [{
  status: 'div',
  value: '学习Jest'
}, {
  status: 'div',
  value: '学习TDD'
}, {
  status: 'div',
  value: '学习单元测试'
}]

describe('UndoList 组件', () => {
  it('初始化 count数为0，列表无内容', () => {
    const wrapper = shallow(<UndoList list={listData} />)
    const countElem = findTestWrapper(wrapper, 'count')
    const listItem = findTestWrapper(wrapper, 'list-item')
    expect(countElem.text()).toEqual("3")
    expect(listItem.length).toEqual(3)
  });

  it('未完成列表当有内容时，存在删除按钮', () => {
    const listData = ['学习Jest', '学习Jest', '学习Jest']
    const wrapper = shallow(<UndoList list={listData} />)
    const deleteElem = findTestWrapper(wrapper, 'delete-item')
    expect(deleteElem.length).toEqual(3)
  });

  it('点击删除按钮会触发删除函数', () => {
    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
    const deleteElem = findTestWrapper(wrapper, 'delete-item')
    const e = { stopPropagation() { } }
    deleteElem.at(index).simulate('click', e)
    expect(fn).toHaveBeenLastCalledWith(e, index)
  });

  it('当某一项被点击时，触发执行changeStatus函数', () => {
    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} changeStatus={fn} />)
    const listItem = findTestWrapper(wrapper, 'list-item')
    listItem.at(index).simulate('dblclick')
    expect(fn).toHaveBeenLastCalledWith(index)
  });

  it('根据数据status渲染对应的元素，对应文本变成input框', () => {
    const listData = [{
      status: 'div',
      value: '学习Jest'
    }, {
      status: 'input',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }]

    const wrapper = shallow(<UndoList list={listData} />)
    const inputItem = findTestWrapper(wrapper, 'input-item')
    expect(inputItem.length).toBe(1)
  });

  it('当某一个输入框失去焦点时，触发执行handleBlur方法', () => {
    const listData = [{
      status: 'div',
      value: '学习Jest'
    }, {
      status: 'input',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }]

    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} handleBlur={fn} />)
    const inputElem = findTestWrapper(wrapper, 'input-item')
    const e = {
      target: {
        value: 1
      }
    }
    inputElem.simulate('blur', e)
    expect(fn).toHaveBeenLastCalledWith(e, 1)
  });

  it('当输入框按下回车时触发handleBlur方法', () => {
    const listData = [{
      status: 'div',
      value: '学习Jest'
    }, {
      status: 'input',
      value: '学习TDD'
    }, {
      status: 'div',
      value: '学习单元测试'
    }]

    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} handleBlur={fn} />)
    const inputElem = findTestWrapper(wrapper, 'input-item')
    const e = {
      target: {
        value: 'abc'
      },
      keyCode: 13
    }
    inputElem.simulate('keydown', e)
    expect(fn).toHaveBeenLastCalledWith(e, 1)
  });
})
