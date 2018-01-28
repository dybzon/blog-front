import { observable, action } from 'mobx';
import { IArticleMeta } from '../interfaces/article';
import { ArticleService } from '../services/articleService';
import { IMenuCategory, IMenuSubCategory } from '../interfaces/menu';

export class MenuStore {
    @observable public allArticles: IArticleMeta[] = [];
    @observable public menuCategories: IMenuCategory[] = [];

    constructor() {
        ArticleService.GetArticles(this);
    }

    @action
    public SetArticles(articles: IArticleMeta[]) : void {
        this.allArticles.splice(0, this.allArticles.length);
        this.allArticles.push(...articles);
        this.updateMenuCategories();
    }

    @action
    public SetMenuCategoryState(category: IMenuCategory, active: boolean){
        const updateCategory = this.menuCategories.find(m => m.Category === category.Category);
        if(updateCategory){
            updateCategory.IsActive = active;
        }
    }

    @action
    public SetMenuSubCategoryState(category: IMenuCategory, subCategory: IMenuSubCategory, active: boolean){
        const updateCategory = this.menuCategories.find(m => m.Category === category.Category);
        if(updateCategory){
            const updateSubCategory = updateCategory.SubCategories.find(s => s.SubCategory === subCategory.SubCategory);
            if(updateSubCategory){
                updateSubCategory.IsActive = active;
            }
        }
    }
    
    @action
    private updateMenuCategories(){
        this.menuCategories.push(...this.articleCategories());
    }

    // Get all menucategories contained by the current articles
    private articleCategories(): IMenuCategory[]{
        var menuCategories: IMenuCategory[] = [];
        this.allArticles.forEach(a => {
            var category: IMenuCategory = menuCategories.find(m => m.Category === a.Category);
            if(category == undefined){
                category = {
                    Category: a.Category,
                    IsActive: false,
                    SubCategories: [],
                };
                menuCategories.push(category);
            }

            var subCategory: IMenuSubCategory = category.SubCategories.find(s => s.SubCategory === a.SubCategory);
            if(subCategory == undefined){
                subCategory = {
                    SubCategory: a.SubCategory,
                    IsActive: false,
                    Articles: [],
                }
                category.SubCategories.push(subCategory);
            }

            subCategory.Articles.push(a);
        });

        return menuCategories;
    }

    // Get all menucategories related to admin
    private adminCategories(): IMenuCategory[]{
        return [];
    }
}