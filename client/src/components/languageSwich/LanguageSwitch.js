import React from 'react';
import { Dropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const LanguageSwitch = (props) => {
    return(
    <div className="dropdown">
        
        <Dropdown>
        <Dropdown.Toggle 
         variant="success btn-lg">
             <Icon.ChatFill size="lg"/> 
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor:'rat'}}>
            <Dropdown.Item href="#" >Arabic</Dropdown.Item>
            <Dropdown.Item href="#">Hebrew</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    </div>
    )
}

export default LanguageSwitch;