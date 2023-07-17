import React from "react";
import Banner from "./Banner";
import LatestMovie from "./LatestMovie";

function Home() {
  return (
    <div>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="row">
              <div className="col-md-9">
                <Banner />
              </div>
              <div className="col-md-3">
                <div className="row">
                  {/* <div className="col-sm-6 col-md-12">
                    <div className="latest-movie">
                      <Link>
                        <img src="images/thumb-1.jpg" alt="Movie 1" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-12">
                    <div className="latest-movie">
                      <Link>
                        <img src="images/thumb-2.jpg" alt="Movie 2" />
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <LatestMovie />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
