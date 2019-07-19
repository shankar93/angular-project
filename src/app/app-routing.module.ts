import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';
import { AuthGuard } from './guards/auth-guard.service';
// import { ResolverService } from './resolvers/resolver.service';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [AuthGuard]
  },
  // ,
  //   resolve: { products: ResolverService }
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
