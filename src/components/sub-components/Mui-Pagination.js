import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRef } from "react";

const BasicPagination = ({ page, setCurrentPage, totalPageCount }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const windowSize = useRef(window.innerWidth);

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
        <Stack spacing={1}>
          <Pagination
            count={totalPageCount}
            onChange={handleChange}
            defaultPage={1}
            page={page}
            color="primary"
            shape="rounded"
            variant="outlined"
            siblingCount={windowSize.current > 768 ? 1 : 0}
            size={windowSize.current > 768 ? "medium" : "small"}
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default BasicPagination;
