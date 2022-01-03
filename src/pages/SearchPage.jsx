import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Paper,
  IconButton,
  InputBase,
  Divider
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { getSearchApi } from "../api";
import {CenterVitrin} from './../components/centers'

import toast from "react-hot-toast";

function SearchPage() {
  const [search, setSearch] = useState({
    loading: false,
    query: null,
    results: null,
  });

  const handleSearch = async () => {
    try {
      setSearch({ ...search, loading: true });
      const { data } = await getSearchApi(search.query);
      const { status, message, searchResults } = data;
      // console.log(data);
      if (status) {
        setSearch({ ...search, results: [...searchResults], loading: false });
      } else {
        // console.log(message);
        setSearch({ ...search, loading: true });
        toast.error(message);
      }
    } catch (error) {
      setSearch({ ...search, loading: true });
      console.log(error);
    }
  };

  const handleChange = (prop) => (e) =>
    setSearch({ ...search, [prop]: e.target.value });

  return (
    <div className="container">
      <Box
        sx={{
          backgroundImage: "linear-gradient(120deg, #FAD961 0%, #F76B1C 57%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid
              xs={12}
              sx={{
                pt: { xs: 8, sm: 10, md: 11, lg: 12 },
                pb: { xs: 1, sm: 2, md: 3 },
              }}
              display="flex"
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={12} md={7} lg={6}>
                <Paper
                  component="div"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      fontSize: {
                        xs: "0.85rem",
                        sm: "0.9rem",
                        md: "0.95rem",
                        lg: "1rem",
                      },
                    }}
                    placeholder="دنبال هر چی میگردی بگو تا پیدا کنم ..."
                    inputProps={{ "aria-label": "search google maps" }}
                    onChange={handleChange("query")}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container sx={{ pt: 1, pb: 1 }}>
          <Grid xs={12}>
            {search.results?.map((provider, index) => {
              return (
                <React.Fragment
                  key={`provider-${index}`}
                >
                  <CenterVitrin
                    centerId={provider.id}
                    name={provider.name}
                    description={provider.description}
                    deliveryTime={provider.deliveryTime}
                  />
                  <Divider />
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default SearchPage;