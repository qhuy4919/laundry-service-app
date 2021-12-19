import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { DiscountModal, Pagination } from "component";
import "./sale.scss";

export function Sale() {
  const DEFAULT_DISCOUNT =   {
    id: "",
    code: "",
    amount: 0,
    percent: "",
    min_percent: "",
    create_date: "",
  };
  const [discountData, setdiscountData] = useState(mockData);
  const [currentDiscount, setCurrentDiscount] = useState([DEFAULT_DISCOUNT]);
  const [show, setShow] = useState(false);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 5,
    totalRow: 50,
  });

  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 8,
  });


  //

  // useEffect(() => {
  //   let isRelevant = true;
  //   const fetchDiscountData = async () => {
  //     try {
  //       const request = await Promise.fetch(); //query uri
  //     if(request && isRelevant) {
  //       setdiscountData(request);
  //     }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchDiscountData();

  //   return () => isRelevant = false;
    
  // }, [discountData]); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleDiscountModal(e,id) {
    if(id) {
      getDiscount(id);
    }
    handleShow();
  }

  const getDiscount = (id) => {
    if(discountData.length > 0) {
      const nth_discount = discountData.filter(item => item.id === id)
      if(nth_discount) {
        setCurrentDiscount(nth_discount);
      }
      // else setCurrentDiscount([DEFAULT_DISCOUNT]);
      
    }
  }

  function handlePageChange(newPage) {
    setFilter({
      ...filter,
      _page: newPage,
    });
  }

  return (
    <div className="sale-wrapper">
      <div className="sale-container">
        <div className="add-sale-button">
          <Button variant="primary" onClick={(e) => handleDiscountModal(e)}>
            <AiOutlinePlus />
            New item
          </Button>
        </div>
        <div className="sale-table">
          <Table striped hover>
            <thead>
              <tr>
                <th>番号</th>
                <th>ID</th>
                <th>割引コード</th>
                <th>コード数</th>
                <th>割引額</th>
                <th>最小額</th>
                <th>開始時間</th>
                <th>アクション</th>
              </tr>
            </thead>
            {/*  */}
            <tbody>
              {(discountData ?? []).map((item, index) => (
                <tr key={index.toString()}>
                  <td>{index}</td>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.amount}</td>
                  <td>{item.percent}</td>
                  <td>{item.min_percent}</td>
                  <td>{item.create_date}</td>
                  <td className="sale-action">
                    <button
                      className="update button"
                      onClick={(e) => handleDiscountModal(e, item.id)}
                    >
                      <AiFillEdit />
                      update
                    </button>
                    <button className="delete button">
                      <AiFillDelete />
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <DiscountModal
          show={show}
          handleClose={handleClose}
          discountData={currentDiscount}
        />
      </div>
      <div className="pagination-container">
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
const mockData = [
  {
    id: "001",
    code: "abcxyz001 abcxyz001 abcxyz001 abcxyz001",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "002",
    code: "abcxyz002",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "003",
    code: "abcxyz003",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "004",
    code: "abcxyz004",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
  {
    id: "005",
    code: "abcxyz005",
    amount: 100,
    percent: "20%",
    min_percent: "5%",
    create_date: "10/10/2022",
  },
];
