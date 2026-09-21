import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from "@mui/material";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const res = await axios.get("/all");
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`/user/delete/${id}`);
      alert("Student Deleted Successfully");
      getStudents();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const editStudent = (student) => {
    console.log(student);

    // We'll connect this to the Register page next.
  };

  return (
    <Container sx={{ mt: 5 }}>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
      >
        Student Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Register No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {students.map((student) => (

              <TableRow key={student._id}>

                <TableCell>{student.registerNo}</TableCell>

                <TableCell>{student.candidateName}</TableCell>

                <TableCell>{student.course}</TableCell>

                <TableCell>{student.email}</TableCell>

                <TableCell>{student.mark}</TableCell>

                <TableCell align="center">

                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ mr: 1 }}
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  );
};

export default Home;