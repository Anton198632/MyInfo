import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import imgIconDefault from "../../../images/image-icon.png";
import useDataBaseService from '../../../services/DataBaseService';

import { setIcons, setItemIcon, setItemMenuCoords, setItemsList, setSelectedItem, setShowIconsWindow } from '../../../redux/actions';
import TooltipMenuItem from '../../menu/tooltip-menu-item';
import { Tune } from '@mui/icons-material';

export default function StyledTreeItem(props) {

  const myTheme = useSelector(state=>state.theme);
  const isLightTheme = myTheme==="light";

  const {selectedSection, user} = useSelector(state=>state)

  const [imgSrc, setImgSrc] = React.useState("");


  const {getIcons} = useDataBaseService();

  const dispatch = useDispatch()

  const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: isLightTheme?theme.palette.text.secondary:"#f5f5f5",
      // borderTopRightRadius: theme.spacing(2),
      // borderBottomRightRadius: theme.spacing(2),
      borderRadius: "4px",
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: isLightTheme?theme.palette.action.hover: "#4f4f4f",
        
      },
      '&.Mui-selected:hover': {
        backgroundColor: isLightTheme?'#d7ddfa':'#dddddd',
      } ,

      // '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      '&.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: 
        `var(--tree-view-bg-color, ${isLightTheme?theme.palette.action.selected:"#bbc0c9"})`,
        color: isLightTheme?'var(--tree-view-color)':"#25252d",
      },
      '&.Mui-focused': {
        backgroundColor: isLightTheme?"white":"#4D4D4D",
        color: isLightTheme?theme.palette.text.secondary:"#f5f5f5",
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
      paddingLeft: "12px",
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
      },
    },
  }));



    const theme = useTheme();
    const {
      bgColor,
      color,
      labelIcon, //: LabelIcon,
      labelInfo,
      labelText,
      colorForDarkMode,
      bgColorForDarkMode,
      
      itemId,

      myColor,
      myBackgroundColor,

      ...other
    } = props;

    theme.palette.mode = "dark"
  
    const styleProps = {
      '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
      '--tree-view-bg-color':
        theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
    };


    const onMouseEnterHandle = (e) => {

      if (labelIcon === "" ) {
         setImgSrc(imgIconDefault);
      }

    }

    const onMouseLeaveHandle = (e) => {
      if (labelIcon === "" ) {
        setImgSrc("");
      }
    }

    // Загрузка файла-картинки на сервер 
    const onClickUpdateImage = () => {


      getIcons(user.username).then(response => {
        dispatch(setIcons(response.icons));
        dispatch(setShowIconsWindow(true));
      })




      // const element = document.querySelector("#inputFileUploader")

      //   const clickElement = new MouseEvent("click", {});

      //   element.onchange = e => {
      //       const [file] = element.files;

      //       if (file) {
      //           const data = new FormData();

      //           data.append("file", file)
                

      //           uploadItemImage(itemId, data).then(response => {
                  
      //             dispatch(setItemsList([]));
                  
      //             getItems(selectedSection.id).then(response => {
      //               dispatch(setItemsList(response.items));
      //             })

      //             // setItemIcon(itemId, response.icon)
      //             // setTimeout(() => {
      //             //   setImgSrc(`${getServerAddress()}/static/${response.icon}?v=${Math.random()}`);
      //             // }, 1000)
                  
      //           })

      //           element.value = null;                
      //       }

      //   }

      //   element.dispatchEvent(clickElement);
    }



    React.useEffect(() => {
      setImgSrc(labelIcon)
    }, [])


    const contextMenuHandle = (e) => {

      e.preventDefault();


      var clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: e.clientX, // Здесь x - горизонтальная координата, куда вы хотите выполнить клик
        clientY: e.clientY, // Здесь y - вертикальная координата, куда вы хотите выполнить клик
      });

      e.target.dispatchEvent(clickEvent);

      dispatch(setItemMenuCoords({x:e.clientX, y:e.clientY}))
    }

    // const onClickItemHandle = () => {
    //   dispatch(setSelectedItem(itemId))
    // }
  
    return (
      <StyledTreeItemRoot

      
        onContextMenu={contextMenuHandle}
        
      
        
        label={
          <Box
          onMouseEnter={onMouseEnterHandle}
          onMouseLeave={onMouseLeaveHandle}

          // onClick={onClickItemHandle}

            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0.5,
              pr: 0,
            }}
          >
            <Box 
            // component={LabelIcon} 
             
              color={myColor} sx={{ mr: 1 }} />
              <img size='sm' src={`${labelIcon}`} className='item-icon' onClick={onClickUpdateImage} />
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}
             

            >
              {labelText}
            </Typography>
            <Typography variant="caption" color={myBackgroundColor}>
              {labelInfo}
            </Typography>

          </Box>
        }
        style={styleProps}
        {...other}
      />
    );
  }
  
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    bgColorForDarkMode: PropTypes.string,
    color: PropTypes.string,
    colorForDarkMode: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
  };