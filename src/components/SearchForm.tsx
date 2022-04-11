import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

type SearchFormProps = {
  navigate: NavigateFunction,
  searchString: string,
  className?: string,
  callback?: CallableFunction,
  children: JSX.Element | Array<JSX.Element>,
};

const SearchForm = ({ navigate, searchString, className, callback, children }: SearchFormProps) => {
  const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (callback !== undefined) {
      callback();
    }
    navigate(`/search?q=${searchString}`);
  };

  return (
    <form
      onSubmit={handleSearchFormSubmit}
      className={className ?? ""}
    >
      {children}
    </form>
  );
};

export default SearchForm;