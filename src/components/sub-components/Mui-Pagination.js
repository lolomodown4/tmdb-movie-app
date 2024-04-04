import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({ page, setCurrentPage, totalPageCount }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
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
  );
};

export default BasicPagination;
