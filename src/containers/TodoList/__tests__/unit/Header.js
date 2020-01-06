import React from 'react';
import Header from '../../components/Header'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { findTestWrapper } from '../../../../utils/testUtils'

Enzyme.configure({ adapter: new Adapter() })

describe('Header 组件', () => {
  it('渲染样式正常', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  });

  it('包含一个输入框', () => {
    const wrapper = shallow(<Header />)
    const InputEle = findTestWrapper(wrapper, 'input')
    expect(InputEle.length).toBe(1)
  });

  it('输入框内容初始化内容为空', () => {
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

  it('输入框输入回车时，如果输入框无内容，无反应', () => {
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
})