import { Accordion } from "react-bootstrap";
import "./shop-feedback-detail.scss";

export function ShopFeedbackDetail(props) {
  const { user_name, item_name, when, rating, content } = props.feedBack;
  return (
    <>
      <div className="feedback-detail">
        <div className="table-header">
          <ul className="responsive-table">
            <li className="table-header">
              <div className="col col-1">顧客名: {user_name}</div>
              <div className="col col-2">アイテム: {item_name} </div>
              <div className="col col-3">時間: {when}</div>
              <div className="col col-4">レーティング: {rating}</div>
            </li>
            <li className="table-row">
              <div className="table-content">
                <Accordion>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header> フィードバックの内容</Accordion.Header>
                    <Accordion.Body>{content}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
