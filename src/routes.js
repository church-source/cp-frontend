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
import Person from "views/Person.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    sidebar: true,
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/people",
    name: "People",
    sidebar: true,
    icon: "ni ni-bullet-list-67 text-red",
    component: People,
    layout: "/admin"
  },
  {
    path: "/person/:id",
    name: "Person",
    sidebar: false,
    icon: "ni ni-bullet-list-67 text-red",
    component: Person,
    layout: "/admin"
  }
  
];
export default routes;
