import React from 'react';
import { Logo} from '../graphics/index.js';
function MenuBar() {
    return (
    <div>
      <nav className="Navigation">
        <a href="/" className='LogoLink'>
            <Logo className="Logo" /> 
            <span className="MenuTitle">NostrRef</span>
        </a>
      </nav>
    </div>
    );
  }
export default MenuBar;  