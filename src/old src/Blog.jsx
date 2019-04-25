import React, { Component } from "react";
import { Link } from 'react-router-dom';
import OneProject from "./OneProject";
const axios = require('axios')

const getBreeds = async () => {
    try {
        return await axios.get('http://10.0.1.86:8888/pcooney/wp-json/wp/v2/posts')
    } catch (error) {
        console.error(error)
    }
}

// const countBreeds = async () => {
//     const breeds = await getBreeds()
//     console.log(breeds);
//     if (breeds.status === 200) {
//         console.log(`Got ${Object.entries(breeds.status).length+1} breeds`)
//         let projects = breeds.map((project, index) => {
//             return <div key={index} className="image-gallery">
//                 <Link to={`web/${project.acf.title}`} component={OneProject}>
//                     <img src={`http://10.0.1.86`.concat('', `${project.acf.image_1.sizes.medium}`.substring(16))} alt={project.acf.title} />
//                 </Link>
//             </div>
//         });
//     }
// }

// countBreeds();

class Stuff extends Component {
  render() {
    return (
      <div>
        <h2>A Blog Post</h2>
        <p>
        Lorem ipsum dolor sit amet, duo vidit ullamcorper eu, mollis utroque vis ne, 
        fugit nominavi scripserit ex vim. Assum quaerendum delicatissimi vix id, nobis iisque vim ad, 
        commodo consetetur incorrupte et quo. No per magna inermis neglegentur, ius elit accusata maluisset 
        an, quo posse viris an. Sed ad fabulas utroque repudiandae, eu sit pertinax delicata, postulant efficiantur 
        vis cu. Id cum commodo definitiones.
        </p>
        <p>
        Civibus ponderum cu eum, ut mel errem tamquam intellegam, ea eos dico enim. Ne stet conclusionemque cum. 
        Per solum essent recteque eu. Nulla blandit ei eos, adhuc fabulas cu vim.
        </p>
        <p>
        Id dicunt phaedrum sententiae pri. Per modo dico modus an, ex noster singulis eos, pro cu saepe elaboraret 
        vituperatoribus. Te sumo fuisset verterem sit, utinam volutpat te sit, ne ius euripidis percipitur. 
        Albucius repudiare nec an, an sanctus scaevola ullamcorper duo, et inimicus ocurreret vel. 
        Ne iriure timeam mel. Vim cu dico feugait.
        </p>
        <p>
        Nam inani percipitur no, ne vix omnesque repudiandae. Ius cu elit mediocritatem. 
        Te eum argumentum inciderint, omnis tempor intellegat vel in. 
        Rebum elaboraret eum ex.
        </p>
        <p>
        Cum ea quidam senserit splendide. Purto labore nec cu, nullam graeci te pro. 
        Ne sale soluta nec, magna rebum prompta ea eam. Quodsi impetus philosophia eos ad. 
        Cum diam iuvaret ea, per ne blandit pericula. Consul molestie vis cu, no soleat recteque sea. 
        Hinc vitae referrentur cum an, vel debet phaedrum ei.
        </p>
      </div>
    );
  }
}

export default Stuff;