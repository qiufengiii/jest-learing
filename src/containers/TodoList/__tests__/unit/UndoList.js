import React from 'react';
import UndoList from '../../components/UndoList'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { findTestWrapper } from '../../../../utils/testUtils'

Enzyme.configure({ adapter: new Adapter() })

describe('UndoList 组件', () => {
  it('初始化 count数为0，列表无内容', () => {
    const listData = ['学习Jest', '学习Jest', '学习Jest']
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
    const listData = ['学习Jest', '学习Jest', '学习Jest']
    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
    const deleteElem = findTestWrapper(wrapper, 'delete-item')
    deleteElem.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index)
  });
})
