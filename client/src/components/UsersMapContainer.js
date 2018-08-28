import React from "react";
import UsersMap from "./UsersMap";

export default class UsersMapContainer extends React.Component {

  render() {
    return (
      <UsersMap
        users={this.props.users}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{width: `100%`}} />}
        containerElement={<div style={{ height: `300px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}