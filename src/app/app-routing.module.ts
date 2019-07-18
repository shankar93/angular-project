import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './guards/auth-guard.service';
// import { HomeResolverService } from './resolvers/home-resolver.service';
// , resolve: { hnData: HomeResolverService }
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
