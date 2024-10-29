import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
  get isDarkTheme(): boolean {
    return localStorage.getItem("theme") === "dark";
  }

  setTheme(): void {
    let themeClass = localStorage.getItem("theme");
    let htmlElement = document.documentElement;

    themeClass && htmlElement.classList.add(themeClass);
  }
}
