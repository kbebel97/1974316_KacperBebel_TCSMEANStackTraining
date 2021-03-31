import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultsViewComponent } from './results-view/results-view.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
  {path: "main" ,component: MainMenuComponent},
  {path: "test" ,component: TestPageComponent},
  {path: "results", component: ResultPageComponent},
  {path: "results_view", component: ResultsViewComponent},
  {path: "",redirectTo: "main" ,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
