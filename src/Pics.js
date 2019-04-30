import React, {Component} from 'react';
// import './product.css';
// import DataService from '../services/data-service';
// import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

// let ds = new DataService();
// let ns = new NotificationService();

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {onWishList: itemOnWishList()};

        //bind
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }

    componentDidMount() {
        this.onWishListChanged;
    }
    componentWillUnmount() {
        // ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList) {
        this.setState({onWishList: itemOnWishList(this.props.product)});
    }

    onButtonClicked = () => {
        if (this.state.onWishList) {
            // ds.removeWishListItem(this.props.product);
        } else {
            // ds.addWishListItem(this.props.product);
        }
    }

    render() {

        let btnClass;

        if (this.state.onWishList) {
            btnClass = "btn btn-danger";
        } else{
            btnClass = "btn btn-primary";
        }
        return(
            <div className="card product">
                <div className="img-holder">
                    <img className="card-img-top" alt="Product" src={this.props.product.imgUrl}></img>
                </div>
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text">Price: ${this.props.product.price}</p>
                    <button onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove From WishList" : "Add to WishList"}</button>
                </div>
            </div>
        );
    }
}

export default Product;
