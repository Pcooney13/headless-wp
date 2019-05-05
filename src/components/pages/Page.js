import React from 'react'
import styled from 'styled-components'
import { slide, scale } from '../transitions'

const Wrapper = styled.div`
width: 100vw;
height: 90vh;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: ${props => props.color};
`

const Button = styled.div`
background: white;
border: 1px #333;
height: 60px;
font-size: 30px;
border-radius: 5px;
cursor: pointer;
padding: 0 30px;
margin: 10px 30px;
&:focus {
  outline: none;
}
`
console.log(this);

const Page = ({ history, to, ...props }) => (
    <div>
        <Wrapper {...props}>
            <h1>Dynamic transitions</h1>
            <div>
                <Button onClick={() => history.push({ pathname: to, state: slide })}>
                    Slide
                </Button>
                <Button onClick={() => history.push({ pathname: to, state: scale })} >
                    Scale
                </Button>
            </div>
        </Wrapper>
    </div>
);

export const Green = (props) => <Page color='#60d7a9' to='/green' {...props} />

export default Page;