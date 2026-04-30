import "./data-menu.css";

import textIcon from "../../../../images/text-icon.png";
import imgIcon from "../../../../images/icon-img.png";
import formulaIcon from "../../../../images/icon-formula.png";
import codeIcon from "../../../../images/icon-code.png";
import saveIcon from "../../../../images/icon-save.png";
import editIcon from "../../../../images/icon-edit.png";
import fileIcon from "../../../../images/icon-file.png";
import csharpIcon from "../../../../images/icon-csharp.png";
import cppIcon from "../../../../images/icon-cpp.png";
import javaIcon from "../../../../images/icon-java.png";
import pythonIcon from "../../../../images/icon-python.png";
import goIcon from "../../../../images/icon-go.png";
import s1Icon from "../../../../images/icon-1s.png";
import htmlIcon from "../../../../images/icon-html.png";
import cssIcon from "../../../../images/icon-css.png";
import jsIcon from "../../../../images/icon-js.png";
import sqlIcon from "../../../../images/icon-sql.png";
import xmlIcon from "../../../../images/icon-xml.png";
import youtubeIcon from "../../../../images/icon-youtube.png";


import { useDispatch, useSelector } from "react-redux";

import { addCodeFieldData, addFileFieldData, addFormulsFieldData, addImageFieldData, addTextFieldToData, addYouTubeData, setEditState, showToast } from "../../../../redux/actions";
import useDataBaseService from "../../../../services/DataBaseService";

import {store} from "../../../../index";

export default function () {

    const dispatch = useDispatch()

    const {uploadDataImage, saveData, uploadFile} = useDataBaseService();

    const {selectedItemId, isEditState} = useSelector(state=>state);

    


    const onTextClickHandle = () => {
        dispatch(addTextFieldToData());
    }

    // Загрузка файла-картинки на сервер 
    const onClickImageHandle = () => {

        const element = document.querySelector("#inputFileUploader")
  
          const clickElement = new MouseEvent("click", {});
  
          element.onchange = e => {
              const [file] = element.files;
  
              if (file) {
                  const data = new FormData();
  
                  data.append("file", file)
                  
  
                  uploadDataImage(data).then(response => {
  
                    dispatch(addImageFieldData(response.imagePath))
                      
                  })
  
                  element.value = null;                
              }
  
          }
  
          element.dispatchEvent(clickElement);
    }

    const onClickSave = () => {

       saveData(selectedItemId.id, store.getState().data).then(response => {
        console.log(response);
        dispatch(setEditState(false));
        
        dispatch(showToast(true, "positive", "Сохранено в БД"))
       }) 

    }

    const onClickEditHandle = (e) => {
        dispatch(setEditState(true));
    }

    const onClickFormulaHandle = () => {
        dispatch(addFormulsFieldData());
    }


    const onClickCodeItemHandle = () => {
        const hideIcons = document.querySelectorAll(".hide-code-icon");

        for (var i=0; i<hideIcons.length; i++) {
            hideIcons[i].style.visibility = "visible";
            hideIcons[i].style.width = "auto";
            hideIcons[i].style.height = "auto";

        }
    }

    const onMouseLeaveHandle = () => {
        const hideIcons = document.querySelectorAll(".hide-code-icon");

        for (var i=0; i<hideIcons.length; i++) {
            hideIcons[i].style.visibility = "hidden";
            hideIcons[i].style.width = "0px";
            hideIcons[i].style.height = "0px";

        }
    }

    const onClickFileHandle = () => {
        const element = document.querySelector("#inputFileUploader")
  
          const clickElement = new MouseEvent("click", {});
  
          element.onchange = e => {
              const [file] = element.files;
  
              if (file) {
                  const data = new FormData();
  
                  data.append("file", file)
                  
                  console.log(element.value);

                  
                  const fileName = element.value.substring(element.value.lastIndexOf("\\") + 1);
  
                  uploadFile(fileName, data).then(response => {
  
                    dispatch(addFileFieldData(response.filePath))
                      
                  })
  
                  element.value = null;                
              }
  
          }
  
          element.dispatchEvent(clickElement);
    }

    const onClicYouTubeHandle = () => {
        dispatch(addYouTubeData());
    }

    const onClickCode = (e) => {

        const lang = e.target.attributes['data-lang'].value;
        dispatch(addCodeFieldData(lang));
    }


    return (
        isEditState?
        <div className="data-menu">
            <div className="data-menu-text">
                <img src={textIcon} className="data-menu-icon" title="Добавить текст"
                onClick={onTextClickHandle} />
            </div>
            <img src={imgIcon} className="data-menu-icon" onClick={onClickImageHandle} title="Добавить изображение" />
            <img src={formulaIcon} className="data-menu-icon" onClick={onClickFormulaHandle} title="Добавить формулу"/>
            <div className="data-menu-code" 
             
             onTouchCancel={onMouseLeaveHandle}
             onPointerCancel={onMouseLeaveHandle}
             onMouseLeave={onMouseLeaveHandle}
              >
                <img src={codeIcon} className="data-menu-icon" title="Добавить програмный код" 
                onMouseDown={onClickCodeItemHandle}
                onTouchStart={onClickCodeItemHandle}
                onPointerEnter={onClickCodeItemHandle}
                onMouseEnter={onClickCodeItemHandle}
                />
                <img src={xmlIcon} data-lang="xml" title="XML" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={sqlIcon} data-lang="sql" title="SQL" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={jsIcon} data-lang="js" title="JavaScript" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={cssIcon} data-lang="css" title="CSS" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={htmlIcon} data-lang="html" title="HTML" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={s1Icon} data-lang="ones" title="1C" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={goIcon} data-lang="go" title="Go" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={pythonIcon} data-lang="python" title="Python" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={javaIcon} data-lang="java" title="Java" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={cppIcon} data-lang="cpp" title="C++" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
                <img src={csharpIcon} data-lang="csharp" title="C#" className="data-menu-icon hide-code-icon" onClick={onClickCode} />
            </div>
            <img src={fileIcon} className="data-menu-icon" title="Добавить файл"
            onClick={onClickFileHandle}
            />
            
            <img src={youtubeIcon} className="data-menu-icon" title="Добавить ссылку на видео"
            onClick={onClicYouTubeHandle}
            />

            <img src={saveIcon} className="data-menu-icon" title="Сохранить" 
            onClick={onClickSave}/>
        </div>
        :
        <div className="data-menu">
            <img src={editIcon} className="data-menu-icon" onClick={onClickEditHandle} title="Редактировать" />
        </div>
    )


}
