import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';

export default function DropDownCategorias({ userForTesting, }) {

  const todasLasCategotias = useSelector(state => state.allCategories)

  const createHandleMenuClick = (menuItem) => (event) => {
    event.stopPropagation();
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Dropdown>
        <MenuButton
          onClick={() =>
            setTimeout(() => {
              // window.scrollTo({ top: 400, behavior: 'smooth' }) // for profile2
              window.scrollTo({ top: 170, behavior: 'smooth' }) // for profileEdit
            }
              , 300)}
        >Mis Objetivos</MenuButton>
        <Menu slots={{ listbox: Listbox }}>
          {userForTesting?.Categorias.map((categoria, index) => {
            return (
              <MenuItem key={index} onClick={createHandleMenuClick(categoria)}>
                {categoria}
              </MenuItem>
            );
          })}
          {todasLasCategotias.map((categoria, index) => {
            return (
              <MenuItem key={index} onClick={createHandleMenuClick(categoria)}
                sx={{
                  color: green[900],

                  '&:focus': {
                    outline: `3px solid ${green[200]}`,
                    backgroundColor: green[100],
                    color: green[900],
                  },

                  typography: 'body1',
                  padding: '10px',
                }}
              >
                {categoria.nombre}
              </MenuItem>
            );

          })}
        </Menu>
      </Dropdown>
    </div>
  );
}

const red = {
  50: 'rgb(255, 235, 234)',
  100: 'rgb(255, 204, 203)',
  200: 'rgb(255, 173, 171)',
  300: 'rgb(255, 142, 140)',
  400: 'rgb(255, 111, 109)',
  500: 'rgb(255, 80, 78)',
  600: 'rgb(207, 64, 62)',
  700: 'rgb(159, 48, 46)',
  800: 'rgb(159, 28, 23)',
  900: 'rgb(111, 8, 6)',
};

const green = {
  50: 'rgb(232, 245, 233)',
  100: 'rgb(200, 230, 201)',
  200: 'rgb(165, 214, 167)',
  300: 'rgb(129, 199, 132)',
  400: 'rgb(102, 187, 106)',
  500: 'rgb(76, 175, 80)',
  600: 'rgb(67, 160, 71)',
  700: 'rgb(56, 142, 60)',
  800: 'rgb(46, 125, 50)',
  900: 'rgb(27, 94, 32)',
};

const grey = {
  50: 'rgb(242, 242, 242)',
  100: 'rgb(229, 229, 229)',
  200: 'rgb(216, 216, 216)',
  300: 'rgb(203, 203, 203)',
  400: 'rgb(190, 190, 190)',
  500: 'rgb(177, 177, 177)',
  600: 'rgb(164, 164, 164)',
  700: 'rgb(151, 151, 151)',
  800: 'rgb(146, 144, 144)',
  900: 'rgb(138, 138, 138)',
};

const black = {
  50: 'rgb(46, 46, 46)',
  100: 'rgb(36, 36, 36)',
  200: 'rgb(26, 26, 26)',
  300: 'rgb(16, 16, 16)',
  400: 'rgb(8, 8, 8)',
  500: 'rgb(0, 0, 0)',
  600: 'rgb(0, 0, 0)',
  700: 'rgb(0, 0, 0)',
  800: 'rgb(0, 0, 0)',
  900: 'rgb(0, 0, 0)',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[400]};
  border: 1px solid ${theme.palette.mode === 'dark' ? red[700] : red[200]};
  color: ${theme.palette.mode === 'dark' ? red[300] : red[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? red[600] : red[200]};
    background-color: ${theme.palette.mode === 'dark' ? red[800] : red[100]};
    color: ${theme.palette.mode === 'dark' ? red[300] : red[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? red[700] : red[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: black;
  border: 2px solid rgb(159, 28, 23);
  color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: red[900];
    border-color: red;
  }



  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? red[300] : red[200]};
    outline: none;
  }
  `,
);