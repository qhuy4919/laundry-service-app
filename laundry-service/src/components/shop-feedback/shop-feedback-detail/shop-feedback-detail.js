import "./shop-feedback-detail.scss";

export function ShopFeedbackDetail(props) {
  console.log(props);
  return (
    <div className="feedback-detail">
      <div className="table-header">
        <ul className="responsive-table">
          <li class="table-header">
            <div class="col col-1">顧客名</div>
            <div class="col col-2">アイテム </div>
            <div class="col col-3">時間</div>
            <div class="col col-4">レーティング</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
