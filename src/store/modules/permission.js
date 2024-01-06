import auth from "@/plugins/auth";
import router, { constantRoutes, dynamicRoutes } from "@/router";
import { getRouters } from "@/pages/firstDemo/api/menu";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";

// 匹配views里面，所有层级下，所有的.vue文件
const modules = import.meta.glob("./../../pages/**/views/**/*.vue");

console.log(
  import.meta.env.VITE_PAGES_PROJECT,
  "获取自定义参数：import.meta.env.VITE_PAGES_PROJECT"
);

const usePermissionStore = defineStore("permission", {
  state: () => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  }),
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    setDefaultRoutes(routes) {
      this.defaultRoutes = constantRoutes.concat(routes);
    },
    setTopbarRoutes(routes) {
      this.topbarRouters = routes;
    },
    setSidebarRouters(routes) {
      this.sidebarRouters = routes;
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        // getRouters().then(res => {
        let res = {
          msg: "操作成功",
          code: 200,
          data: [
            {
              name: "System",
              path: "/system",
              hidden: false,
              redirect: "noRedirect",
              component: "Layout",
              alwaysShow: true,
              meta: {
                title: "系统管理",
                icon: "system",
                noCache: false,
                link: null,
              },
              children: [
                // {
                //   name: "User",
                //   path: "user",
                //   hidden: false,
                //   component: "system/user/index",
                //   meta: {
                //     title: "用户管理",
                //     icon: "user",
                //     noCache: false,
                //     link: null,
                //   },
                // },
                // {
                //   name: "Role",
                //   path: "role",
                //   hidden: false,
                //   component: "system/role/index",
                //   meta: {
                //     title: "角色管理",
                //     icon: "peoples",
                //     noCache: false,
                //     link: null,
                //   },
                // },
                // {
                //   name: "Menu",
                //   path: "menu",
                //   hidden: false,
                //   component: "system/menu/index",
                //   meta: {
                //     title: "菜单管理",
                //     icon: "tree-table",
                //     noCache: false,
                //     link: null,
                //   },
                // },
                // {
                //   name: "Dept",
                //   path: "dept",
                //   hidden: false,
                //   component: "system/dept/index",
                //   meta: {
                //     title: "部门管理",
                //     icon: "tree",
                //     noCache: false,
                //     link: null,
                //   },
                // },
                {
                  name: "Post",
                  path: "post",
                  hidden: false,
                  component: "system/post/index",
                  meta: {
                    title: "岗位管理",
                    icon: "post",
                    noCache: false,
                    link: null,
                  },
                },
                {
                  name: "Dict",
                  path: "dict",
                  hidden: false,
                  component: "system/dict/index",
                  meta: {
                    title: "字典管理",
                    icon: "dict",
                    noCache: false,
                    link: null,
                  },
                },
              ],
            },
          ],
        };

        console.log(router, constantRoutes, dynamicRoutes, 555);

        const sdata = JSON.parse(JSON.stringify(res.data));
        const rdata = JSON.parse(JSON.stringify(res.data));
        const defaultData = JSON.parse(JSON.stringify(res.data));
        const sidebarRoutes = filterAsyncRouter(sdata);
        const rewriteRoutes = filterAsyncRouter(rdata, false, true);
        const defaultRoutes = filterAsyncRouter(defaultData);
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
        asyncRoutes.forEach((route) => {
          router.addRoute(route);
        });
        this.setRoutes(rewriteRoutes);
        this.setSidebarRouters(constantRoutes.concat(sidebarRoutes));
        this.setDefaultRoutes(sidebarRoutes);
        this.setTopbarRoutes(defaultRoutes);
        resolve(rewriteRoutes);
        // })
      });
    },
  },
});

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path;
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el));
        return;
      }
    }
    children = children.concat(el);
  });
  return children;
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = [];
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route);
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route);
      }
    }
  });
  return res;
}

export const loadView = (view) => {
  let res;
  // 将菜单的组件路径，转为页面的组件进行注册
  console.log(modules);

  for (const path in modules) {
    console.log(path, 5555);

    const dir = path.split("pages/firstDemo/views/")[1].split(".vue")[0];
    if (dir === view) {
      // import.meta.glob 引入的文件，把路径当做方法名进行执行，就会导入对应的文件
      res = () => modules[path]();
    }
  }
  return res;
};

export default usePermissionStore;
