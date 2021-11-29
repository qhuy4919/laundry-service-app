import "./sidebar.scss";

export function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header"></div>
      <div className="sidebar-content">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            className="nav-link"
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-selected="false"
          >
            統計
          </a>
          {/*  */}
          <a
            className="nav-link "
            id="v-pills-home-tab"
            data-toggle="pill"
            href="#v-pills-home"
            role="tab"
            aria-selected="false"
          >
            ショップのリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-selected="false"
          >
            ユーザーリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-selected="false"
          >
            注文のリスト
          </a>
          {/*  */}
          <a
            className="nav-link active"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-selected="false"
          >
            割引のリスト
          </a>
          {/*  */}
          <a
            className="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-selected="false"
          >
            TOPページ
          </a>
        </div>
      </div>
    </div>
  );
}
