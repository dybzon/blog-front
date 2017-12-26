import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Item from './components/item';
import Text from './components/text';
import Container from './components/container';
import Article from './components/article';
import Code from './components/codeMirror';
import { Store } from './stores/store';
import { observer } from 'mobx-react';
require('codemirror/lib/codemirror.css');
import { ArticleItemType } from './interfaces/articleItem';
import Menu from './components/menu';
import { IArticleMeta } from './interfaces/article';
import { IMenuCategory } from './interfaces/menu';

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
        
        const menuCategories: IMenuCategory[] = this.store.allMenuCategories;

        return (
            <Container WidthPct={100} BackgroundColor={"#293949"} BackgroundColorEnd={"#293949"}>
                <Menu MenuCategories={menuCategories} Store={this.store} />
                <Article WidthPct={80} MaxWidth={800}>
                    {articleItems}
                </Article>
            </Container>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));