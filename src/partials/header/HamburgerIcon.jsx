import styled from 'styled-components';
import React from 'react';

const BurgerButton = styled.button`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  visibility: hidden;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 3rem;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 0 5px 0;
  z-index: 10;

  @media all and (max-width: 750px) {
    visibility: visible;
  }
`;

const BurgerBar = styled.div`
  width: 25px;
  height: 2px;
  background-color: white;
  margin: 3px 0 3px 0;
  transition: 0.3s;
`;

const HamburgerIcon = props => {
  const handleClick = () => {
    props.toggleMobileMenu();
  };
  return (
    <BurgerButton onClick={handleClick}>
      <BurgerBar />
      <BurgerBar />
      <BurgerBar />
    </BurgerButton>
  );
};

export default HamburgerIcon;
