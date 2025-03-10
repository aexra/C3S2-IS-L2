import VBoxPanel from '../../../react-envelope/components/layouts/VBoxPanel/VBoxPanel';
import FlowPanel from '../../../react-envelope/components/layouts/FlowPanel/FlowPanel';
import css from './CObject.module.css';

export const CObject = ({ name, rights }) => {
    return (
        <VBoxPanel className={css.item}
                   gap='5px'>
            <h2 className={css.name}>{name}</h2>
            <FlowPanel gap='5px'>
                {rights.read && <span className={css.tag}>Чтение</span>}
                {rights.write && <span className={css.tag}>Запись</span>}
                {rights.grant && <span className={css.tag}>Полные права</span>}
            </FlowPanel>
        </VBoxPanel>
    );
};