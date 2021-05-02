import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: 'calc(100% - 60px)',
    height: '100%',
    padding: '30px',
};

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // isLoaded: false,
            // map: false,
            mapCoords: [],
            error: null,
            posts: null,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    showMap() {
        return (
            <div class="mx-auto h-96 relative max-w-screen-lg" id="the-map">
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={2}
                    style={mapStyles}
                    initialCenter={{
                        lat: 42.6540089,
                        lng: -71.1504676,
                    }}
                >
                    {/* {this.displayMarkers()} */}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                            {console.log(this.state.selectedPlace.info)}
                            {this.state.selectedPlace.info && (
                                <img
                                    src={
                                        this.state.selectedPlace.info.image
                                            .medium
                                    }
                                    alt={this.state.selectedPlace.info.title}
                                />
                            )}
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }

    displayMarkers = () => {
        return this.state.posts.map((post, index) => {
            return (
                post.location && (
                    <Marker
                        key={index}
                        id={index}
                        info={post}
                        name={post.title}
                        position={{
                            lat: post.location.lat,
                            lng: post.location.lng,
                        }}
                        // onClick={(post) => this.displayInfoWindows(post)}
                        onClick={this.onMarkerClick}
                    />
                )
            );
        });
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        const dataPosts = 'https://pat-cooney.com/wp/wp-json/v1/recipes';
        fetch(dataPosts)
            .then(value => value.json())
            .then(value => {
                this.setState(
                    {
                        isLoaded: true,
                        posts: value,
                    },
                    error => {
                        this.setState({
                            isLoaded: true,
                            error,
                        });
                    }
                );
            });
    }

    // center map on user location     //
    ///////////////////////////////////////   
    showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude);  
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success function
                this.showPosition,
                // Error function
                null,
                // Options. See MDN for details.
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
                this.setState({
                    map: true,
                    // mapCoords: [position.coords.latitude, position.coords.longitude],
                });
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }

    render() {
        // const { error, isLoaded, map } = this.state;
        const { error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div className="App">
                    {/* {console.log(this.state)}
                    {this.state.posts &&
                        this.state.posts[0].location.lat &&
                        console.log(this.state.posts[0].location.lat)} */}
                    {this.showMap()}
                </div>
            );
        }
    }

}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDuXxSaiMJiAPGIFtB80KqHUPjPf_gAR4g',
})(MapContainer);
