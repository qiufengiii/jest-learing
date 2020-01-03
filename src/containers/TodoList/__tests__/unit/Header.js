import React from 'react';
import Header from '../../components/Header'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
import { findTestWrapper } from '../../../../utils/testUtils'

it('Header渲染样式正常', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot()
});

it('Header组件包含一个input框', () => {
  const wrapper = shallow(<Header />)
  const InputEle = findTestWrapper(wrapper, 'input')
  expect(InputEle.length).toBe(1)
});

it('Header组件 input内容初始化内容为空', () => {
  const wrapper = shallow(<Header />)
  const InputEle = findTestWrapper(wrapper, 'input')
  const userInput = '今天要学习jest'
  InputEle.simulate('change', {
    target: {
      value: userInput
    }
  })
  expect(wrapper.state('value')).toEqual(userInput)
});

it('Header组件input框输入回车时，如果input无内容，无操作', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const InputEle = findTestWrapper(wrapper, 'input')
  const userInput = '学习react'
  wrapper.setState({ value: userInput })
  InputEle.simulate('keyup', {
    keyCode: 13
  })
  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenLastCalledWith(userInput)
  const newInputEle = findTestWrapper(wrapper, 'input')
  expect(newInputEle.prop('value')).toBe('')
});