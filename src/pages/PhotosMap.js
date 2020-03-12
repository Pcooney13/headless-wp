import React from 'react';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: 'calc(100% - 60px)',
    height: '100%',
    padding: '30px',
};

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            map: false,
            mapCoords: [],
            error: null,
            posts: null,
        };
    }

    showPostModal(){
        document.getElementById('map-modal').style.display = 'block';
        document.getElementById('modal-bg').style.display = 'block';
    }

    hidePostModal() {
        document.getElementById('map-modal').style.display = 'none';
        document.getElementById('modal-bg').style.display = 'none';
    }

    showMap() {
        return (
            <div id="the-map">
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{
                        lat: 42.6540089,
                        lng: -71.1504676,
                    }}>
                    {this.displayMarkers()}
                </Map>
            </div>
        );
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts() {
        const dataPosts = 'https://pat-cooney.com/wp/wp-json/pcd/v1/photos';
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

    //     center map on user location     //
    /////////////////////////////////////////   
    // showPosition(position) {
    //     console.log("Latitude: " + position.coords.latitude + 
    //     "<br>Longitude: " + position.coords.longitude);  
    // }
    // getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             // Success function
    //             this.showPosition,
    //             // Error function
    //             null,
    //             // Options. See MDN for details.
    //             {
    //                 enableHighAccuracy: true,
    //                 timeout: 5000,
    //                 maximumAge: 0,
    //             }
    //         );
    //             this.setState({
    //                 map: true,
    //                 // mapCoords: [position.coords.latitude, position.coords.longitude],
    //             });
    //     } else { 
    //         console.log("Geolocation is not supported by this browser.");
    //     }
    // }

    displayMarkers = () => {
        return this.state.posts.map((post, index) => {
            return (
                post.location && (
                    <Marker
                    key={index}
                    id={index}
                    info={post}
                    position={{
                        lat: post.location.lat,
                        lng: post.location.lng,
                    }}
                    onClick={(post) => this.markerClicked(post)}
                    />
                )
            );
        });
    };
            
            
            markerClicked = (post) => {
                const theMap = document.getElementById('the-map').children;
                console.log(theMap[0]);
                // theMap[0].setCenter({ lat: post.position.lat, lng: post.position.lng }); 
                document.getElementById('map-modal').style.display = 'block';
                document.getElementById('map-photo-title').innerHTML = post.info.title;
                document.getElementById('map-photo-image').src = post.info.image.medium;
                document.getElementById('map-photo-image').alt = post.info.title;
            }

    render() {
        const { error, isLoaded, map } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded && !map) {
            return (
                <div className="App">
                    <h1>Photos Map</h1>
                </div>
            );
        } else {
            return (
                <div className="App">
                    {console.log(this.state)}
                    {this.state.posts &&
                        this.state.posts[0].location.lat &&
                        console.log(this.state.posts[0].location.lat)}
                    <h1>Photos Map</h1>
                    <Link to="/photos">View Gallery Photos</Link>
                    {this.showMap()}
                    <div id="map-modal">
                        <span
                            onClick={() => {
                                this.hidePostModal();
                            }}
                            className="close-modal">
                            &times;
                        </span>
                        <h2 id="map-photo-title">howdy folks</h2>
                        <img id="map-photo-image" src="" alt="placeholder" />
                    </div>
                </div>
            );
        }
    }

}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDuXxSaiMJiAPGIFtB80KqHUPjPf_gAR4g',
})(MapContainer);
