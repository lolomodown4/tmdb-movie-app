import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const BasicPagination = ({ page, setCurrentPage, totalPageCount }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#20b2aa ",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPageCount}
            onChange={handleChange}
            defaultPage={1}
            page={page}
            color="primary"
            shape="rounded"
            variant="outlined"
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default BasicPagination;
