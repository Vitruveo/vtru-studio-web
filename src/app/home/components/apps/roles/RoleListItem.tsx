import React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { IconStar, IconTrash } from "@tabler/icons-react";

type Props = {
  onRoleClick: (event: React.MouseEvent<HTMLElement>) => void;
  onStarredClick: React.MouseEventHandler<SVGElement>;
  onDeleteClick: React.MouseEventHandler<SVGElement>;
  id: string | number;
  name: string;
  description: string;
  permissions: string[];
  image: string;
  starred: boolean;
  active: any;
};

export default function RoleListItem({
  onRoleClick,
  onStarredClick,
  onDeleteClick,
  name,
  description,
  image,
  starred,
  active,
}: Props) {
  const customizer = {
    activeDir: "ltr",
    activeMode: "light", // This can be light or dark
    activeTheme: "BLUE_THEME", // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: "full", // This can be full or boxed
    isCollapse: false, // to make sidebar Mini by default
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: "en",
    isCardShadow: true,
    borderRadius: 7,
  };
  const br = `${customizer.borderRadius}px`;

  const theme = useTheme();

  const warningColor = theme.palette.warning.main;

  return (
    <ListItemButton sx={{ mb: 1 }} selected={active}>
      <ListItemAvatar>
        <Avatar alt={image} src={image} />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto" onClick={onRoleClick}>
            <Typography
              variant="subtitle1"
              noWrap
              fontWeight={600}
              sx={{ maxWidth: "150px" }}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {description}
            </Typography>
          </Box>
          <IconStar
            onClick={onStarredClick}
            size="16"
            stroke={1.5}
            style={{
              fill: starred ? warningColor : "",
              stroke: starred ? warningColor : "",
            }}
          />
          <IconTrash onClick={onDeleteClick} size="16" stroke={1.5} />
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
