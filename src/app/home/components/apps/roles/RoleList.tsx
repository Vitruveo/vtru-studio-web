import List from "@mui/material/List";

import Scrollbar from "../../custom-scroll/Scrollbar";
import RoleListItem from "./RoleListItem";
import { RoleType, roleList } from "@/mock/roles";
import { useEffect, useState } from "react";

type Props = {
  showrightSidebar: () => void;
};

export default function RoleList({ showrightSidebar }: Props) {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const [data, setData] = useState<RoleType[]>([]);

  useEffect(() => {
    const sse = new EventSource("http://127.0.0.1:5001/roles");

    sse.addEventListener("role_list", (event) => {
      if (event.data === "exit") {
        sse.close();
        return;
      }

      setData((prevState) => [...prevState, JSON.parse(event.data)]);
    });

    return () => {
      sse.close();
    };
  }, []);

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
