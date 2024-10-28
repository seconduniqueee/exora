import { Component, OnInit } from "@angular/core";
import { LayoutComponent } from "./features/layout/layout.component";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.setTheme();
  }

  private setTheme(): void {
    let themeClass = localStorage.getItem("theme");
    let htmlElement = document.documentElement;

    themeClass && htmlElement.classList.add(themeClass);
    // htmlElement.classList.add("transition-enabled");
  }
}
