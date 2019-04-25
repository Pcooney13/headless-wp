import React, { Component } from 'react';

class OneProject extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }
    componentDidMount() {
        let dataURL = "http://10.0.1.86:8888/pcooney/wp-json/wp/v2/posts";
        fetch(dataURL)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    projects: res
                })
            })
    }
    render() {
        
        let projects = this.state.projects.map((project, index) => {
            if (window.location.pathname === `/web/${project.acf.title}`) {
                return <div key={index} className="image-showcase">
                    <h1>{project.acf.title}</h1>
                    {/* <img src={project.acf.image_1.sizes.large} alt={project.acf.title} /> */}
                    <img src={`http://10.0.1.86`.concat('', `${project.acf.image_1.sizes.large}`.substring(16))} alt={project.acf.title}/>
                    <p>{project.title.rendered}</p>
            </div>
            } else return false;
        });
        return (
            <div>
                {projects}
            </div>
        )
    }
}
export default OneProject;

