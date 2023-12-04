import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "@/store/hooks";
import { roleCreateThunk } from "@/features/role";

const roleSchemaValidation = yup.object({
  name: yup.string().required("field name is required."),
});

export default function RoleAdd() {
  const dispatch = useDispatch();
  const roleStatus = useSelector((state) => state.role.status);

  const [modal, setModal] = React.useState(false);

  const { handleSubmit, handleChange, resetForm, values, errors } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: roleSchemaValidation,
    onSubmit: (values) => {
      dispatch(
        roleCreateThunk({
          name: values.name,
          description: values.description,
          permissions: [],
        })
      );
    },
  });

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (roleStatus === "succeeded") {
      toggle();
      resetForm();
    }
  }, [roleStatus]);

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Role
        </Button>
      </Box>
      <Dialog
        open={modal}
        onClose={toggle}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          Add New Role
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lets add new role for your application. fill the all field and
            <br /> click on submit button.
          </DialogContentText>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors?.name && <span>{errors.name}</span>}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.description}
                    onChange={handleChange}
                  />
                </Grid>

                {roleStatus === "failed" && <span>Error on created role</span>}

                <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                    disabled={roleStatus === "loading"}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" color="error" onClick={toggle}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
