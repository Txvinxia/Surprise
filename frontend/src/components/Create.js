import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MySelectField from "./forms/MySelectField";
import MyDatePickerField from "./forms/MyDatePickerField";
import MyTextField from "./forms/MyTextField";
import MyMultilineField from "./forms/MyMultilineField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    status: "",
    comments: "",
  };

  const submission = (data) => {
    const start_date = Dayjs(data.start_date).format("YYYY-MM-DD");
    const end_date = Dayjs(data.end_date).format("YYYY-MM-DD");
    AxiosInstance.post(`project/`, {
      name: data.name,
      comments: data.comments,
      status: data.status,
      start_date: start_date,
      end_date: end_date,
    }).then((res) => {
      navigate("/");
    });
  };

  const { handleSubmit, reset, setValue, control } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div>
      <form onSubmit={handleSubmit(submission)}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "#f0f0f0",
            marginBottom: "10px",
          }}
        >
          <Typography sx={{ marginleft: "20px", color: "#000000" }}>
            Create Records
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            boxShadow: 3,
            padding: 4,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "40px",
            }}
          >
            <MyTextField
              label="Name"
              name="name"
              placeholder="Provide a Project Name"
              control={control} // Replace with your actual control
              width="30%"
            />
            <MyDatePickerField
              label="Start Date"
              name="start_date"
              control={control} // Replace with your actual control
              width="30%"
            />
            <MyDatePickerField
              label="End Date"
              name="end_date"
              control={control} // Replace with your actual control
              width="30%"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <MyMultilineField
              label="Comments"
              name="comments"
              placeholder="Provide Project Comments"
              control={control} // Replace with your actual control
              width="30%"
            />
            <MySelectField
              label="Status"
              name="status"
              control={control} // Replace with your actual control
              width="30%"
            />
            <Box sx={{ width: "30%" }}>
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Create;
