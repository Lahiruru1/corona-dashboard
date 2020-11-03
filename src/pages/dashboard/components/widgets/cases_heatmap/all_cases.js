import React from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";
import GridLoader from "react-spinners/GridLoader";

import {GoogleMapDarkStyles, GoogleMapLightStyles} from './map_styles';
import axios from 'axios';

const HeatMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC39x-WsRw2eS0AhwOVD43gA_G6SiYXYWo&libraries=geometry,drawing&&format=png&maptype=roadmap&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:transit%7Cvisibility:off",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap 
    defaultZoom={2} 
    defaultCenter={{ lat: 46.764096, lng: 6.339148}}
    defaultOptions={{ styles: GoogleMapDarkStyles }} >

    <DrawCasesHeatMap {...props} />
    {/* <Circle
      defaultCenter={{ lat: 46.764096, lng: 6.339148}}
      radius={1000000}
      options={ {
        fillColor: `#e91e1e`,
        fillOpacity: 0.98,
        strokeWeight: 1,
        strokeColor: `#e91e1e`,
        strokeOpacity: 0.8,
        clickable: false,
        editable: false,
      } }
    /> */}
  </GoogleMap>
));

const DrawCasesHeatMap = props => {
  return props.allCases.map((value, index) => {
    console.log({ lat: value.coordinates.latitude, lng: value.coordinates.longitude})
    if (value.coordinates.latitude && value.coordinates.longitude ) {
      return <Circle
              defaultCenter={{ lat: parseInt(value.coordinates.latitude), lng: parseInt(value.coordinates.longitude)}}
              radius={value.stats.confirmed}
              options={ {
                fillColor: `#e91e1e`,
                fillOpacity: 0.68,
                strokeWeight: 1,
                strokeColor: `#e91e1e`,
                strokeOpacity: 0.8,
                clickable: false,
                editable: false,
              } }
            />
    }else {
      return ""
    }
  })

}


class AllCasesHeatMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCases: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchAllCases()
  }

  fetchAllCases = () => {
    axios.get('https://corona.lmao.ninja/v2/jhucsse')
      .then(response => {
        this.setState({
          allCases: response.data,
          isLoading: false,
        })
      })
      .catch(error => {
        console.error(error.message)
        this.setState({
          isLoading: false,
        })
      })
  }

  render () {
    const {
      isLoading,
      allCases
    } = this.state

    if (isLoading) {
      return <GridLoader
                size={15}
                margin={2}
                color={"#f44336"}
                loading={isLoading}/>
    }else {
      return (
        <HeatMapComponent
          allCases={allCases} />
      )
    }
    
  }

}

export default AllCasesHeatMapComponent;