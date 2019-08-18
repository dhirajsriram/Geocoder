import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./pages/home";
import { mount, shallow } from "enzyme";

configure({ adapter: new Adapter() });
describe("Geocoder", () => {
  let props;
  let app;
  let render;
  const appRender = () => {
    app = mount(<Home {...props} />);
    return app;
  };

  it("always renders a map", () => {
    const div = appRender().find(".map");
    expect(div.length).toBeGreaterThan(0);
    appRender().unmount();
  });
  it("Shows error component when no locations are found", () => {
    const wrapper = shallow(<Home />).dive();
    wrapper.setState({ Errored: true });
    const div = wrapper.find(".error");
    expect(div.length).toBeGreaterThan(0);
    appRender().unmount();
  });
  it("Removes the error component when the close button is clicked", () => {
    const wrapper = shallow(<Home />).dive();
    wrapper.setState({ Errored: true });
    const btn = wrapper.find(".close-btn")
    btn.simulate('click');
    wrapper.update();
    const div = wrapper.find(".error");
    expect(div.length).toEqual(0);
    appRender().unmount();
  });
  it("Sets up map on init", () => {
    const wrapper = shallow(<Home />).dive();
    const spyGetAllMarkers = jest.spyOn(wrapper.instance(), 'setupMap');
    wrapper.instance().componentDidMount();
    expect(spyGetAllMarkers).toHaveBeenCalled()
  });
  it("Shows error component when there is an error from the backend", () => {
    const wrapper = shallow(<Home />).dive();
    wrapper.setState({ Errored: true });
    const div = wrapper.find(".error");
    expect(div.length).toBeGreaterThan(0);
    appRender().unmount();
  });
});
