import { Member } from "../../../Dtos/Member";
import { SearchResult } from "../SearchResult/SearchResult";
import "./SearchResultsList.scss";

interface ListProps {
  results: Member[];
  toggleUser: (user: string) => void;
  isSelected: (user: string) => boolean;
}
export const SearchResultsList = (props: ListProps) => {
  return (
    <div className="results-list">
      {props.results.map((result) => {
        return (
          <SearchResult
            {...result}
            isSelected={props.isSelected(result.id)}
            toggleUser={() => props.toggleUser(result.id)}
            key={result.id}
          />
        );
      })}
    </div>
  );
};
