import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import Search from "./search/search";

import settingsBlackIcon from "../../images/settings-black-icon.png";
import settingsLightIcon from "../../images/settings-white-icon.png";
import themeBlackIcon from "../../images/theme-black-icon.png";
import themeLightIcon from "../../images/theme-light-icon.png";
import { setTheme } from "../../redux/actions";
import useDataBaseService from "../../services/DataBaseService";


export default function () {

    const {selectedSection, selectedItemId, items, theme, user} = useSelector(state=> state);

    const isLightTheme = theme==="light";

    const dispatch = useDispatch();

    const setThemeToServer = useDataBaseService().setTheme;

    function findTitlePathById(id, arr) {
        for (const item of arr) {
          if (item.id === id) {
            return item.title;
          }
          if (item.childs) {
            const path = findTitlePathById(id, item.childs);
            if (path) {
              return item.title + ' / ' + path;
            }
          }
        }
        return null;
    }


    const getFullMap = () => {
        // const selectedSectionTitle = selectedSection? selectedSection.title: "";
        // const selectedItemTitle = selectedItemId? selectedItemId.title: null;

        // return `${selectedSectionTitle}${selectedItemTitle?" / " + selectedItemTitle:""}`


        return selectedItemId? " / " + findTitlePathById(selectedItemId.id, items) : ""
    }

    const changeTheme = () => {

      dispatch(setTheme(!isLightTheme));
      setThemeToServer(user.username, isLightTheme?"dark":"light").then(response => {})

    }



    return (
        <div className="header">

            <div className="header-left">
                <Search />
                <div className="selected-section">
                    <span className="section-header">{selectedSection? selectedSection.title: ""}</span>{getFullMap()}
                </div>
            </div>

            <div className="header-right">
                <img className="header-icon" src={isLightTheme?settingsBlackIcon:settingsLightIcon} />
                <img className="header-icon" onClick={changeTheme} src={isLightTheme?themeBlackIcon:themeLightIcon} />

            </div>
            


        </div>
    )



}