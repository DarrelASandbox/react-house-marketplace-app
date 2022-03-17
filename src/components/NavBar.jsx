import {
  ExploreIcon,
  LocalOfferIcon,
  PersonOutlineIcon,
} from 'assets/svg/index';
import { NavLink } from 'react-router-dom';

// You can pass a function to the NavLink component from react-router-dom.
// The function gets an isActive boolean available to it which you can then conditionally render based on styling.

const NavBar = () => (
  <footer className='navbar'>
    <nav className='navbarNav'>
      <ul className='navbarListItems'>
        <li className='navbarListItem'>
          <NavLink to='/'>
            {({ isActive }) => (
              <>
                <ExploreIcon
                  fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                  width='36px'
                  height='36px'
                />
                <p
                  className={
                    isActive ? 'navbarListItemNameActive' : 'navbarListItemName'
                  }
                >
                  Explore
                </p>
              </>
            )}
          </NavLink>
        </li>
        <li className='navbarListItem'>
          <NavLink to='/offers'>
            {({ isActive }) => (
              <>
                <LocalOfferIcon
                  fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                  width='36px'
                  height='36px'
                />
                <p
                  className={
                    isActive ? 'navbarListItemNameActive' : 'navbarListItemName'
                  }
                >
                  Offers
                </p>
              </>
            )}
          </NavLink>
        </li>
        <li className='navbarListItem'>
          <NavLink to='/profile'>
            {({ isActive }) => (
              <>
                <PersonOutlineIcon
                  fill={isActive ? '#2c2c2c' : '#8f8f8f'}
                  width='36px'
                  height='36px'
                />
                <p
                  className={
                    isActive ? 'navbarListItemNameActive' : 'navbarListItemName'
                  }
                >
                  Profile
                </p>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  </footer>
);

export default NavBar;
