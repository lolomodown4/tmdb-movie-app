import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = ({ setCurrentPage, totalPageCount }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="pagination">
      <Stack spacing={2}>
        <Pagination
          count={totalPageCount}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Stack>
    </div>
  );
};

export default BasicPagination;
