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
  it("Displays location when the value is set", () =>{
    const wrapper = shallow(<Home />).dive();
    let data =({"markers":[[{"formattedAddress":"Secaucus, NJ, USA","latitude":40.7895453,"longitude":-74.05652979999999,"extra":{"googlePlaceId":"ChIJD-XGzLZXwokRTw5UpowEXV8","confidence":0.5,"premise":null,"subpremise":null,"neighborhood":"Secaucus","establishment":null},"administrativeLevels":{"level2long":"Hudson County","level2short":"Hudson County","level1long":"New Jersey","level1short":"NJ"},"city":"Secaucus","country":"United States","countryCode":"US","provider":"google"}],[{"formattedAddress":"New York, NY, USA","latitude":40.7127753,"longitude":-74.0059728,"extra":{"googlePlaceId":"ChIJOwg_06VPwokRYv534QaPC8g","confidence":0.5,"premise":null,"subpremise":null,"neighborhood":"New York","establishment":null},"administrativeLevels":{"level1long":"New York","level1short":"NY"},"city":"New York","country":"United States","countryCode":"US","provider":"google"}]]})
    wrapper.setState({ markersData: data.markers})
    const div = wrapper.find(".location-value");
    expect(div.length).toBeGreaterThan(0);
    appRender().unmount();
  });
  it("CRUD: Communicates with the backend to saveMarker", () =>{
    const wrapper = shallow(<Home />).dive();
    const changeMarker = jest.spyOn(wrapper.instance(), 'changeMarker');
    wrapper.instance().saveMarker();
    expect(changeMarker).toHaveBeenCalled()
  })
  it("CRUD: Communicates with the backend to deleteMarker", () =>{
    const wrapper = shallow(<Home />).dive();
    const changeMarker = jest.spyOn(wrapper.instance(), 'changeMarker');
    wrapper.instance().deleteMarker([{formattedAddress: "New York"}]);
    expect(changeMarker).toHaveBeenCalled()
  })
  it("Toggles text field when the edit button is pressed" ,() =>{
    const wrapper = shallow(<Home />).dive();
    wrapper.instance().toggleTextField(3);
    expect(wrapper.state().index).toEqual(3)
  })
});
