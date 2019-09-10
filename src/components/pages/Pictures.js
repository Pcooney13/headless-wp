// //add onclick handler for categories
// //click checks what category was clicked and runs through all posts for a match

// //another handler for when image is clicekd changing it out from medium to large and zoom effect to look like a screen change

// // Polish the transition from blurred image taking up screen to full size image
// // Figure out the functionality for zomming from gallery card specifically not just top left corner

// import React from 'react';
// import { Link } from 'react-router-dom';

// class Photos extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//         };
//     }

//     componentDidMount() {
//         const dataPosts =
//             'http://mghpsych.launchpaddev.com/wp-json/wp/v2/posts?per_page=100';
//         const dataCategories =
//             'http://mghpsych.launchpaddev.com/wp-json/wp/v2/topic?per_page=18';

//         Promise.all([
//             fetch(dataPosts).then(value => value.json()),
//             fetch(dataCategories).then(value => value.json()),
//         ]).then(value => {
//             const PostArrays = value[0].map(post => {
//                 post.category = [];
//                 post.topic.map(category => {
//                     value[1].map(datacat => {
//                         if (category === datacat.id) {
//                             post.category.push([
//                                 datacat.slug,
//                                 datacat.acf.banner_image.sizes.large,
//                             ]);
//                         }
//                     });
//                     return category;
//                 });
//                 delete post.topic;
//                 return post;
//             });
//             PostArrays.sort(function (a, b) {
//                 var textA = a.slug.toUpperCase();
//                 var textB = b.slug.toUpperCase();
//                 return textA < textB ? -1 : textA > textB ? 1 : 0;
//             });
//             this.setState(
//                 {
//                     isLoaded: true,
//                     posts: PostArrays,
//                     allPosts: PostArrays,
//                 },
//                 error => {
//                     this.setState({
//                         isLoaded: true,
//                         error,
//                     });
//                 }
//             );
//         });
//     }

//     handleImage(image) {
//         console.log(image.id)
//         this.setState(prevState => {
//             const postShowcase = prevState.posts.map(post => {
//                 if (post.id === image.id) {
//                     console.log(post.title.rendered)
//                 }
//                 return post
//             })
//             return {
//                 posts: postShowcase
//             }
//         });
//     }

//     handleCategories(tag) {
//         const categorizedPosts = []
//         this.state.allPosts.map(post => {
//             post.category.map(categories => {
//                 if (categories[0] === tag[0]) {
//                     categorizedPosts.push(post);
//                 }
//             })
//         })
//         this.setState({
//             posts: categorizedPosts,
//         });
//     }

//     render() {
//         window.scrollTo(0, 0);
//         const { error, isLoaded } = this.state;
//         if (error) {
//             return <div>Error: {error.message}</div>;
//         } else if (!isLoaded) {
//             return (
//                 <div className="App">
//                     <h1>Photos</h1>
//                 </div>
//             );
//         } else {
//             return (
//                 <div className="App">
//                     <h1>
//                         Photos
//                         {this.props.match.params.category &&
//                             ' of ' + this.props.match.params.category.charAt(0).toUpperCase() + this.props.match.params.category.slice(1)}
//                     </h1>
//                     <div className="gallery">
//                         {console.log(this.state.posts)}
//                         {this.state.posts.map(post => (
//                             <div
//                                 key={post.slug}
//                                 className="gallery-card">
//                                 <div className="gallery-imagebox">
//                                     {console.log(post.category)}
//                                     <Link
//                                         to={`/photo/${post.slug}`}
//                                         className="gallery-image"
//                                         onClick={() =>
//                                             this.handleImage(post)
//                                         }
//                                         style={{
//                                             backgroundImage:
//                                                 'url(' +
//                                                 post.category.length !== 0 && 'https://via.placeholder.com/400x400' +
//                                                 ')',
//                                         }}
//                                     />
//                                 </div>
//                                 <div className="gallery-textbox">
//                                     <h4 className="gallery-title">
//                                         <Link
//                                             to={`/photo/${
//                                                 post.slug
//                                                 }`}>
//                                             {post.title.rendered
//                                                 .replace(
//                                                     '#038;',
//                                                     ''
//                                                 )
//                                                 .replace(
//                                                     '&#8217;',
//                                                     "'"
//                                                 )}
//                                         </Link>
//                                     </h4>
//                                     <p className="gallery-categories">
//                                         {post.category.map(tag => (
//                                             <Link
//                                                 key={Math.floor(
//                                                     Math.random() *
//                                                     1000
//                                                 )}
//                                                 className="gallery-category"
//                                                 style={{
//                                                     backgroundColor: 'blue',
//                                                     borderTopColor: 'blue',
//                                                 }}
//                                                 to={`/pictures/${tag[0]}`}
//                                                 onClick={() =>
//                                                     this.handleCategories(tag)
//                                                 }
//                                                 data-tooltip={
//                                                     tag[0].charAt(0).toUpperCase() +
//                                                     tag[0].slice(1)
//                                                 }
//                                                 aria-hidden="true">
//                                                 {tag[0].slice(0, 1).toUpperCase()}
//                                             </Link>
//                                         ))}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             );
//         }
//     }
// }

// export default Photos;