import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconPackage,
  IconChartDonut3,
  IconAperture,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Dashboards",
  },

  {
    id: uniqueId(),
    title: "General",
    icon: IconAperture,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Applications",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconPackage,
    href: "/apps/users",
  },

  {
    id: uniqueId(),
    title: "Creators",
    icon: IconChartDonut3,
    href: "/apps/creators",
  },
  {
    id: uniqueId(),
    title: "Assets",
    icon: IconChartDonut3,
    href: "/apps/assets",
  },
  {
    navlabel: true,
    subheader: "Settings",
  },
  {
    id: uniqueId(),
    title: "General",
    icon: IconChartDonut3,
    href: "/apps/general",
  },
  {
    id: uniqueId(),
    title: "Roles",
    icon: IconChartDonut3,
    href: "/apps/roles",
  },
];

export default Menuitems;
