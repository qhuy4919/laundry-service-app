import { Table } from "react-bootstrap";

import "./order-item.scss";
export function OrderItem() {
  return (
    <div>
      <Table borderless hover responsive>
        <tr>
          <th>サービス名</th>
          <th>価格</th>
          <th>数量</th>
        </tr>
        <tbody>
          <tr>
            <td>
              <p class="description">Giặt nhanh</p>
            </td>
            <td id="price">$24.99</td>
            <td>
              <div class="counter">
                <input id="qty" value="0" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p class="description">Giặt nhanh</p>
            </td>
            <td id="price">$24.99</td>
            <td>
              <div class="counter">
                <input id="qty" value="0" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p class="description">Giặt nhanh</p>
            </td>
            <td id="price">$24.99</td>
            <td>
              <div class="counter">
                <input id="qty" value="0" />
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
