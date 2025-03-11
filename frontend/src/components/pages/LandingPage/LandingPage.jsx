import css from './LandingPage.module.css';
import VBoxPanel from '../../../react-envelope/components/layouts/VBoxPanel/VBoxPanel';
import ExTextBox from '../../../react-envelope/components/ui/input/ExTextBox/ExTextBox';
import ExButton from '../../../react-envelope/components/ui/buttons/ExButton/ExButton';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useRef, useState } from 'react';
import { LabContext, useLab } from '../../../Contexts/LabContext';
import HBoxPanel from '../../../react-envelope/components/layouts/HBoxPanel/HBoxPanel';
import { CObject } from '../../dummies/CObject/CObject';
import { Console } from '../../../react-envelope/components/widgets/Console/Console';

export const LandingPage = () => {
    const { subjects, objects, getSubjectRights, setRight, setFiles, writeFile } = useContext(LabContext);
    const identityRef = useRef(null);
    const [login, logIn] = useState(null);
    const [displayedData, setDisplayedData] = useState([]);
    
    const handleLoginClick = () => {
        const id = identityRef.current.value;
        if (subjects.includes(id)) {
            toast(`Добро пожаловать, ${id}`, {
                type: 'success'
            });
            logIn(id);
            update(id);
        } else {
            toast(`Идентификатор ${id} не найден`, {
                type: 'error'
            });
        }
    };

    const update = (id) => {
        setDisplayedData(getSubjectRights(id));
    };

    const handleConsole = (e) => {
        const tokens = e.split(" ");
        
        switch (tokens[0]) {
            case "read":
                if (RegExp("[0-9]*").test(tokens[1]) && 0 <= tokens[1] && tokens[1] < displayedData.length) {
                    if (displayedData[tokens[1]][0].read) return {msg: `Выполнено чтение объекта №${tokens[1]}: "${displayedData[tokens[1]][1].name}": ${displayedData[tokens[1]][1].content}`, type: 'success'};
                    else return {msg: `Недостаточно прав для чтения объекта №${tokens[1]}: "${displayedData[tokens[1]][1]}"`, type: 'error'};
                } else {
                    return {msg: `Неверный идентификатор объекта: "${tokens[1]}"`, type: 'error'};
                }
            case "write":
                if (RegExp("[0-9]*").test(tokens[1]) && 0 <= tokens[1] && tokens[1] < displayedData.length) {
                    if (displayedData[tokens[1]][0].write) {
                        writeFile(tokens[1], tokens[2]);
                        update(login);
                        return {msg: `Выполнена запись в объект №${tokens[1]}: "${displayedData[tokens[1]][1]}": ${displayedData[tokens[1]][1].content}`, type: 'success'};
                    }
                    else return {msg: `Недостаточно прав для записи в объект №${tokens[1]}: "${displayedData[tokens[1]][1]}"`, type: 'error'};
                } else {
                    return {msg: `Неверный идентификатор объекта: "${tokens[1]}"`, type: 'error'};
                }
            case "grant":
                const id = tokens[1];
                const right = tokens[2];
                const target = tokens[3];
                const value = tokens[4];
                if (RegExp("[0-9]*").test(id) && 0 <= id && id < displayedData.length) {
                    if (displayedData[id][0].grant) {
                        if (!subjects.includes(target)) return {msg: `Не найден идентификатор пользователя: ${target}`, type: 'warning'};
                        if (right === "read" || right === "write" || right === "grant") {
                            if (setRight(target, id, right, value)) return {msg: `Установлено правило: ${target}-${id}-${right}-${value}`, type: 'success'};
                            else return {msg: `Unandled exception...`, type: 'error'};
                        } else {
                            return {msg: `Не распознано имя командлета: "${tokens[2]}"`, type: 'error'};
                        }
                    } else return {msg: `Недостаточно прав для передачи доступа к объекту №${id}: "${displayedData[id][1]}"`, type: 'error'};
                } else {
                    return {msg: `Неверный идентификатор объекта: "${id}"`, type: 'error'};
                }
            default:
                return {msg: `Не распознано имя командлета: "${tokens[0]}"`, type: 'error'};
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        var toExport = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                // console.log(`File name: ${file.name}`);
                // console.log(`File content: ${content}`);
                toExport.push({
                    name: file.name,
                    content: content
                });
            };

            reader.onerror = (e) => {
                console.error(`Error reading file: ${file.name}`, e);
            };

            reader.readAsText(file);
        }
        setFiles(toExport);
    };
    
    return (
        <VBoxPanel valign='center'
                   halign='center'
                   className={`${css.p}`}
                   gap='20px'>
            <ToastContainer position='top-center'
                            newestOnTop={true}/>
            {login ? 
                <VBoxPanel gap={'20px'}>
                    <HBoxPanel className={`${css.userPanel} panel`}
                               gap='20px'>
                        <VBoxPanel gap='10px' className={`y-scroll ${css.objects}`}>
                            {displayedData.map((o, i) => <CObject key={i}
                                                                  name={o[1].name}
                                                                  rights={o[0]}/>)}
                        </VBoxPanel>
                        <Console className={css.con}
                                 onSubmit={handleConsole}/>
                    </HBoxPanel>
                    <ExButton onClick={() => {
                        toast("Вы успешно вышли из аккаунта", {
                            type: 'success'
                        });
                        logIn(null);
                    }}>Выйти</ExButton>
                </VBoxPanel>
            : 
                <div className={`${css.form} panel`}>
                    <h1 className={css.title}>Здравствуйте!</h1>
                    <ExTextBox hint='Идентификатор'
                            placeholder='Введите идентификатор'
                            regex="."
                            inputRef={identityRef}/>
                    <ExButton onClick={handleLoginClick}>Войти</ExButton>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>
            }
        </VBoxPanel>
    );
};