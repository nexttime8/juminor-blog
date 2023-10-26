// articleUtils.js
import { listArticles } from "@/api/article/list";
import { listCategories } from "@/api/article/categories";

export function getArticlesList(vm, status = null) {
    const queryParams = status ? { ...vm.queryParams, status } : vm.queryParams;
    listArticles(queryParams)
        .then((response) => {
            vm.articlesList = vm.articlesList.concat(response.rows);
            vm.total = response.total;
        })
        .catch(error => {
            console.error('Error while fetching data:', error);
        })
}


export function getCategoryList(vm) {
    listCategories().then((response) => {
        vm.categoriesList = response.rows;
    });
}