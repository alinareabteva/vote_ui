import {NavLink} from "react-router-dom";
import styled from '@emotion/styled'

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  &.active {
    text-decoration: underline;
  }
  
  &:hover {
    font-weight: bold;
    color: white;
  }
`