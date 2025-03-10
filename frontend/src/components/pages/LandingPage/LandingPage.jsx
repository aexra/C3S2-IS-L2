import css from './LandingPage.module.css';
import VBoxPanel from '../../../react-envelope/components/layouts/VBoxPanel/VBoxPanel';
import ExTextBox from '../../../react-envelope/components/ui/input/ExTextBox/ExTextBox';
import ExButton from '../../../react-envelope/components/ui/buttons/ExButton/ExButton';
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useRef, useState } from 'react';
import { LabContext, useLab } from '../../../Contexts/LabContext';
import HBoxPanel from '../../../react-envelope/components/layouts/HBoxPanel/HBoxPanel';
import { CObject } from '../../dummies/CObject/CObject';

export const LandingPage = () => {
    const { subjects, objects, getSubjectRights } = useContext(LabContext);
    const identityRef = useRef(null);
    const [login, logIn] = useState(null);
    
    const handleLoginClick = () => {
        const id = identityRef.current.value;
        if (subjects.includes(id)) {
            toast(`Добро пожаловать, ${id}`, {
                type: 'success'
            });
            logIn(id);
        } else {
            toast(`Идентификатор ${id} не найден`, {
                type: 'error'
            });
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
                            {getSubjectRights(login).map((o, i) => <CObject key={i}
                                                                            name={o[1]}
                                                                            rights={o[0]}/>)}
                        </VBoxPanel>
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