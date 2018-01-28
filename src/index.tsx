import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // Use BrowserRouter later, when server is configured to handle all paths
import { observer } from 'mobx-react';
import { MenuStore } from './stores/menuStore';
import Container from './components/container';
import Menu from './components/menu';
import Article from './components/article';
import Main from './components/main';

// Dependencies - referenced here to be caught by WebPack. Move this to a separate dependencies file?
import 'codemirror/lib/codemirror.css';
import './styles/main.css';
import './styles/fa-brands.min.css';
import './styles/fa-regular.min.css';
import './styles/fa-solid.min.css';
import './styles/fontawesome.min.css';
import './styles/fontawesome-all.min.css';

@observer
class App extends React.Component{
    menuStore: MenuStore;
    constructor(props: any) {
        super(props);
        this.menuStore = new MenuStore();
    }

    render() {
        return (
            <HashRouter>
                <Container WidthPct={100} BackgroundColor={"#415A72"} BackgroundColorEnd={"#415A72"}>
                    <Menu MenuStore={this.menuStore} />
                    <Main />
                </Container>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));