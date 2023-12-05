import List from "@mui/material/List";

import Scrollbar from "../../custom-scroll/Scrollbar";
import RoleListItem from "./RoleListItem";
import { RoleType } from "@/mock/roles";
import { Box } from "@mui/material";

type Props = {
  data: RoleType[];
  onRoleClick(params: { id: string }): void;
  onDeleteClick(params: { id: string }): void;
};

export default function RoleList({ data, onRoleClick, onDeleteClick }: Props) {
  const getVisibleRoles = (
    roles: RoleType[],
    filter: string,
    roleSearch: string
  ) => {
    switch (filter) {
      case "show_all":
        return roles.filter((c) =>
          c.name.toLocaleLowerCase().includes(roleSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const roles = getVisibleRoles(data, "show_all", "");

  const active = "show_all";

  return (
    <Scrollbar
      sx={{
        height: { lg: "calc(100vh - 100px)", md: "100vh" },
        maxHeight: "800px",
      }}
    >
      <List>
        {roles.map((role) => (
          <RoleListItem
            key={role._id}
            active={role._id === active}
            image=""
            {...role}
            onRoleClick={() => onRoleClick({ id: role._id })}
            onDeleteClick={() => onDeleteClick({ id: role._id })}
            onStarredClick={() => {}}
          />
        ))}
      </List>
    </Scrollbar>
  );
}
