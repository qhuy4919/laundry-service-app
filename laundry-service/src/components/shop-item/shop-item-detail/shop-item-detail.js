import { Accordion } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import "./shop-item-detail.scss";

export function ShopItemDetail(props) {
  const { category } = props;
  return (
    <div className="item-list-container">
      <div className="item-list-header">カテゴリ1</div>
      <div className="item-list__card">
        <div class="item-card">
          <div class="left">
            <div class="card-info">
              <h2>アイテム 名</h2>
            </div>
            <Accordion className="card-content">
              <Accordion.Item eventKey="0">
                <Accordion.Header>説明</Accordion.Header>
                <Accordion.Body>
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc
                  đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                  bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh
                  Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh
                  rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="card-price">
              <p>Price: </p>
              <div className="item-price">
                <p>100.000 đồng</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div>
              <AiOutlinePlus className="plus-icon" />
              <p>追加</p>
            </div>
          </div>
        </div>
        {/*  */}
        <div class="item-card">
          <div class="left">
            <div class="card-info">
              <h2>アイテム 名</h2>
            </div>
            <Accordion className="card-content">
              <Accordion.Item eventKey="0">
                <Accordion.Header>説明</Accordion.Header>
                <Accordion.Body>
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc
                  đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                  bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh
                  Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh
                  rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="card-price">
              <p>Price: </p>
              <div className="item-price">
                <p>100.000 đồng</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div>
              <AiOutlinePlus className="plus-icon" />
              <p>追加</p>
            </div>
          </div>
        </div>
        {/*  */}
        <div class="item-card">
          <div class="left">
            <div class="card-info">
              <h2>アイテム 名</h2>
            </div>
            <Accordion className="card-content">
              <Accordion.Item eventKey="0">
                <Accordion.Header>説明</Accordion.Header>
                <Accordion.Body>
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc
                  đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa
                  bây!!!!Anh Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh
                  Phúc đỉnh rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh
                  rứa bây!!!! Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                  Anh Phúc đỉnh rứa bây!!!!Anh Phúc đỉnh rứa bây!!!!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="card-price">
              <p>Price: </p>
              <div className="item-price">
                <p>100.000 đồng</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div>
              <AiOutlinePlus className="plus-icon" />
              <p>追加</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
