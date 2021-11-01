import React from "react";
// import "./InfoPage.css";
const InfoPage = () => {
  return (
    <div className="section section-tabs">
      <div className="container">
        <div className="row">
          <div className="col-md-12 ml-auto col-xl-12 mr-auto">
            {/* Nav tabs */}
            <div className="card">
              <div className="container">
                <div className="row">
                  <div className="col-4">
                    <div className="card" style={{ width: "20rem" }}>
                      <div className="card-body">
                        <h4 className="card-title">ショップ写真</h4>
                        <p className="card-text">..</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="card-header">
                      <ul
                        className="nav nav-tabs justify-content-center"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#info"
                            role="tab"
                          >
                            情報
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                          >
                            サービス
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#messages"
                            role="tab"
                          >
                            注文管理
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="card-body">
                      {/* Tab panes */}
                      <div className="tab-content text-center">
                        <div
                          className="tab-pane active"
                          id="info"
                          role="tabpanel"
                        >
                          <form>
                            <div className="form-group row">
                              <label
                                htmlFor={1}
                                className="col-sm-2 col-form-label"
                              >
                                ショップ名{" "}
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={1}
                                  placeholder="ショップ名"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor={2}
                                className="col-sm-2 col-form-label"
                              >
                                ショップ住所{" "}
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={2}
                                  placeholder="ショップ住所"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor={3}
                                className="col-sm-2 col-form-label"
                              >
                                ショップ説明{" "}
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={3}
                                  placeholder="ショップ説明"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor={4}
                                className="col-sm-2 col-form-label"
                              >
                                労働時間{" "}
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={4}
                                  placeholder="労働時間"
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor={5}
                                className="col-sm-2 col-form-label"
                                style={{ background: "#e3e3e3" }}
                              >
                                オーナー名{" "}
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={5}
                                  placeholder="オーナー名"
                                  readOnly
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div
                          className="tab-pane"
                          id="profile"
                          role="tabpanel"
                        ></div>
                        <div
                          className="tab-pane"
                          id="messages"
                          role="tabpanel"
                        ></div>
                        <button
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          保存{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoPage;
