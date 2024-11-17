import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import RightNav from "../components/layout-component/RightNav";

const NewsDetails = () => {
  const { data } = useLoaderData();
  const newsData = data[0];
  const { thumbnail_url, title, details } = newsData;
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="w-11/12 mx-auto grid grid-cols-12">
        <section className="col-span-9">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
            {/* Image Section */}
            <img
              src={thumbnail_url}
              alt="News Thumbnail"
              className="w-full h-[411px] object-cover"
            />

            {/* Content Section */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
              <p className="text-gray-700 mb-6">{details}</p>

              {/* Button Section */}
              <div className="flex justify-start">
                <Link to={'/'} className="flex items-center gap-2 px-6 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">
                  &#8592; All news in this category
                </Link>
              </div>
            </div>
          </div>
        </section>
        <aside className="col-span-3">
          <RightNav />
        </aside>
      </main>
    </div>
  );
};

export default NewsDetails;
