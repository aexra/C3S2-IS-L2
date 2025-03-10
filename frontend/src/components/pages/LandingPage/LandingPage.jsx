import css from './LandingPage.module.css';
import VBoxPanel from '../../../react-envelope/components/layouts/VBoxPanel/VBoxPanel';
import ExTextBox from '../../../react-envelope/components/ui/input/ExTextBox/ExTextBox';
import ExButton from '../../../react-envelope/components/ui/buttons/ExButton/ExButton';

export const LandingPage = () => {
    return (
        <VBoxPanel valign='center'
                   halign='center'
                   className={`${css.p}`}
                   gap='20px'>
            <div className={`${css.form} panel`}>
                <h1 className={css.title}>Здравствуйте!</h1>
                <ExTextBox hint='Идентификатор'
                        placeholder='Введите идентификатор'
                        regex='.'/>
                <ExButton>Войти</ExButton>
            </div>
        </VBoxPanel>
    );
};