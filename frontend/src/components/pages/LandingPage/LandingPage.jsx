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
    const { subjects, objects, getSubjectRights, setRight } = useContext(LabContext);
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
                    if (displayedData[tokens[1]][0].read) return `Выполнено чтение объекта №${tokens[1]}: "${displayedData[tokens[1]][1]}"`;
                    else return `Недостаточно прав для чтения объекта №${tokens[1]}: "${displayedData[tokens[1]][1]}"`;
                } else {
                    return `Неверный идентификатор объекта: "${tokens[1]}"`;
                }
            case "write":
                if (RegExp("[0-9]*").test(tokens[1]) && 0 <= tokens[1] && tokens[1] < displayedData.length) {
                    if (displayedData[tokens[1]][0].write) return `Выполнена запись в объект №${tokens[1]}: "${displayedData[tokens[1]][1]}"`;
                    else return `Недостаточно прав для записи в объект №${tokens[1]}: "${displayedData[tokens[1]][1]}"`;
                } else {
                    return `Неверный идентификатор объекта: "${tokens[1]}"`;
                }
            case "grant":
                const id = tokens[1];
                const right = tokens[2];
                const target = tokens[3];
                const value = tokens[4];
                if (RegExp("[0-9]*").test(id) && 0 <= id && id < displayedData.length) {
                    if (displayedData[id][0].grant) {
                        if (!subjects.includes(target)) return `Не найден идентификатор пользователя: ${target}`;
                        if (right === "read" || right === "write" || right === "grant") {
                            if (setRight(target, id, right, value)) return `Установлено правило: ${target}-${id}-${right}-${value}`;
                            else return `Unandled exception...`;
                        } else {
                            return `Не распознано имя командлета: "${tokens[2]}"`;
                        }
                    } else return `Недостаточно прав для передачи доступа к объекту №${id}: "${displayedData[id][1]}"`;
                } else {
                    return `Неверный идентификатор объекта: "${id}"`;
                }
            default:
                return `Не распознано имя командлета: "${tokens[0]}"`;
        }
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
                                                                  name={o[1]}
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
                </div>
            }
        </VBoxPanel>
    );
};