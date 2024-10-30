import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {
  get isDarkTheme(): boolean {
    return localStorage.getItem("theme") === "dark";
  }

  initTheme(): void {
    let themeClass = localStorage.getItem("theme");
    let htmlElement = document.documentElement;

    themeClass ? htmlElement.classList.add(themeClass) : localStorage.setItem("theme", "light");
  }

  toggleTheme(): void {
    let isDarkTheme = localStorage.getItem("theme") === "dark";

    if (isDarkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
}
