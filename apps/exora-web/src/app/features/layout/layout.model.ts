export interface NavigationItem {
  label: string;
  link: string;
  exactMatch: boolean;
}

export const APP_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Home", link: "", exactMatch: false },
  { label: "Services", link: "services", exactMatch: true },
  { label: "Events", link: "events", exactMatch: true },
];
