import List from '@mui/material/List';

import Scrollbar from '../../custom-scroll/Scrollbar';
import RoleListItem from './RoleListItem';
import { RoleType } from '@/mock/roles';

type Props = {
    roleId: string;
    data: RoleType[];
    onRoleClick(params: { id: string }): void;
    onDeleteClick(params: { id: string; name: string }): void;
};

export default function RoleList({
    roleId,
    data,
    onRoleClick,
    onDeleteClick,
}: Props) {
    return (
        <Scrollbar
            sx={{
                height: {
                    lg: 'calc(100vh - 360px)',
                    md: '100vh',
                },
            }}
        >
            <List>
                {data.map((role) => (
                    <RoleListItem
                        key={role._id}
                        active={role._id === roleId}
                        image=""
                        {...role}
                        onRoleClick={() => onRoleClick({ id: role._id })}
                        onDeleteClick={() =>
                            onDeleteClick({ id: role._id, name: role.name })
                        }
                        onStarredClick={() => {}}
                    />
                ))}
            </List>
        </Scrollbar>
    );
}
