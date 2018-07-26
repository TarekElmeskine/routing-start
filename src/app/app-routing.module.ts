import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {Route, RouterModule} from "@angular/router";
import {UserComponent} from "./users/user/user.component";
import {UsersComponent} from "./users/users.component";
import {ServersComponent} from "./servers/servers.component";
import {ServerComponent} from "./servers/server/server.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthService} from "./auth.service";
import {AuthGardService} from "./auth-gard.service";
import {CanDeactivateGuardService} from "./servers/edit-server/can-deactivate-guard.service";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ServersResolverService} from "./servers/servers-resolver.service";

const appRoutes: Route [] = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent}
  ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGardService],
    canActivateChild : [AuthGardService],
    component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServersResolverService}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate:[CanDeactivateGuardService]}
    ]
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data :{message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
