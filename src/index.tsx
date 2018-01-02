import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Item from './components/item';
import Text from './components/text';
import Container from './components/container';
import Article from './components/article';
import Code from './components/codeMirror';
import { Store } from './stores/store';
import { observer } from 'mobx-react';
import { ArticleItemType } from './interfaces/articleItem';
import Menu from './components/menu';
import { IArticleMeta } from './interfaces/article';
import { IMenuCategory } from './interfaces/menu';
import 'codemirror/lib/codemirror.css';
import './styles/main.css';
import './styles/fa-brands.min.css';
import './styles/fa-regular.min.css';
import './styles/fa-solid.min.css';
import './styles/fontawesome.min.css';
import './styles/fontawesome-all.min.css';

@observer
class App extends React.Component{
    store: Store;

    constructor(props: any) {
        super(props);
        this.store = new Store();
    }

    render() {
        const articleItems = this.store.currentArticleItems.map(ai => 
            ai.Type === ArticleItemType.Text ?
            <Text Text={ai.Content} key={ai.Id} /> 
            : <Code Code={ai.Content} key={ai.Id} />);
        
        const menuCategories: IMenuCategory[] = this.store.menuCategories;

        return (
            <Container WidthPct={100} BackgroundColor={"#415A72"} BackgroundColorEnd={"#415A72"}>
                <Menu MenuCategories={menuCategories} Store={this.store} />
                <Article WidthPct={80} MaxWidth={800}>
                    {articleItems}
                </Article>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));