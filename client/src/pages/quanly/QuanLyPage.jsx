/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
// import "./style.css"
export default class QuanLyPage extends Component {
    componentDidMount() {
        const script = document.createElement('script')
        script.src = "/access/js/core/table.js"
        document.body.append(script)
    }

    render() {
        return (
            <div className="container section">
                <div className="row">
                    <div className="col-4">
                        <div className="card" style={{ width: '20rem' }}>
                            <img className="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17cf56b640d%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17cf56b640d%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.078125%22%20y%3D%2297.2%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap" />
                            <div className="card" style={{ width: '20rem' }}>
                                <div className="card-body" style={{ textAlign: 'center' }}>
                                    管理者の名前
                                </div>
                                <ul className="list-group list-group-flush nav nav-tabs" data-tabs="tabs">
                                    <li className="list-group-item  ">
                                        <a href="#_1" className="tap" data-toggle="tab">統計</a>
                                    </li>
                                    <li className="list-group-item  ">
                                        <a href="#_2" className="tap" data-toggle="tab">ショップのリスト</a>
                                    </li>
                                    <li className="list-group-item   ">
                                        <a href="#_3" className="tap active" data-toggle="tab">ユーザーリスト</a>
                                    </li>
                                    <li className="list-group-item  "><a href="#_4" className="tap" data-toggle="tab">注文のリスト</a></li>
                                    <li className="list-group-item  "><a href="#_5" className="tap" data-toggle="tab">TOPページ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 ">
                        <div className="tab-content text-center">
                            <div className="tab-pane " id="_1" />
                            <div className="tab-pane " id="_2" />
                            <div className="tab-pane " id="_4" />
                            <div className="tab-pane " id="_5" />
                            <div className="active tab-pane " id="_3">
                                <table id="table_id" className="display ">
                                    <thead>
                                        <tr>
                                            <th>番号</th>
                                            <th>ユーザー名	</th>
                                            <th>メールアドレス	</th>
                                            <th>電話番号	</th>
                                            <th>注文数	</th>
                                            <th>ロール	</th>
                                            <th>アクティブ	</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td>1</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>3</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>4</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>5</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>6</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>7</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>8</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>9</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr><tr>
                                            <td>10</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            
                                        </tr>
                                        <tr>
                                            <td>11</td>
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                            <td />
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
