import List from "@mui/material/List";

import Scrollbar from "../../custom-scroll/Scrollbar";
import RoleListItem from "./RoleListItem";
import { RoleType, roleList } from "@/data/roles";

type Props = {
  showrightSidebar: () => void;
};

export default function RoleList({ showrightSidebar }: Props) {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const getVisibleRoles = (
    roles: RoleType[],
    filter: string,
    roleSearch: string
  ) => {
    switch (filter) {
      case "show_all":
        return roles.filter(
          (c) => !c.deleted && c.name.toLocaleLowerCase().includes(roleSearch)
        );

      case "starred_role":
        return roles.filter(
          (c) =>
            !c.deleted &&
            c.starred &&
            c.name.toLocaleLowerCase().includes(roleSearch)
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const roles = getVisibleRoles(roleList, "show_all", "");

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
            key={role.id}
            active={role.id === active}
            image=""
            {...role}
            onRoleClick={() => {}}
            onDeleteClick={() => {}}
            onStarredClick={() => {}}
          />
        ))}
      </List>
    </Scrollbar>
  );
}
