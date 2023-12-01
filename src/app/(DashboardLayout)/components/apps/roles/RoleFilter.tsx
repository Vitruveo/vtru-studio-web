import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import Scrollbar from "../../custom-scroll/Scrollbar";
import {
  IconMail,
  IconSend,
  IconBucket,
  IconFolder,
} from "@tabler/icons-react";
import RoleAdd from "./RoleAdd";

interface DataType {
  id: number;
  name?: string;
  sort?: string;
  icon?: any;
  filterbyTitle?: string;
  devider?: boolean;
  color?: string;
}

export default function RoleFilter() {
  const active = "show_all";
  const customizer = {
    activeDir: "ltr",
    activeMode: "light", // This can be light or dark
    activeTheme: "BLUE_THEME", // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: "boxed", // This can be full or boxed
    isCollapse: false, // to make sidebar Mini by default
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: "en",
    isCardShadow: true,
    borderRadius: 7,
  };
  const br = `${customizer.borderRadius}px`;

  const filterData: DataType[] = [
    {
      id: 2,
      name: "All Users",
      sort: "show_all",
      icon: IconMail,
    },
    {
      id: 3,
      name: "Starred",
      sort: "frequent_role",
      icon: IconSend,
    },
    {
      id: 4,
      name: "Pending Approval",
      sort: "starred_role",
      icon: IconBucket,
    },
    {
      id: 5,
      name: "Blocked",
      sort: "starred_role",
      icon: IconBucket,
    },
    {
      id: 6,
      devider: true,
    },
    {
      id: 7,
      filterbyTitle: "Categories",
    },

    {
      id: 8,
      name: "Admin",
      sort: "engineering_department",
      icon: IconFolder,
      color: "primary.main",
    },
    {
      id: 9,
      name: "Curator",
      sort: "support_department",
      icon: IconFolder,
      color: "error.main",
    },
    {
      id: 10,
      name: "Creator",
      sort: "sales_department",
      icon: IconFolder,
      color: "success.main",
    },
  ];

  return (
    <>
      <RoleAdd />
      <List>
        <Scrollbar
          sx={{
            height: { lg: "calc(100vh - 100px)", md: "100vh" },
            maxHeight: "800px",
          }}
        >
          {filterData.map((filter) => {
            if (filter.filterbyTitle) {
              return (
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  pl={5.1}
                  mt={1}
                  pb={2}
                  key={filter.id}
                >
                  {filter.filterbyTitle}
                </Typography>
              );
            } else if (filter.devider) {
              return <Divider key={filter.id} sx={{ mb: 3 }} />;
            }

            return (
              <ListItemButton
                sx={{ mb: 1, mx: 3, borderRadius: br }}
                selected={active === `${filter.sort}`}
                onClick={() => {}}
                key={filter.id}
              >
                <ListItemIcon sx={{ minWidth: "30px", color: filter.color }}>
                  <filter.icon stroke="1.5" size={19} />
                </ListItemIcon>
                <ListItemText>{filter.name}</ListItemText>
              </ListItemButton>
            );
          })}
        </Scrollbar>
      </List>
    </>
  );
}
