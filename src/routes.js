/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Login from "views/Login.jsx";
import People from "views/People.jsx";
import Settings from "views/Settings.jsx";
import Users from "views/Users.jsx";
import Roles from "views/Roles.jsx";
import AddPerson from "views/AddPerson.jsx";
import AddUser from "views/AddUser.jsx";
import AddRole from "views/AddRole.jsx";
import AddSong from "views/AddSong.jsx";

import ViewEditPerson from "views/ViewEditPerson.jsx";
import ViewEditRole from "views/ViewEditRole.jsx";
import ViewEditUser from "views/ViewEditUser.jsx";
import ViewEditSong from "views/ViewEditSong.jsx";

import FindSongs from "views/FindSongs.jsx";


var routes = [

  {
    path: "/login",
    name: "Login",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/index",
    name: "Dashboard",
    sidebar: true,
    settingSidebar: false,
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/people",
    name: "People",
    sidebar: true,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: People,
    layout: "/admin"
  },
  {
    path: "/person/:id",
    name: "View/Edit Person",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewEditPerson,
    layout: "/admin"
  },
  {
    path: "/person",
    name: "Add Person",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: AddPerson,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Settings",
    sidebar: false,
    settingSidebar: true,
    icon: "ni ni-settings-gear-65 text-primary",
    component: Settings,
    layout: "/settings"
  },
  {
    path: "/users",
    name: "Manage Users",
    sidebar: false,
    settingSidebar: true,
    icon: "ni ni-circle-08 text-primary",
    component: Users,
    layout: "/settings"
  } ,
  {
    path: "/user/:id",
    name: "View/Edit User",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewEditUser,
    layout: "/settings"
  },
  {
    path: "/user",
    name: "Add User",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: AddUser,
    layout: "/settings"
  },  
  {
    path: "/roles",
    name: "Manage Roles",
    sidebar: false,
    settingSidebar: true,
    icon: "ni ni-lock-circle-open text-red",
    component: Roles,
    layout: "/settings"
  },
  {
    path: "/role/:id",
    name: "View/Edit Role",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewEditRole,
    layout: "/settings"
  },
  {
    path: "/role",
    name: "Add Role",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: AddRole,
    layout: "/settings"
  },
  {
    path: "/songs",
    name: "FindSongs",
    sidebar: true,
    settingSidebar: false,
    icon: "ni ni-note-03 text-red",
    component: FindSongs,
    layout: "/admin"
  },
  {
    path: "/song/:id",
    name: "View/Edit Song",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: ViewEditSong,
    layout: "/admin"
  },
  {
    path: "/song",
    name: "Add Song",
    sidebar: false,
    settingSidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: AddSong,
    layout: "/admin"
  }
];
export default routes;
