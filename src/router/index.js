import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
// import { equipRoutes } from './index_equip'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/',
  redirect: '/home'
}
  // {
  //   path: '/phone/fault-day-statistics',
  //   component: () => import('@/views/quality_management/phone/fault-day-statistics'),
  //   hidden: true,
  //   meta: {
  //     isPhone: true // 走不走登录和全限
  //   }
  // },
]
// 存在权限的路由
// meta.permissionName  权限
export const asyncRoutes = [
  {
    path: '/home',
    component: Layout,
    redirect: '/homePage',
    name: 'home',
    meta: {
      title: 'documentation',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: '/homePage',
        component: () => import('@/views/home/index'),
        name: 'HomePageMain',
        meta: {
          title: '首页',
          icon: 'el-icon-s-home'
        }
      },
      {
        path: '/user-setting',
        redirect: '/user-manage',
        component: () => import('@/views/user_manage/a-index'),
        name: 'UserManageIndex',
        meta: {
          title: '系统管理',
          icon: 'el-icon-setting'
        },
        children: [
          {
            path: '/user-manage',
            component: () => import('@/views/user_manage/index'),
            name: 'UserManage',
            meta: {
              faName: 'UserManageIndex',
              title: '用户管理',
              permissionName: 'personnels'
            }
          },
          {
            path: '/group-manage',
            component: () => import('@/views/user_manage/group_manage'),
            name: 'GroupManage',
            meta: {
              faName: 'UserManageIndex',
              title: '角色管理',
              permissionName: 'group_extension'
            }
          },
          {
            path: '/personnel-framework',
            component: () => import('@/views/user_manage/personnel_framework'),
            name: 'PersonnelFramework',
            meta: {
              faName: 'UserManageIndex',
              title: '人员组织架构',
              permissionName: 'department'
            }
          },
          {
            path: '/edit-log-query',
            component: () => import('@/views/material_manage/edit_log_query'),
            name: 'EditLogQuery',
            meta: {
              faName: 'UserManageIndex',
              title: '操作履历查询',
              permissionName: 'user_operation_log'
            }
          }
          // {
          //   path: '/code-manage',
          //   component: () => import('@/views/system_manage/code_manage'),
          //   name: 'CodeManage',
          //   meta: {
          //     faName: 'UserManageIndex',
          //     title: '公用代码管理',
          //     permissionName: ''
          //   }
          // }
        ]
      },
      {
        path: '/material-manage',
        redirect: '/material-info-query',
        component: () => import('@/views/material_manage/a-index'),
        name: 'MaterialManage',
        meta: {
          title: '物料管理',
          icon: 'el-icon-document'
        },
        children: [
          {
            path: '/material-info-query',
            component: () => import('@/views/material_manage/material_info_query'),
            name: 'MaterialInfoQuery',
            meta: {
              faName: 'MaterialManage',
              title: '物料信息查询',
              permissionName: 'material'
            }
          }
        ]
      },
      {
        path: '/problem',
        redirect: '/problem-manage',
        component: () => import('@/views/problem_manage/a-index'),
        name: 'Problem',
        meta: {
          title: '项目问题点管理',
          icon: 'el-icon-document'
        },
        children: [
          {
            path: '/problem-manage',
            component: () => import('@/views/problem_manage/problem_manage'),
            name: 'ProblemManage',
            meta: {
              faName: 'problemManage',
              title: '项目问题点管理',
              permissionName: 'problem'
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
// asyncRoutes = asyncRoutes.concat(equipRoutes)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
