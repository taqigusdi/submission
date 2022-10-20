import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Save from '../views/pages/save';

const routes = {
    '/': Home,
    '/home': Home,
    '/detail/:id': Detail,
    '/save': Save,
};

export default routes;
