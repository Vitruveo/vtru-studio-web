import toastr from "toastr";
import { useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  IconPencil,
  IconStar,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";

import emailIcon from "public/images/breadcrumb/emailSv.png";
import RolePermissionsTable from "./RolePermissions";
import { RoleType } from "@/mock/roles";
import { useEffect, useState } from "react";
import { apiService } from "@/app/services/api";
import { PermissionType } from "@/mock/permissions";

import { useDispatch } from "@/store/hooks";
import { roleUpdateThunk } from "@/features/role";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../forms/theme-elements/CustomTextField";

const roleSchemaValidation = yup.object({
  name: yup
    .string()
    .min(3, "name field needs at least 3 characters")
    .required("field name is required."),
});

interface Props {
  roleId: string;
  permissions: PermissionType[];

  onDeleteClick(params: { id: string }): void;
  handleChangeNameAndDescriptionById(params: {
    id: string;
    name: string;
    description: string;
  }): void;
}

export default function RoleDetails({
  roleId,
  permissions,
  onDeleteClick,
  handleChangeNameAndDescriptionById,
}: Props) {
  const dispatch = useDispatch();

  const [role, setRole] = useState<RoleType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (roleId) {
      const getRole = async () => {
        const response = await apiService.get<RoleType>(`/roles/${roleId}`);

        if (response.data) setRole(response.data);
      };

      getRole();
    }

    if (!roleId) setRole(null);
  }, [roleId]);

  const { values, errors, setFieldValue, handleSubmit, handleChange } =
    useFormik<Omit<RoleType, "_id">>({
      validationSchema: roleSchemaValidation,
      initialValues: {
        name: "",
        description: "",
        permissions: [],
      },
      onSubmit: async (values) => {
        if (role?._id) {
          await dispatch(
            roleUpdateThunk({
              _id: role._id,
              ...values,
            })
          );
          toastr.success("Record updated success");

          if (isEditing) {
            const getRole = async () => {
              const response = await apiService.get<RoleType>(
                `/roles/${roleId}`
              );

              if (response.data) {
                setRole(response.data);
                setIsEditing(false);
                handleChangeNameAndDescriptionById({
                  id: roleId,
                  name: values.name,
                  description: values.description,
                });
              }
            };

            getRole();
          }
        }
      },
    });

  useEffect(() => {
    if (role) {
      setFieldValue("name", role.name);
      setFieldValue("description", role.description);
      setFieldValue("permissions", role.permissions);
    }
  }, [role]);

  const handleChangePermission = (permissionKey: string) => {
    if (values.permissions.includes(permissionKey)) {
      setFieldValue(
        "permissions",
        values.permissions.filter((item) => item !== permissionKey)
      );

      return;
    }

    setFieldValue("permissions", [...values.permissions, permissionKey]);
  };

  if (!role)
    return (
      <Box
        p={3}
        height="50vh"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h4">Please Select a Role</Typography>
          <br />
          <Image src={emailIcon} alt={"emailIcon"} width="250" />
        </Box>
      </Box>
    );

  return (
    <>
      <Box p={3} py={2} display={"flex"} alignItems="center">
        <Typography variant="h5">
          Role {isEditing ? "Editing" : "Details"}
        </Typography>
        {!isEditing && (
          <Stack gap={0} direction="row" ml={"auto"}>
            <Tooltip title={"Star"}>
              <IconButton>
                <IconStar stroke={1.3} size="18" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isEditing ? "Save" : "Edit"}>
              <IconButton onClick={() => setIsEditing(!isEditing)}>
                {!isEditing ? (
                  <IconPencil size="18" stroke={1.3} />
                ) : (
                  <IconDeviceFloppy size="18" stroke={1.3} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDeleteClick({ id: role._id })}>
                <IconTrash size="18" stroke={1.3} />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Box>
      <Divider />

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Box>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                name="name"
                id="name"
                variant="outlined"
                size="small"
                fullWidth
                value={values.name}
                onChange={handleChange}
              />
              {errors?.name && <span>{errors.name}</span>}
            </Box>

            <Box>
              <CustomFormLabel htmlFor="description">
                Description
              </CustomFormLabel>
              <CustomTextField
                name="description"
                id="description"
                variant="outlined"
                size="small"
                fullWidth
                value={values.description}
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Divider />
          <Box p={3} gap={1} display="flex">
            <Button
              color="primary"
              variant="contained"
              size="small"
              type="submit"
            >
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Box display="flex" alignItems="center">
              <Avatar alt="" src="" sx={{ width: "72px", height: "72px" }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" mb={0.5}>
                  {role.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={0.5}>
                  {role.description}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box p={3}>
            <RolePermissionsTable
              permissions={permissions}
              activePermissions={values.permissions}
              handleChangePermission={handleChangePermission}
            />
          </Box>
          <Divider />
          <Box p={3} gap={1} display="flex" justifyContent="flex-end">
            <Button
              color="primary"
              variant="contained"
              size="small"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
