import { useRecoilState } from 'recoil';
import { user } from './atoms';

export const SetUser = () => {
    const [items, setItems] = useRecoilState(user);
    return (err, data) => {
        setItems(data)
    }
}