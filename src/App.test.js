import React from 'react';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new Adapter() })

test('renders without crashing', () => {
  // const add = document.createElement('div')
  // const container = document.getElementsByClassName('App')
  // expect(container.length).toBe(2)

  const wrapper = mount(<App />)
  expect(wrapper).toMatchSnapshot()
  const container = wrapper.find('[data-test="container"]')
  // expect(wrapper.find('[data-test="container"]').length).toBe(1)
  // expect(wrapper.find('[data-test="container"]').prop('title')).toBe('dell lee')
  expect(container).toExist()
  expect(container).toHaveProp('title', 'dell lee')
});
