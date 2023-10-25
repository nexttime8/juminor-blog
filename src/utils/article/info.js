// 查询当前登录用户信息
import { getUserProfile } from "@/api/system/user";
// 获取所有所有用户信息
import { listUser } from "@/api/system/user";
// 获取所有分类信息
import { getCategories } from '@/api/article/categories'

// 获取当前用户id
export function getUserId(vm) {
    getUserProfile().then((response) => {
        vm.ruleForm.authorId = response.data.userId;
        console.log("获取到了作者id吗");
    });
};

// 获取当前用户名
export function getCurrentAuthorName(authorId) {
    // 以返回值的形式
    return listUser(authorId).then((response) => {
        if (response && response.rows && response.rows.length > 0) {
            return response.rows[0].nickName;
        }
        return null;
    });
}

// 获取当前文章分类
export function getCurrentArticleCate(vm) {
    return getCategories(vm.ruleForm.categoryId).then((response) => {
        // console.log(vm.ruleForm.categoryId, response)
        return response.data.name
    })
}
