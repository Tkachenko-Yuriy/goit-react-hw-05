import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../pages/Home/Home"));
const Movies = lazy(() => import("../pages/Movies/Movies"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFound = lazy(() => import("../pages/NotFound"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const SharedLayout = lazy(() => import("./SharedLayout"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/trending/:moviesId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
