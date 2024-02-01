import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBox.module.css";

export default function SearchBox({ onChange }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();
    if (query === "") {
      toast.error("Please enter a search query.");
      form.reset();
      return;
    }
    onChange(query);

    toast.success("Congratulations, your request has been sent.");
    form.reset();
  };

  return (
    <div className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.searchContainer}>
          <button type="submit" className={css.button}>
            <FaSearch />
          </button>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </div>
      </form>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 1500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}
