// articleUtils.js
import { listArticles } from "@/api/article/list";
import { listCategories } from "@/api/article/categories";

export function getArticlesList(vm, status = null) {
    const queryParams = status ? { ...vm.queryParams, status } : vm.queryParams;
    listArticles(queryParams)
        .then((response) => {
            vm.articlesList = vm.articlesList.concat(response.rows);
            vm.total = response.total;
            return getCategoryList(vm);
        })
        .catch(error => {
            console.error('Error while fetching data:', error);
        })
}


export function getCategoryList(vm) {
    // console.log('被调用了')
    const existingCategoryIds = Array.from(
        new Set(vm.articlesList.map((article) => article.categoryId))
    ).sort();
    console.log(existingCategoryIds)
    listCategories().then((response) => {
        // console.log(response.rows)
        vm.categoriesList = response.rows;
    });
}