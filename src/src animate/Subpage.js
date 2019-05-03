import React from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.color};
`;

const Subpage = ({ history, to, ...props }) => (
      <div>
        <Wrapper {...props}>
          <h1>Users</h1>
          <strong>select a user</strong>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        </Wrapper>
      </div>
);

export const SubpageProps = props => (
  <Subpage color="#60d7" to="/subpage" {...props} />
);


export default Subpage; 
