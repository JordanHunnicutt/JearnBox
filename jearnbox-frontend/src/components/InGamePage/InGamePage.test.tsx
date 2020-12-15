import { shallow } from 'enzyme';
import React from 'react'
import { InGamePage } from './InGamePage';

let wrapper:any;

beforeEach(()=>{
    wrapper = shallow(<InGamePage address="someAdress" uName="userName" gameJoined={() => {true}}/>);
})

test("wrapper matches snapshot", () => {
    expect(wrapper).toMatchSnapshot;
})