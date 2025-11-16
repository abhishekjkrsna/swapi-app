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
        spacing={2}
        sx={{ width: "100%", marginTop: "20px", justifyContent: "center" }}
      >
        {data.map((person: CardData, index: number) => (
          <PeopleCard
            key={index}
            people={person.people}
            homeworld={person.homeworld}
          />
        ))}
      </Grid>
      <Pagination
        count={9}
        shape="rounded"
        size="large"
        page={page}
        // onChange handler to set page state
        onChange={(_event, page) => {
          dispatch(setCurrentPage(page));
          dispatch(getData(page));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />
    </>
  );
}
