import React from 'react'
import { mount } from 'enzyme'
import { JoinGamePage } from './JoinGamePage';
import { Provider } from 'react-redux';
import { store } from '../../Store';
import { Input } from 'reactstrap';

let wrapper: any;

beforeEach(() => {
    wrapper = mount(<Provider store={store}><JoinGamePage /></Provider>);
});

test("wrapper matches snapshot", () => {
    expect(wrapper).toMatchSnapshot;
});

test("clicking the submit button with no username causes an error message", () => {
    wrapper.find(Input).at(2).simulate("click");
    expect(wrapper.find(".errMessClass")).toBeTruthy;
});

test("clicking the submit button with no room code causes an error message", () => {
    // wrapper.find("input").at(0).simulate("change", {target: { value:"user"}});
    wrapper.find("input").at(0).instance().value = "user";
    // console.log(wrapper.find("input").at(0).debug())
    wrapper.find(Input).at(2).simulate("click");
    expect(wrapper.find(".errMessClass")).toBeTruthy;
    // console.log(wrapper.find(".errMessClass").debug());
});