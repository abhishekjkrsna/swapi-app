import { Grid, Pagination } from "@mui/material";
import PeopleCard from "../components/card/PeopleCard";
import type { CardData } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { getData, setCurrentPage } from "../features/people/peopleSlice";

export default function Main({ data }: { data: CardData[] }) {
  const dispatch = useDispatch<any>();
  const page = useSelector((state: any) => state.people.currentPage);
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0 24px",
          justifyContent: "center",
        }}
      >
        {data.map((person: CardData, index: number) => (
          <Grid key={index}>
            <PeopleCard people={person.people} homeworld={person.homeworld} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={9}
        shape="rounded"
        size="large"
        page={page}
        onChange={(_event, page) => {
          dispatch(setCurrentPage(page));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
          "& .MuiPaginationItem-root": {
            borderRadius: "12px",
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
        })}
      />
    </>
  );
}
