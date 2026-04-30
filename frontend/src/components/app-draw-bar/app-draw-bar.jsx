import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {Menu} from '@mui/icons-material'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import useDataBaseService from '../../services/DataBaseService';
import { Button, createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import photoPlug from "../../images/photo.png";
import cancelIcon from "../../images/cancel-icon.png";


import "./app-draw-bar.css";
import { setUser, 
  setSectionIcon, addSection, 
  setSelectedSection, 
  setItemsList, setData, setSelectedItem, setUserAvatar,
  setSectionMenuCoords
 } from '../../redux/actions';
import TooltipMenuSection from '../menu/tooltip-menu-section';
import { encrypt_file } from '../../utils/encryption';


const drawerWidth = 240;
const navItems = [
  'Admin-панель', 
  'Регистрация пользователея',
  'Импорт пользователей', 
  'Настройки'];

export const DrawerAppBar = (props) => {


    const { window } = props;
    
    const [mobileOpen, setMobileOpen] = React.useState()
    const [newSectionVisibility, setNewSectionVisibility] = React.useState("hidden")

    const {
      getServerAddress, 
      logOut, 
      changeUserAvatar,
      uploadSectionImage,
      addNewSection,
      getItems,
     } = useDataBaseService();

    const {user, sections, keyPair } = useSelector(state => state);

    const dispatch = useDispatch();

    const refNewSectionTitle =  React.useRef(null)


    const handleDrawerToggle = (e) => {

      const classNameElement = e.target.className.toString();

      // проверяем и исключаем сворачивание бокового меню при клике на некоторые элементы
      if (!classNameElement.includes("section-img") &&
          !classNameElement.includes("section-icon") &&
          !classNameElement.includes("user-avatar") &&
          !classNameElement.includes("new-section") &&
          !classNameElement.includes("button-add-section"))
        setMobileOpen((prevState) => !prevState);
    };

    const onClickHandle = (section) => {
        dispatch(setSelectedSection(section));
        dispatch(setItemsList(null));
        dispatch(setData([]));
        dispatch(setSelectedItem(null))
        getItems(section.id).then(response => {
          setTimeout(() => {
            dispatch(setItemsList(response.items));
          }, 100)
          
        })
    }

    const onClickLogoutHandle = (e) => {

      logOut().then(response => {
        dispatch(setUser(null))
      })
    }


    // Загрузка файла-картинки на сервер 
    const onClickUpdateImage = (sectionId) => {

      const element = document.querySelector("#inputFileUploader")

        const clickElement = new MouseEvent("click", {});

        element.onchange = e => {
            const [file] = element.files;

            if (file) {
                const data = new FormData();

                data.append("file", file)
                dispatch(setSectionIcon(sectionId, ""))

                uploadSectionImage(sectionId, data).then(response => {

                  // Обновление картинки (пример с технологией redux)
                  dispatch(setSectionIcon(sectionId, response.sectionIconPath))
                    
                })

                element.value = null;                
            }

        }

        element.dispatchEvent(clickElement);
    }

    const onClickUserAvatarHandle = () => {
      const element = document.querySelector("#inputFileUploader")

      const clickElement = new MouseEvent("click", {});

      element.onchange = e => {
          const [file] = element.files;

          if (file) {
              const data = new FormData();

              data.append("file", file)

              changeUserAvatar(user.id, data).then(response => {
                dispatch(setUserAvatar(response.filePath))
              })

              element.value = null;                
          }

          

          // var selectedFile = e.target.files[0]; // Получить выбранный файл
          // if (selectedFile) {
          //   var reader = new FileReader();
          
          //   reader.onload = function(event) {
          //     var byteArray = new Uint8Array(event.target.result);
          //     // Теперь у вас есть массив байтов byteArray, содержащий данные выбранного файла
          //     changeUserAvatar(user.id, byteArray).then(response => {
          //       dispatch(setUserAvatar(response.filePath))
          //     })
          //   };
          
          //   reader.readAsArrayBuffer(selectedFile);
          // }

      }
      element.dispatchEvent(clickElement);
    }


    const onClickNewSectionHandle = () => {
      setNewSectionVisibility("visible");
    }

    const onClickCanselNewSeactionHandle = () => {
      setNewSectionVisibility("hidden");
    }

    const onClickAddNewSection = () => {
      setNewSectionVisibility("hidden");

      const title = refNewSectionTitle.current.value;

      addNewSection(user.username, title).then(response => {
        dispatch(addSection(response.section));
      })
    }

    const onContextMenuHandle = (e, section) => {

      e.preventDefault();
      dispatch(setSelectedSection(section));

      dispatch(setSectionMenuCoords({x:e.clientX, y:e.clientY}))
    }

    const onClickTooltipMenuHandle = () => {
      setMobileOpen((prevState) => !prevState);
    }


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          
          <div className='user-data'>
            <div className='avatar'>

              <img className='user-avatar'
              src={user.avatar!==""?`${getServerAddress()}/static/avatars_users/${user.avatar}?v=${Math.random()}`:photoPlug}
              onClick={onClickUserAvatarHandle}/>
            </div>
            <div className='username'>
              {user.username}
            </div>
            <div className='logout' onClick={onClickLogoutHandle}>Выйти</div>
          </div>
          <Divider />
          <List className='section' sx={{height: "calc(100vh - 164px)", overflow: "scroll", overflowX: "hidden"}}>

            {sections.map((section, i) => (
              <ListItem key={i} disablePadding sx={{  
                color: "#515261", 
                margin: "4px 4px", 
                background: "white", 
                width: "calc(100% - 8px)",
                borderRadius: "4px"}}>
                <ListItemButton sx={{ textAlign: 'left', }} 
                onClick={() => onClickHandle(section)}
                onContextMenu={(e) => onContextMenuHandle(e, section)}
                >
                
                {section.icon!==""?<div className='section-icon'>

                  {/* ?v=${Math.random()} - исключает кэширование изображения */}
                  <img className='section-img'
                    src={`${getServerAddress()}/static/${section.icon}?v=${Math.random()}`}
                   onClick={() => onClickUpdateImage(section.id)}/>
                </div>
                :<img className='section-icon-plug' src={photoPlug} onClick={() => onClickUpdateImage(section.id)} />}
                
                <ListItemText primary={section.title} />
                
                </ListItemButton>
              </ListItem>
            ))}

          <div className='new-section' style={{visibility: newSectionVisibility}}>
            <input type='text' className='new-section-title' placeholder='Новая секция' ref={refNewSectionTitle} />
            <img src={cancelIcon} className='new-section-cancel' onClick={onClickCanselNewSeactionHandle} />
            <Button className='new-section-button' onClick={onClickAddNewSection}>Добавить</Button>
          </div>
          
            
          </List>
          <input type='file' style={{visibility: 'hidden', width: 0}} id="inputFileUploader" />
          <Button className='button-add-section'
            sx={{visibility: newSectionVisibility==="hidden"? "visible": "hidden"}}
            onClick={onClickNewSectionHandle}
            variant='primary'>+</Button>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>

          <TooltipMenuSection onClickCallback={onClickTooltipMenuHandle} />

          <AppBar component="nav" sx={{background: 'transparent', boxShadow: 'none', width: 'auto', left: 0, right: 'auto'}}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Menu color='primary' />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display:  'block'  ,
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box', 
                  width: drawerWidth,
                  background: '#515261',
                  color: "white"
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      );

}